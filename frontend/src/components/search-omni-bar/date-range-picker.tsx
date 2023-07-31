import { useEffect, useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { DateTime } from "luxon";

import { DEFAULT_RANGE_PICKER_OPTIONS } from "./constants.ts";
import HorizontalPickerOption from "./horizontal-picker-option.tsx";
import HorizontalPicker from "./horizontal-picker.tsx";
import CustomDatePicker from './custom-date-picker.tsx';

export type DateRangePickerProps = {
	onChange?: (newValue: RangePickerOptionValue) => void
}

export type RangePickerOptionValue = {
	startDate: string | null
	endDate: string | null
}

export type RangePickerOption = {
	label: string
	active: boolean
	value: RangePickerOptionValue
}

const DEFAULT_CUSTOM_RANGE_LABEL = "Custom range";

export default function DateRangePicker(props: DateRangePickerProps) {

	const { onChange } = props;

	const [useDatePicker, setUseDatePicker] = useState(false);
	const [selectedDateRage, setSelectedDateRange] = useState(DEFAULT_RANGE_PICKER_OPTIONS[0].value);
	const [previousStandardOption, setPreviousStandardOption] = useState(DEFAULT_RANGE_PICKER_OPTIONS[0].value);

	useEffect(() => onChange && onChange(selectedDateRage), [selectedDateRage]);
	useEffect(() => {

		if (useDatePicker) {
			setPreviousStandardOption(selectedDateRage);
		} else {
			processOptionSelect(previousStandardOption);
		}

	}, [useDatePicker]);

	const handleCustomDatePickerValueChange = (newValue: DateValueType) => {

		const { startDate, endDate } = newValue!;

		setSelectedDateRange({
			startDate: DateTime.fromISO(startDate?.toString() || "").toISODate(),
			endDate: DateTime.fromISO(endDate?.toString() || "").toISODate()
		});
	};

	const processOptionSelect = (newValue: RangePickerOptionValue) => setSelectedDateRange(newValue);
	const toggleDatePicker = () => setUseDatePicker(!useDatePicker);

	return <>
		<div className={"mt-2.5 text-center"}>

			{/*Current Range Picked: {selectedDateRage.startDate} to {selectedDateRage.endDate}*/}
			{/*<br/>*/}

			{!useDatePicker &&
				<div>
					<HorizontalPicker<RangePickerOptionValue>
						pickerOptions={DEFAULT_RANGE_PICKER_OPTIONS}
						onChange={(newValue) => processOptionSelect(newValue)}
					/>
					<HorizontalPickerOption
						active={false}
						label={DEFAULT_CUSTOM_RANGE_LABEL}
						onClick={() => toggleDatePicker()}
					/>
				</div>
			}

			{useDatePicker && <div className={"min-w-full.5 m-auto"}>
				<CustomDatePicker onChange={handleCustomDatePickerValueChange}/>
				<div className={"mt-2.5"}>
					<HorizontalPickerOption
						active={false}
						label={"Use simplified range"}
						onClick={() => toggleDatePicker()}
					/>
				</div>
			</div>}
		</div>
	</>;
};
