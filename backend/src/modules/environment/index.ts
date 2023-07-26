"use strict";

const requiredEnvVariables = [
	'ALLOW_CORS_ORIGIN',
	'PORT',
];

export interface ServerEnv {
	port: number
}

export interface CorsEnv {
	allowOrigin: string
}

export const getServerConfig = (): ServerEnv => ({
	port: (process.env.PORT as unknown as number | undefined) || 3000
});

export const getCorsPolicy = (): CorsEnv => ({
	allowOrigin: process.env.ALLOW_CORS_ORIGIN || 'http://localhost:8080'
});

export const validateEnvironment = () => requiredEnvVariables
	.forEach(variable => validateEnvVariable(variable));

function validateEnvVariable(envVariableName: string) {
	if (!process.env[envVariableName]) throwEnvError(envVariableName);
}

function throwEnvError(envVariableName: string) {
	throw new Error(`${envVariableName} - environmental variable must be set`);
}
