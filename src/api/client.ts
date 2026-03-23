const payloadAPIURL = import.meta.env.PAYLOAD_API_URL;

export async function fetchPayloadJSON<T>(path: string): Promise<T | null> {
	if (!payloadAPIURL) {
		return null;
	}

	const response = await fetch(`${payloadAPIURL}${path}`);

	if (!response.ok) {
		throw new Error(`Payload request failed: ${response.status}`);
	}

	return (await response.json()) as T;
}
