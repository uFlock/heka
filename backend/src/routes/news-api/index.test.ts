import request from "supertest";

import { app } from "../../app";

import { PLACEHOLDER_PAYLOAD } from "./index";

const API_URL_NEWS_API = '/news-api'
describe(`news-api route`, () => {

	it(`returns 200 and "${PLACEHOLDER_PAYLOAD}" when server is running`, async () => {

		const response = await request(app)
			.get(API_URL_NEWS_API)
			.expect(200);

		expect(response.text).toEqual(PLACEHOLDER_PAYLOAD);
	});
});
