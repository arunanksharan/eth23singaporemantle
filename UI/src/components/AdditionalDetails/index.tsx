import { ChevronUpIcon } from "@heroicons/react/24/outline";
import React from "react";
import { chainIDToName } from "src/helpers";

const AdditionalDetails: React.FC<{
	tokenAddress: string;
	chainId: number;
	amount: number;
	currentSelectedTokenLabel: string;
	selectedToken?: string;
	conversionRate?: string;
}> = ({
	tokenAddress,
	selectedToken,
	chainId,
	amount,
	currentSelectedTokenLabel,
	conversionRate,
}) => {
	const [detailsExpandedToggle, setDetailsExpandedToggle] =
		React.useState<boolean>(true);

	return (
		<div>
			<div className="flex items-center justify-between pt-6 ">
				<div className="">Additional Details</div>
				<div
					className="flex cursor-pointer items-center space-x-2"
					onClick={() =>
						setDetailsExpandedToggle(!detailsExpandedToggle)
					}
				>
					<ChevronUpIcon
						className={`${
							detailsExpandedToggle ? "rotate-180 transform" : ""
						} h-5 w-5 text-gray-800/[0.6]`}
					/>
				</div>
			</div>
			{detailsExpandedToggle && (
				<div className="my-2 space-y-1 rounded-md border border-stroke-300 p-3">
					<div className="flex  items-center justify-between text-sm">
						<div className="text-lightHeading">Sub-Total</div>
						<div>
							{amount} {currentSelectedTokenLabel}
						</div>
					</div>
					{conversionRate && (
						<div className="flex  items-center justify-between text-sm">
							<div className="text-lightHeading">Conversion</div>
							<div>
								1 {currentSelectedTokenLabel} = ${" "}
								{conversionRate} USD
							</div>
						</div>
					)}
					<div className="flex  items-center justify-between text-sm">
						<div className="text-lightHeading">Network</div>
						<div className="">{chainIDToName[chainId]}</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdditionalDetails;
