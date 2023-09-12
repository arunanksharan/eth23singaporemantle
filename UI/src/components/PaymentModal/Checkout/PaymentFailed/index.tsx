import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React from "react";
import Button from "../../../../atoms/Button";

const CheckoutPaymentFailed = () => {
	return (
		<div className="bg-white p-8">
			{/* <Lottie
				options={{
					animationData: error,
					autoplay: true,
					loop: true,
				}}
				height={248}
				width={248}
			/> */}
			<div className="mb-10 text-center text-2xl font-semibold">
				Payment Failed
			</div>

			<Button className="w-full text-center">
				<div className="flex items-center justify-center space-x-4">
					<span>Try again</span>
					<ArrowPathIcon className="h-6 w-6" />
				</div>
			</Button>
			<div className="mt-2 flex justify-center space-x-2 text-sm text-red-600">
				Error message
			</div>
		</div>
	);
};

export default CheckoutPaymentFailed;
