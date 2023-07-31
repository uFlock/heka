import { Request, Response, Router } from "express";
import { DateTime } from "luxon";

import { validateBody } from "../../../middlewares";

import { RequestNewsRequestBody, requestNewsRequestSchema } from "./request-news-request-schema";
import { FAKE_TESLA_DATA } from "../../../modules/fake-data/fake-news-api-data";
import { paginateResult } from "../../../modules/common-utils";
import { NewsArticle } from "./request-news-types";

const ARTICLES_PER_PAGE = 5;

export const requestNews = (router: Router) => {

	router
		.post(
			'/api/request-news',
			validateBody(requestNewsRequestSchema),
			routeHandler
		);
};

async function routeHandler(req: Request<{}, {}, RequestNewsRequestBody>, res: Response) {

	const { dateRange, page } = req.body;
	const { startDate, endDate } = dateRange;

	const resultsFilteredByDate = filterResultsByDate(FAKE_TESLA_DATA, startDate, endDate);
	const paginatedResult = paginateResult<NewsArticle>(resultsFilteredByDate, page, ARTICLES_PER_PAGE);

	res
		.status(200)
		.send(paginatedResult);
}

export function filterResultsByDate(resultsToFilter: NewsArticle[], startDate: string, endDate: string) {

	const searchStartDate = DateTime.fromISO(startDate);
	const searchEndDate = DateTime.fromISO(endDate);

	return resultsToFilter.filter(result => {

		const resultPublishedDate = DateTime.fromISO(result.publishedAt);

		if (resultPublishedDate >= searchStartDate && resultPublishedDate <= searchEndDate) {
			return result;
		}
	});
}
