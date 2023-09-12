import { parseEther } from "ethers/lib/utils.js";
import React, { useEffect, useState } from "react";
import Button from "../../../../atoms/Button";
import {
	pollingTime,
	ZERO_ADDRESS,
	defaultErrorToast,
	cleanError,
} from "../../../../helpers";
import { getCheckoutDetails } from "../../../../service";
import {
	erc20ABI,
	useContractWrite,
	usePrepareContractWrite,
	usePrepareSendTransaction,
	useSendTransaction,
} from "wagmi";
import { GenericClose } from "@heathmont/moon-icons-tw";

const CheckoutPayButton: React.FC<{
	orderId: string;
	paymentId: string;
	amount: number;
	paymentDetails: any;
	children: React.ReactNode;
}> = ({ paymentId, amount, paymentDetails, children }) => {
	const [isLoading, setIsLoading] = useState(false);

	const formattedAmount: any = Math.trunc(
		amount * 10 ** paymentDetails.decimals
	).toString();

	const { config: erc20TransferConfig, error: erc20Error } =
		usePrepareContractWrite({
			address: paymentDetails.token_address,
			abi: erc20ABI,
			functionName: "transfer",
			args: [paymentDetails.burner_address, formattedAmount],
		});

	const { config: nativeTransferConfig, error: nativeError } =
		usePrepareSendTransaction({
			request: {
				to: paymentDetails?.burner_address,
				value: parseEther(amount?.toString()),
			},
		});

	const { isSuccess, writeAsync: erc20Transfer } =
		useContractWrite(erc20TransferConfig);

	const { sendTransactionAsync: nativeTransfer } = useSendTransaction(
		nativeTransferConfig!
	);

	const checkForConfirmation = async () => {
		const response = await getCheckoutDetails(String(paymentId));

		const paymentCompleted =
			response.payment_details?.payment_status === "Completed";

		if (paymentCompleted) {
			// @akhilesh remove reload and update payment Details state
			// window.location.reload();
			return;
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			checkForConfirmation();
		}, pollingTime);

		return () => clearInterval(interval);
	}, []);

	const sendTx = async () => {
		try {
			setIsLoading(true);

			if (ZERO_ADDRESS !== paymentDetails.token_address) {
				const res = await erc20Transfer?.();
				await res?.wait();
			} else {
				const res = await nativeTransfer?.();
				await res?.wait();
			}
			checkForConfirmation();
		} catch (error: any) {
			if (error?.message?.includes("user rejected transaction")) {
				defaultErrorToast({
					message:
						"Transaction Declined: User Rejected the transaction",
				});
				return;
			}
			defaultErrorToast(error);
		} finally {
			setIsLoading(false);
		}
	};

	const errors =
		(erc20Error as any)?.data?.message ??
		(nativeError as any)?.data?.message;

	const cleanedErrorMessage = cleanError(errors) ?? errors;

	return (
		<>
			{errors ? (
				<div className="mb-2 flex w-full flex-row items-center justify-center rounded-md bg-errorBackgroundColor p-2 font-bold text-red-500">
					<GenericClose className="h-6 w-6" />
					{cleanedErrorMessage}
				</div>
			) : null}
			<Button
				size="md"
				onClick={sendTx}
				isLoading={isSuccess || isLoading}
				loadingMessage="Waiting for the tx to be signed and confirmed..."
				disabled={isSuccess || errors?.length}
				className="w-full"
			>
				{children}
			</Button>
		</>
	);
};

export default CheckoutPayButton;
