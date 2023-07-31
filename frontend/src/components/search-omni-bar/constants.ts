import { DateTime } from "luxon";

import { RangePickerOption } from "./date-range-picker.tsx";
import { HorizontalPickerOptionType } from "./horizontal-picker.tsx";
import { SORT_BY_OPTIONS } from "./sort-by-picker.tsx";

export const DEFAULT_RANGE_PICKER_OPTIONS: RangePickerOption[] = [
	{
		label: "All time",
		active: true,
		value: {
			startDate: DateTime.now().minus({ year: 5 }).toISO()!,
			endDate: DateTime.now().toISO()!
		}
	},
	{
		label: "Past hour",
		active: false,
		value: {
			startDate: DateTime.now().minus({ hours: 1 }).toISO()!,
			endDate: DateTime.now().toISO()!
		}
	},
	{
		label: "Last 24 hours",
		active: false,
		value: {
			startDate: DateTime.now().minus({ hours: 24 }).toISO()!,
			endDate: DateTime.now().toISO()!
		}
	},
	{
		label: "Past week",
		active: false,
		value: {
			startDate: DateTime.now().minus({ days: 7 }).toISO()!,
			endDate: DateTime.now().toISO()!
		}
	},
	{
		label: "Past month",
		active: false,
		value: {
			startDate: DateTime.now().minus({ month: 1 }).toISO()!,
			endDate: DateTime.now().toISO()!
		}
	},
	{
		label: "Past year",
		active: false,
		value: {
			startDate: DateTime.now().minus({ year: 1 }).toISODate()!,
			endDate: DateTime.now().toISODate()!
		}
	},
];

export const DEFAULT_SORT_BY_PICKER_OPTIONS: HorizontalPickerOptionType<SORT_BY_OPTIONS>[] = [
	{
		label: "Relevancy",
		active: true,
		value: SORT_BY_OPTIONS.RELEVANCY
	},
	{
		label: "Published date",
		active: false,
		value: SORT_BY_OPTIONS.PUBLISHED_DATE
	},
	{
		label: "Popularity",
		active: false,
		value: SORT_BY_OPTIONS.POPULARITY
	},
];

