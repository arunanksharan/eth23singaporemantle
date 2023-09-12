/* This example requires Tailwind CSS v2.0+ */
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment, ReactNode, ReactText } from "react";

function classNames(...classes: (string | undefined)[]) {
	return classes.filter(Boolean).join(" ");
}

export interface ISelectOption {
	readonly label: ReactText | ReactNode;
	readonly value: string;
	readonly className?: string;
	readonly icon?: string;
	readonly disabled?: boolean;
	readonly burner_address?: string;
	readonly token_address?: string;
	readonly amount?: string;
}

interface ISelect {
	readonly value: ReactText;
	readonly onChange: (value: ReactText) => void;
	readonly list: ISelectOption[];
}

const Select: React.FC<ISelect> = ({ value, onChange, list }) => {
	const selectedValue = list?.find((item) => item.value === value);

	return (
		<Listbox value={selectedValue} onChange={(e) => onChange(e.value)}>
			{({ open }) => (
				<>
					<div className={classNames("relative mt-1")}>
						<Listbox.Button className="bg-secondaryButtonBackground relative w-full cursor-pointer rounded-md border-lightHeading px-5 py-2 pr-10 text-left shadow-sm focus:outline-none">
							<span className="flex items-center space-x-2 truncate">
								{selectedValue?.icon ? (
									<img
										src={selectedValue?.icon}
										className="h-6 w-6"
									/>
								) : null}
								<span>{selectedValue?.label}</span>
							</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<ChevronDownIcon
									className="mr-2 h-5 w-5 text-gray-400"
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
							<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto border border-solid bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{list.map((option) => (
									<Listbox.Option
										key={option.value}
										className={({ active }) =>
											classNames(
												"relative cursor-default select-none py-2 pl-3 pr-9"
											)
										}
										disabled={option.disabled}
										value={option}
									>
										{({ selected, active }) => (
											<>
												<span
													className={classNames(
														selected
															? "font-semibold"
															: "font-normal",
														"flex cursor-pointer items-center truncate",
														option.className,
														option.disabled
															? "opacity-40"
															: ""
													)}
												>
													{option?.icon ? (
														<img
															src={option?.icon}
															className="mr-2 h-6 w-6"
														/>
													) : null}
													{option.label}{" "}
													{option.disabled
														? "Soon"
														: ""}
												</span>

												{selected ? (
													<span
														className={classNames(
															active
																? "text-white"
																: "",
															"absolute inset-y-0 right-0 flex items-center pr-4"
														)}
													>
														✅
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

export default Select;
