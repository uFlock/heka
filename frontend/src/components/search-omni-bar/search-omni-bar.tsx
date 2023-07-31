import { useEffect, useState } from "react";

import AlertError from "../alert/alert-error.tsx";

import SearchBar from "./search-bar.tsx";
import DateRangePicker, { RangePickerOptionValue } from "./date-range-picker.tsx";
import SortByPicker, { SORT_BY_OPTIONS } from "./sort-by-picker.tsx";
import { DEFAULT_RANGE_PICKER_OPTIONS } from "./constants.ts";


export type SubmitOmniBarProps = {
	query: string,
	sortBy: SORT_BY_OPTIONS,
	dateRange: {
		startDate: string,
		endDate: string
	},
}

export type SearchOmniBarProps = {
	onSubmit?: (props: SubmitOmniBarProps) => void
	onChange?: (props: SubmitOmniBarProps) => void
}

export default function SearchOmniBar(props: SearchOmniBarProps) {

	const { onSubmit } = props;

	const [selectedSortByOption, setSelectedSortByOption] = useState(SORT_BY_OPTIONS.RELEVANCY);
	const [selectedDateRange, setSelectedDateRange] = useState<RangePickerOptionValue>(DEFAULT_RANGE_PICKER_OPTIONS[0].value);
	const [selectedSearchQuery, setSelectedSearchQuery] = useState<string | null>(null);

	const [formErrors, setFormErrors] = useState<string[]>([]);

	//treat relevancy and published at as form submissions
	useEffect(() => {

		if (selectedSearchQuery && selectedDateRange && selectedSortByOption) {
			processSearchSubmission();
		}

	}, [selectedDateRange, selectedSortByOption]);

	const processSortByChange = (newVal: SORT_BY_OPTIONS) => setSelectedSortByOption(newVal);

	const processSearchSubmission = () => {

		const currentFormErrors = [];

		const { startDate, endDate } = selectedDateRange;

		const dateRangeIsMissing = !startDate || !endDate;
		const searchQueryIsWrongLength = !selectedSearchQuery ||
			selectedSearchQuery?.length < 1 ||
			selectedSearchQuery?.length > 500;
		const sortByOptionIsMissing = !selectedSortByOption;

		if (dateRangeIsMissing) currentFormErrors.push("Date Range must be selected.");
		if (searchQueryIsWrongLength) currentFormErrors.push("Search query must be between 1 and 500 characters.");
		if (sortByOptionIsMissing) currentFormErrors.push("Sort order must be provided.");

		const noErrors = currentFormErrors.length === 0;

		if (noErrors) {

			onSubmit && onSubmit({
				query: selectedSearchQuery!,
				dateRange: {
					startDate: selectedDateRange.startDate!,
					endDate: selectedDateRange.endDate!
				},
				sortBy: selectedSortByOption
			});
		}

		setFormErrors(currentFormErrors);
	};

	return <>

		<SearchBar
			onChange={(newVal) => setSelectedSearchQuery(newVal)}
			onSubmit={processSearchSubmission}
		/>

		{formErrors.length > 0 && <div className={"m-2.5"}>
			<AlertError message={formErrors}/>
		</div>}

		<DateRangePicker
			onChange={(newValue) => setSelectedDateRange(newValue)}
		/>

		<div className={"mt-2.5"}>
			<SortByPicker onChange={processSortByChange}></SortByPicker>
		</div>

	</>;
}
