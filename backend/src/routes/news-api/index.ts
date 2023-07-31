import { Router } from "express";

import { requestNews } from './request-news';

export const setNewsApiRoutes = (router: Router) => {
	requestNews(router)
};
