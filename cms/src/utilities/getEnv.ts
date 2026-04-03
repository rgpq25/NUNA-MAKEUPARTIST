function getEnv(name: string): string {
	const value = process.env[name];

	if (!value) {
		throw new Error(`Missing environment variable: ${name}`);
	}

	return value;
}

export function getStringEnv(name: string): string {
	return String(getEnv(name));
}

export function getNumberEnv(name: string): number {
	const value = Number(getEnv(name));

	if (Number.isNaN(value)) {
		throw new Error(`Environment variable ${name} must be a number`);
	}

	return value;
}

export function getBooleanEnv(name: string): boolean {
	return getEnv(name).toLowerCase() === "true";
}
