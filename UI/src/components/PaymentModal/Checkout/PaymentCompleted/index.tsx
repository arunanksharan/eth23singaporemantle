import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import confetti from "canvas-confetti";
import React, { useEffect, useState } from "react";
import { IPaymentDetails } from "../../../../types";
import AppLink from "src/atoms/AppLink";
import Button from "src/atoms/Button";
import CopyToClipboard from "src/components/CopyToClipboard";
import { defaultErrorToast, shortenAddress } from "../../../../helpers";
import { generateBlockExplorerLink } from "src/crypto";
import success from "../../../../assets/lottie/success.json";
import Lottie from "react-lottie";
import { useChains } from "src/context/ChainWrapper";

const purplePaySuccessEvent = new CustomEvent("purplepaySuccessPayment", {
	detail: {},
	bubbles: true,
	cancelable: true,
	composed: false,
});

const CheckoutPaymentCompleted: React.FC<{
	paymentDetails: IPaymentDetails;
}> = ({ paymentDetails }) => {
	const [address_to, setADdressTo] = useState<string>("");
	const [chain_name, setChainName] = useState<string>("");
	const [orderAmount, setOrderAmount] = useState<number>(0);
	const { validChains } = useChains();

	// timer for 10 seconds
	const [timer, setTimer] = useState<number>(10);

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (timer === 0) {
			document.dispatchEvent(purplePaySuccessEvent);
		}

		if (paymentDetails.payment_details.transaction_hash) {
			interval = setTimeout(() => {
				setTimer((timer) => timer - 1);
			}, 1000);
		}

		return () => clearTimeout(interval);
	}, [paymentDetails.payment_details.transaction_hash, timer]);

	const fetchTransactionDetails = async () => {
		try {
			if (paymentDetails) {
				setADdressTo(paymentDetails?.payment_details?.final_address_to);
				setChainName(paymentDetails?.payment_details?.chain_name);
				setOrderAmount(paymentDetails?.payment_details?.order_amount);
			}
		} catch (error) {
			defaultErrorToast(error);
		}
	};

	const fireConfetti = () => {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});
	};

	useEffect(() => {
		fetchTransactionDetails();
		fireConfetti();
	}, []);

	const blockExplorerLink = generateBlockExplorerLink(
		validChains,
		paymentDetails.payment_details.chain_id,
		paymentDetails.payment_details.transaction_hash
	);

	const txHash = paymentDetails?.payment_details?.transaction_hash;

	return (
		<div className="bg-white p-8">
			<Lottie
				options={{
					animationData: success,
					autoplay: true,
					loop: true,
				}}
				height={248}
				width={248}
			/>
			<div className="mb-10 text-center text-2xl font-semibold">
				Payment Success
			</div>
			<div className="mb-6 flex flex-col space-y-2 ">
				<div className="flex items-center justify-between">
					<div className="text-lightHeading">Sub-Total</div>
					<div className="text-primaryText">{orderAmount} USD</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="text-lightHeading">Conversion</div>
					<div className="text-primaryText">1 USDC = 1.00 USD</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="text-lightHeading">Gas Fee</div>
					<div className="text-primaryText">0.001 USD</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="text-lightHeading">Network</div>
					<div className="text-primaryText">{chain_name}</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="text-lightHeading">Reciever's address</div>
					<div className="text-primaryText">
						<CopyToClipboard
							removeBorder
							displayContent={shortenAddress(address_to)}
							content={address_to}
						/>
					</div>
				</div>
			</div>

			<div>
				{txHash ? (
					<AppLink href={blockExplorerLink}>
						<Button className="w-full text-center">
							<div className="flex items-center justify-center space-x-4">
								<span>View Transaction on block explorer</span>
								<ArrowTopRightOnSquareIcon className="h-6 w-6" />
							</div>
						</Button>
					</AppLink>
				) : (
					<div className="my-4 text-center">
						Waiting for confirmations...
					</div>
				)}
			</div>

			{paymentDetails?.payment_details?.transaction_hash && (
				<div className="w-full text-center text-xs mt-4">
					This popup will close in {timer} seconds
				</div>
			)}
		</div>
	);
};

export default CheckoutPaymentCompleted;
