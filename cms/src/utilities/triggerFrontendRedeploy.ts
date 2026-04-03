import type { PayloadRequest } from "payload";
import { getStringEnv } from "./getEnv";

const RAILWAY_API_URL = "https://backboard.railway.com/graphql/v2";
const REDEPLOY_CONTEXT_KEY = "frontendRedeployTriggered";

function markRedeployTriggered(req: PayloadRequest): boolean {
	const context = (req.context ?? {}) as Record<string, unknown>;

	if (context[REDEPLOY_CONTEXT_KEY]) {
		return false;
	}

	context[REDEPLOY_CONTEXT_KEY] = true;
	req.context = context;

	return true;
}

export async function triggerFrontendRedeploy({
	reason,
	req,
}: {
	reason: string;
	req: PayloadRequest;
}): Promise<void> {
	try {
		const config = {
			token: getStringEnv("RAILWAY_TOKEN"),
			projectId: getStringEnv("RAILWAY_PROJECT_ID"),
			environmentId: getStringEnv("RAILWAY_ENVIRONMENT_ID"),
			serviceId: getStringEnv("RAILWAY_SERVICE_ID"),
		};

		if (!markRedeployTriggered(req)) {
			return;
		}

		const response = await fetch(RAILWAY_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Project-Access-Token": config.token,
			},
			body: JSON.stringify({
				query: `mutation environmentTriggersDeploy($input: EnvironmentTriggersDeployInput!) {
					environmentTriggersDeploy(input: $input)
				}`,
				variables: {
					input: {
						projectId: config.projectId,
						environmentId: config.environmentId,
						serviceId: config.serviceId,
					},
				},
			}),
		});

		const result = (await response.json()) as {
			errors?: {
				message?: string;
			}[];
		};

		if (!response.ok || result.errors?.length) {
			const errorMessage = result.errors
				?.map((error) => error.message)
				.join(", ");
			throw new Error(
				errorMessage ||
					`Railway API request failed with status ${response.status}`,
			);
		}

		req.payload.logger.info(`Triggered frontend redeploy: ${reason}`);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unknown error";
		req.payload.logger.error(
			`Failed to trigger frontend redeploy (${reason}): ${message}`,
		);
	}
}
