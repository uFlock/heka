import { Router } from "express";

export const PLACEHOLDER_PAYLOAD = 'Here are some news comrade!';

export const setNewsApiRoutes = (router: Router) => {

	router.get('/news-api', (req, res) => res
		.status(200)
		.send(PLACEHOLDER_PAYLOAD));
};
