import Datepicker from "react-tailwindcss-datepicker";
import { useEffect, useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { DateTime } from "luxon";

export type CustomDatePickerProps = {
	onChange: (newValue: DateValueType) => void
}

const DEFAULT_DATE_PICKER_RANGE = {
	startDate: DateTime.now().toISODate(),
	endDate: DateTime.now().toISODate()
};

export default function CustomDatePicker(props: CustomDatePickerProps) {

	const { onChange } = props;

	const [dateRange, setDateRange] = useState<DateValueType>(DEFAULT_DATE_PICKER_RANGE);

	useEffect(() => onChange(dateRange), [dateRange]);

	const processValueChange = (newValue: DateValueType) => setDateRange(newValue);

	return <>
		<div className={"m-auto min-w-full lg:max-w-[655px] md:max-w-[655px] lg:min-w-[655px] md:min-w-[655px]"}>
			<Datepicker
				showShortcuts={true}
				separator={"to"}
				useRange={false}
				maxDate={new Date()}
				value={dateRange}
				onChange={processValueChange}
			/>
		</div>
	</>;
}
