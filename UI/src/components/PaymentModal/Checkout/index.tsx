import React, { useEffect, useState } from "react";
import CheckoutSkeleton from "./Skeleton";

import { Logo } from "../../../assets/svg";
import CheckoutPaymentCompleted from "./PaymentCompleted";
import { defaultErrorToast, pollingTime } from "../../../helpers";
import { getCheckoutDetails } from "src/service";
import { IPaymentDetails } from "src/types";
import CheckoutPaymentRequired from "./PaymentRequired";

const Checkout = ({ paymentId }: { paymentId: string }) => {
	const [paymentDetails, setPaymentDetails] =
		useState<IPaymentDetails | null>(null);

	const fetchPaymentDetails = async () => {
		try {
			const response = await getCheckoutDetails(paymentId);
			setPaymentDetails(() => response);
		} catch (error) {
			defaultErrorToast(error);
		}
	};

	const paymentCompleted =
		paymentDetails?.payment_details?.payment_status === "Completed";

	const paymentRemaining =
		paymentDetails?.payment_details?.payment_status !== "Completed" &&
		!paymentDetails?.payment_details?.transaction_hash;

	useEffect(() => {
		fetchPaymentDetails();
		const timer = setInterval(() => {
			fetchPaymentDetails();
		}, pollingTime);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className="-z-2 relative flex flex-col items-center justify-center text-sm">
			<div className=" blur-bg " />
			<div className="z-10 box-border sm:w-full px-4">
				{paymentDetails ? (
					<>
						{!paymentCompleted || paymentRemaining ? (
							<CheckoutPaymentRequired
								activePaymentDetails={paymentDetails}
							/>
						) : (
							<CheckoutPaymentCompleted
								paymentDetails={paymentDetails}
							/>
						)}
					</>
				) : (
					<CheckoutSkeleton />
				)}
			</div>
		</div>
	);
};

export default Checkout;
