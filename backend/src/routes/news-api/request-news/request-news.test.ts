import request from "supertest";
import { DateTime } from "luxon";

import { app } from "../../../app";

import { RequestNewsRequestBody } from "./request-news-request-schema";
import { NewsArticle, SORT_BY_OPTIONS } from "./request-news-types";

const ENDPOINT_TO_TEST = "/api/request-news";

const VALID_PAYLOAD: RequestNewsRequestBody = {
	query: "Tesla",
	sortBy: SORT_BY_OPTIONS.RELEVANCY,
	page: 1,
	dateRange: {
		startDate: "2018-07-31T01:32:07.518+01:00",
		endDate: "2023-07-31T01:32:07.519+01:00"
	}
};

export type ValueOf<T> = T extends any[] ? T[number] : T[keyof T]

const createPayloadWithout = (key: keyof RequestNewsRequestBody) => {

	const newPayload = { ...VALID_PAYLOAD };

	delete newPayload[key];

	return newPayload;
};

const createPayloadWithWrongValue = (key: keyof RequestNewsRequestBody, value: ValueOf<RequestNewsRequestBody>) => {

	const newPayload = { ...VALID_PAYLOAD };

	newPayload[key] = value as unknown as never; //feel free to ask me about it :)

	return newPayload;
};

const testApiCallWithPayloadExpectCode = async (payload: RequestNewsRequestBody, responseCode: number) =>
	request(app)
		.post(ENDPOINT_TO_TEST)
		.send(payload)
		.expect(responseCode);

const paginateOutAllResultsAndReturnThem = async (payload: RequestNewsRequestBody) => {

	let currentResults: NewsArticle[] = [];
	let currentPage = 0;
	let keepRequestingPages = true;

	while (keepRequestingPages) {

		const payloadToUse = { ...payload, page: ++currentPage };

		const response = await testApiCallWithPayloadExpectCode(payloadToUse, 200);

		const result = response.body as NewsArticle[];

		currentResults = [...currentResults, ...result];

		if (result.length < 5) keepRequestingPages = false;
	}

	return { results: currentResults, numberOfPages: currentPage };
};

describe(`request news - /api/request-news route`, () => {

	it(`returns 400 when no payload is supplied`, async () => {

		await request(app)
			.post(ENDPOINT_TO_TEST)
			.send()
			.expect(400);
	});

	it(`returns 200 and 5 results when correct payload is supplied`, async () => {

		const response = await testApiCallWithPayloadExpectCode(VALID_PAYLOAD, 200);

		const result = response.body as NewsArticle[];

		expect(result.length).toEqual(5);
	});

	it(`returns 200 and a total of 98 results and 20 pages when correct payload supplied`, async () => {

		const { results, numberOfPages } = await paginateOutAllResultsAndReturnThem(VALID_PAYLOAD);

		expect(results.length).toEqual(98);
		expect(numberOfPages).toEqual(20);
	});

	it(`returns 400 when insufficient parameters supplied`, async () => {

		await testApiCallWithPayloadExpectCode(createPayloadWithout("page"), 400);
		await testApiCallWithPayloadExpectCode(createPayloadWithout("dateRange"), 400);
		await testApiCallWithPayloadExpectCode(createPayloadWithout("sortBy"), 400);
		await testApiCallWithPayloadExpectCode(createPayloadWithout("query"), 400);
	});

	it(`returns 400 when wrong parameter values supplied`, async () => {

		const queryOver500 = "x".repeat(501);

		await testApiCallWithPayloadExpectCode(createPayloadWithWrongValue("page", 0), 400);
		await testApiCallWithPayloadExpectCode(createPayloadWithWrongValue("page", 51), 400);
		await testApiCallWithPayloadExpectCode(createPayloadWithWrongValue("dateRange", { startDate: "1111111111111", endDate: "2131231uijoh" }), 400);
		await testApiCallWithPayloadExpectCode(createPayloadWithWrongValue("sortBy", "hello world"), 400);
		await testApiCallWithPayloadExpectCode(createPayloadWithWrongValue("query", queryOver500), 400);
	});

	it(`returns 200 and all articles are within the specified range`, async () => {

		const { startDate, endDate } = VALID_PAYLOAD.dateRange;

		const startDateRequested = DateTime.fromISO(startDate);
		const endDateRequested = DateTime.fromISO(endDate);

		const { results } = await paginateOutAllResultsAndReturnThem(VALID_PAYLOAD);

		results.forEach(newsArticle => {

			const articleDate = DateTime.fromISO(newsArticle.publishedAt);

			const isArticleWithinRange = articleDate >= startDateRequested && articleDate <= endDateRequested;

			expect(isArticleWithinRange).toBe(true);
		})
	});
});
