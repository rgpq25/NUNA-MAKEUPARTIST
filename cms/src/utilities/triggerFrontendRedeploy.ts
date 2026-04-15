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
			serviceId: getStringEnv("RAILWAY_FRONTEND_SERVICE_ID"),
		};

		if (!markRedeployTriggered(req)) {
			return;
		}

		// 🔥 STEP 1: Generate cache bust value
		const cacheBust = Date.now().toString();

		// 🔥 STEP 2: Upsert CACHE_BUST variable (NO deploy yet)
		const varRes = await fetch(RAILWAY_API_URL, {
			method: "POST",
			headers : {
				"Content-Type": "application/json",
				"Project-Access-Token": config.token,
			},
			body: JSON.stringify({
				query: `
					mutation UpsertVar(
						$projectId: String!,
						$environmentId: String!,
						$serviceId: String!,
						$name: String!,
						$value: String!
					) {
						variableUpsert(
							input: {
								projectId: $projectId
								environmentId: $environmentId
								serviceId: $serviceId
								name: $name
								value: $value
							}
						)
					}
				`,
				variables: {
					projectId: config.projectId,
					environmentId: config.environmentId,
					serviceId: config.serviceId,
					name: "CACHE_BUST",
					value: cacheBust,
				},
			}),
		});

		const varResult = await varRes.json();

		if (!varRes.ok || varResult.errors?.length) {
			throw new Error(
				varResult.errors?.map((e: any) => e.message).join(", ") ||
					`Variable update failed (${varRes.status})`,
			);
		}


		// const response = await fetch(RAILWAY_API_URL, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		"Project-Access-Token": config.token,
		// 	},
		// 	body: JSON.stringify({
		// 		query: `mutation DeployService($serviceId: String!, $environmentId: String!) {
		// 			serviceInstanceDeploy(serviceId: $serviceId, environmentId: $environmentId)
		// 		}`,
		// 		variables: {
		// 			environmentId: config.environmentId,
		// 			serviceId: config.serviceId,
		// 		},
		// 	}),
		// });

		// const result = (await response.json()) as {
		// 	errors?: {
		// 		message?: string;
		// 	}[];
		// };

		// if (!response.ok || result.errors?.length) {
		// 	const errorMessage = result.errors
		// 		?.map((error) => error.message)
		// 		.join(", ");
		// 	throw new Error(
		// 		errorMessage ||
		// 			`Railway API request failed with status ${response.status}`,
		// 	);
		// }

		req.payload.logger.info(`Triggered frontend redeploy: ${reason}`);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unknown error";
		req.payload.logger.error(
			`Failed to trigger frontend redeploy (${reason}): ${message}`,
		);
	}
}
