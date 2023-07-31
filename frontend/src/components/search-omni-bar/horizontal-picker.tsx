import HorizontalPickerOption from "./horizontal-picker-option";
import { useState } from "react";

export type HorizontalPickerOptionType<T> = {
	label: string,
	active: boolean,
	value: T
}

export type HorizontalPickerProps<T> = {
	pickerOptions: HorizontalPickerOptionType<T>[],
	onChange: (newValue: T) => void
}

export default function HorizontalPicker<T>(props: HorizontalPickerProps<T>) {

	const { pickerOptions, onChange } = props;

	const [currentPickerOptions, setCurrentPickerOptions] = useState(pickerOptions);

	const setOptionToActive = (label: string) => {

		const updatedPickerOptions = currentPickerOptions.map(option => {

			option.active = label === option.label;

			return option;
		});

		setCurrentPickerOptions(updatedPickerOptions);
	};

	const processOptionSelect = (option: HorizontalPickerOptionType<T>) => {
		setOptionToActive(option.label);
		onChange(option.value);
	};

	return <>
		{pickerOptions.map(option =>
			<HorizontalPickerOption
				key={option.label}
				active={option.active}
				label={option.label}
				onClick={() => processOptionSelect(option)}/>)
		}
	</>;
}
