import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import MenuItem from "@heathmont/moon-core-tw/lib/menuItem/MenuItem";
import Dropdown from "@heathmont/moon-core-tw/lib/dropdown/Dropdown";
import Label from "@heathmont/moon-core-tw/lib/label/Label";
// import { Label } from "@headlessui/react/dist/components/label/label";

import DropdownRootProps from "@heathmont/moon-core-tw/lib/dropdown/private/types/DropdownRootProps";

import React, { ReactNode, ReactText } from "react";
import { classNames } from "src/components/CopyToClipboard";

export interface IDataSelectOption {
	readonly label: ReactText | ReactNode;
	readonly value: ReactText;
	readonly className?: string;
	readonly icon?: string;
	readonly disabled?: boolean;
	readonly amount?: string;
}

interface IDataSelect {
	readonly value: ReactText;
	readonly onChange: (value: any) => void;
	readonly list: IDataSelectOption[];
	readonly label?: string;
	readonly mandatory?: boolean;
	readonly selectClassname?: string;
}

// const DataSelect: React.FC<IDataSelect & DropdownRootProps> = ({
// 	value,
// 	onChange,
// 	list,
// 	label,
// 	mandatory,
// 	selectClassname,
// 	...props
// }) => {
// 	const selectedValue = list?.find((item) => item.value === value);

// 	return (
// 		<div className="w-full">
// 			{label && (
// 				<Label size="sm" className="block font-medium text-text-300">
// 					{label}
// 					{mandatory && (
// 						<span className="ml-1 text-base text-failure-300">
// 							*
// 						</span>
// 					)}
// 				</Label>
// 			)}
// 			<MenuItem>
// 				<div className="flex flex-row items-center">hello</div>
// 			</MenuItem>
// 			{/* <Dropdown
// 				value={selectedValue?.value}
// 				onChange={(e) => onChange(e)}
// 				className={`w-full rounded-lg border border-stroke-300 text-sm ${props.className}`}
// 				{...props}
// 			>
// 				{({ open }) => (
// 					<>
// 						<Dropdown.Select
// 							open={open}
// 							className={`${selectClassname}`}
// 						>
// 							<div className="flex w-full flex-row items-center">
// 								{selectedValue?.icon && (
// 									<img
// 										src={selectedValue?.icon}
// 										className="mr-1 h-6 w-6"
// 									/>
// 								)}
// 								<span className="text-sm">
// 									{selectedValue?.label}
// 								</span>
// 							</div>
// 						</Dropdown.Select>
// 						<Dropdown.Options className="max-h-40 w-min overflow-auto overflow-x-hidden">
// 							{list.map((opt) => (
// 								<Dropdown.Option
// 									value={opt.value}
// 									key={opt.value}
// 								>
// 									{({ selected, active }) => (
// 										<MenuItem
// 											isActive={active}
// 											isSelected={selected}
// 										>
// 											<div className="flex flex-row items-center">
// 												{opt.icon && (
// 													<img
// 														src={opt?.icon}
// 														className="mr-1 h-6 w-6"
// 													/>
// 												)}
// 												<span className="text-sm">
// 													{opt.label}
// 												</span>
// 											</div>
// 										</MenuItem>
// 									)}
// 								</Dropdown.Option>
// 							))}
// 						</Dropdown.Options>
// 					</>
// 				)}
// 			</Dropdown> */}
// 		</div>
// 	);
// };

const people = [
	{ id: 1, name: "Wade Cooper" },
	{ id: 2, name: "Arlene Mccoy" },
	{ id: 3, name: "Devon Webb" },
	{ id: 4, name: "Tom Cook" },
	{ id: 5, name: "Tanya Fox" },
	{ id: 6, name: "Hellen Schmidt" },
	{ id: 7, name: "Caroline Schultz" },
	{ id: 8, name: "Mason Heaney" },
	{ id: 9, name: "Claudie Smitham" },
	{ id: 10, name: "Emil Schaefer" },
];

const DataSelect: React.FC<IDataSelect> = ({ list, value, onChange }) => {
	const selectedValue = list?.find((item) => item.value === value);

	return (
		<Listbox
			value={selectedValue}
			onChange={(option) => onChange(option.value)}
		>
			{({ open }) => (
				<>
					<div className="relative mt-2 w-full h-full">
						<Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 border-none">
							<span className="block truncate">
								<div className="flex items-center">
									<span>
										<img
											src={selectedValue?.icon}
											className="mr-2 h-6 w-6"
										/>
									</span>
									<span>{selectedValue?.label}</span>
								</div>
							</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<ChevronUpDownIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{list.map((person) => (
									<Listbox.Option
										key={person.value}
										className={({ active }) =>
											classNames(
												active
													? "bg-text-50 text-white"
													: "text-gray-900 bg-white-0",
												"relative cursor-default select-none py-2 pl-3 pr-9"
											)
										}
										value={person}
									>
										{({ selected, active }) => (
											<>
												<span
													className={classNames(
														selected
															? "font-semibold"
															: "font-normal",
														"block truncate"
													)}
												>
													<div className="flex items-center">
														<span>
															<img
																src={
																	person.icon
																}
																className="mr-2 h-6 w-6"
															/>
														</span>
														<span>
															{person.label}
														</span>
													</div>
												</span>

												{selected ? (
													<span
														className={classNames(
															active
																? "text-white"
																: "text-indigo-600",
															"absolute inset-y-0 right-0 flex items-center pr-4"
														)}
													>
														<CheckIcon
															className="h-5 w-5"
															aria-hidden="true"
														/>
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
};

export default DataSelect;
