import { Schema } from 'ajv';
import { SORT_BY_OPTIONS } from "./request-news-types";

export interface RequestNewsRequestBody {
	query: string,
	sortBy: SORT_BY_OPTIONS,
	dateRange: {
		startDate: string,
		endDate: string
	},
	page: number
}

export const requestNewsRequestSchema: Schema = {
	type: "object",
	required: ["query", "dateRange", "sortBy", "page"],
	properties: {
		query: { type: "string", minLength: 1, maxLength: 500 },
		sortBy: { enum: Object.values(SORT_BY_OPTIONS) },
		dateRange: {
			type: "object", properties: {
				startDate: {
					anyOf: [
						{ type: "string", format: "date", minLength: 10, maxLength: 100 },
						{ type: "string", format: "date-time", minLength: 10, maxLength: 100 }
					]
				},
				endDate: {
					anyOf: [
						{ type: "string", format: "date", minLength: 10, maxLength: 100 },
						{ type: "string", format: "date-time", minLength: 10, maxLength: 100 }
					]
				},
			}
		},
		page: { type: "number", minimum: 1, maximum: 50 }
	},
	additionalProperties: false,
};
