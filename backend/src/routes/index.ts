import { Router } from "express";

import { setMiscRoutes } from "./misc";
import { setNewsApiRoutes } from "./news-api";

export const setAppRoutes = (router: Router) => {
	setNewsApiRoutes(router);
	setMiscRoutes(router);
};
