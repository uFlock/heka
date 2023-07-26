import http from "http";

import { app } from "./app";
import { getServerConfig, validateEnvironment } from "./modules/environment";

validateEnvironment();

const SERVER_CONFIG = getServerConfig();

//no catching as need it to crash in case of error
startServer().then(() => console.log('Ready to go captain!'));

async function startServer(): Promise<void> {

	try {

		const server = app.listen(SERVER_CONFIG);

		// intercept termination requests and terminate gracefully
		process.on("SIGINT", () => handleTermination(server));
		process.on("SIGTERM", () => handleTermination(server));

		console.log(`API Server: listening on port ${SERVER_CONFIG.port}`);

	} catch (error) {
		throw new Error(error as string);
	}
}

const handleTermination = async (server: http.Server) => {
	await httpServerClose(server);
};

const httpServerClose = async (server: http.Server): Promise<boolean> =>
	new Promise((resolve: (result: boolean) => void) =>
		server.close(() => resolve(true)));
