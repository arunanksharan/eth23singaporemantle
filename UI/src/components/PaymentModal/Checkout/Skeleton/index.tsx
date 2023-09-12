// import { Button } from "@heathmont/moon-core-tw";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";
import Skeleton from "react-loading-skeleton";
import Button from "src/atoms/Button";

const CheckoutSkeleton = () => {
	return (
		<>
			<div className="space-y-6 divide-y-2 bg-white-0 px-8 py-12">
				<div className="flex items-center justify-between">
					<div className="text-lightHeading">
						<Skeleton className="h-6 w-16" />
					</div>
					<Skeleton className="h-6 w-16" />
				</div>
				<div className="flex items-center justify-between pt-6">
					<div className="text-lightHeading">
						<Skeleton className="h-6 w-16" />
					</div>
					<Skeleton className="h-6 w-16" />
				</div>
				<div>
					<div className="flex items-center justify-between pt-6 ">
						<div className="">
							<Skeleton className="h-6 w-16" />
						</div>
						<div className="flex cursor-pointer items-center space-x-2">
							<span>
								<Skeleton className="h-6 w-16" />
							</span>
							<div className="text-sm text-lightHeading">
								<Skeleton className="h-6 w-16" />
							</div>
							<ChevronDownIcon className="h-6 w-6 text-lightHeading" />
						</div>
					</div>
				</div>
				<Button className="w-full">
					<Skeleton className="h-6 w-3/5" />
				</Button>
			</div>
		</>
	);
};

export default CheckoutSkeleton;
