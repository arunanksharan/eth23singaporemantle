import { GenericClose } from "@heathmont/moon-icons-tw";
import { ethers } from "ethers";
import React, { useState, useEffect, ReactText } from "react";
import CustomConnectButton from "../../../../atoms/ConnectButton";
import CopyToClipboard from "../../../../components/CopyToClipboard";

import {
	ZERO_ADDRESS,
	capitalizeString,
	defaultErrorToast,
	fetchChainDetails,
	pollingTime,
	roundUp,
	shortenAddress,
} from "../../../../helpers";
import { getCheckoutDetails } from "../../../../service";
import { IPaymentDetails } from "../../../../types";
import {
	useFeeData,
	useAccount,
	useProvider,
	useNetwork,
	useSwitchNetwork,
} from "wagmi";
import CheckoutPayButton from "./PayButton";
import { ISelectOption } from "../../../../atoms/Select";
import QRCodeGenerator from "./QRCode";
import DataSelect from "src/atoms/DataSelect";
import AdditionalDetails from "src/components/AdditionalDetails";
import ButtonV2 from "src/atoms/Button";
import toast from "react-hot-toast";
import { useChains } from "src/context/ChainWrapper";

interface GasFeeData {
	gasPrice: string;
	gasPriceUSD: string;
}

const CheckoutPaymentRequired: React.FC<{
	activePaymentDetails: IPaymentDetails;
}> = ({ activePaymentDetails }) => {
	const [gasLoading, setGasLoading] = useState<boolean>(false);
	const [nativeTokenUSD, setNativeTokenUSD] = useState<number>(0);
	const { validChains } = useChains();

	const gasData = useFeeData();
	const { address } = useAccount();
	const provider = useProvider();
	const { chain: currentChain } = useNetwork();
	const { switchNetworkAsync } = useSwitchNetwork();

	const chain = fetchChainDetails(
		activePaymentDetails.tokens[0].chain_id,
		validChains
	);

	const list: ISelectOption[] = [];

	activePaymentDetails?.tokens?.forEach((element: any) => {
		const data = {
			label: capitalizeString(element.symbol),
			value: capitalizeString(element.symbol),
			icon: element.image_url,
			burner_address: element.burner_address,
			amount: element.order_amount.toString() || "0",
			token_address: element.token_address,
			decimals: element.decimals,
			chain_id: element.chain_id,
		};

		list.push(data);
	});

	const [selectedToken, setSelectedToken] = React.useState<ReactText>(
		list[0]?.value
	);
	const [feeData, setFeeData] = useState<GasFeeData | null>(null);
	const [detailsExpandedToggle, setDetailsExpandedToggle] =
		React.useState<boolean>(false);

	const [paymentDetails, setPaymentDetails] = useState<any>({
		...list[0],
	});

	const [qrData, setQrData] = useState<any>();
	const [qrOpen, setQrOpen] = useState<boolean>(false);

	const getExchangeRate = async () => {
		try {
			// const usdRate = await getExchangeRates();

			const chainId = currentChain?.id;

			if (!chainId) {
				setNativeTokenUSD(0);
			}

			if (chainId === 137) {
				setNativeTokenUSD(0.5776);
				return;
			}

			if (chainId === 592) {
				setNativeTokenUSD(0.03855);
				return;
			}
		} catch (error) {
			defaultErrorToast(error);
		}
	};

	const handleSwitchNetwork = async () => {
		try {
			await switchNetworkAsync?.(chain.id);
		} catch (error) {
			defaultErrorToast(error);
		}
	};

	const fetchFeeDataAsync = async () => {
		try {
			if (!chain) return;

			setGasLoading(true);

			const { connection } = provider as any;

			const { url } = connection;

			if (!gasData?.data?.maxFeePerGas) {
				return;
			}

			const formattedGasPrice =
				gasData?.data?.formatted?.maxFeePerGas?.toString() || "0";

			const gasLimit =
				paymentDetails?.token_address !== ZERO_ADDRESS
					? "45000"
					: "21000";

			let gasFee = (
				Number(formattedGasPrice) * Number(gasLimit)
			).toString();
			// const gasFee = ethers.utils.formatEther(gasPrice.mul(gasLimit));

			gasFee = ethers.utils.formatEther(gasFee).toString();

			const formattedGas = parseFloat(gasFee).toFixed(5);

			const gasPriceUSD = (parseFloat(gasFee) * nativeTokenUSD).toFixed(
				2
			);

			setFeeData({
				gasPrice: formattedGas,
				gasPriceUSD,
			});
		} catch (error) {
			defaultErrorToast(error);
		} finally {
			setGasLoading(false);
		}
	};

	useEffect(() => {
		let id: any = null;
		if (nativeTokenUSD > 0) {
			id = setInterval(() => {
				fetchFeeDataAsync();
			}, pollingTime);
		}

		return () => {
			if (id) clearInterval(id);
		};
	}, [address, selectedToken, nativeTokenUSD, feeData?.gasPrice]);

	const initComponent = async () => {
		try {
			setGasLoading(true);
			await getExchangeRate();
			await fetchFeeDataAsync();
		} catch (error) {
			defaultErrorToast(error);
		} finally {
			setGasLoading(false);
		}
	};

	const feeBasedOnChain = async () => {
		try {
			await getExchangeRate();
			await fetchFeeDataAsync();
		} catch (error) {
			defaultErrorToast(error);
		}
	};

	useEffect(() => {
		feeBasedOnChain();
	}, [currentChain?.id]);

	useEffect(() => {
		initComponent();
	}, []);

	const handleSelectOnChange = (option: ReactText) => {
		const currrentPaymnetDetails = list.find(
			(item) => item.value === option
		);

		setSelectedToken(option);
		setPaymentDetails(currrentPaymnetDetails);

		// burner address update
		const selectedToken = activePaymentDetails?.tokens.find(
			(item) => capitalizeString(item.symbol) === option
		);

		if (!selectedToken) {
			toast.error("Invalid token selected");
			return;
		}

		const {
			chain_id,
			burner_address,
			order_amount,
			decimals,
			token_address,
		} = selectedToken;

		const qrOptions = {
			chainId: chain_id,
			recipient: burner_address,
			label: "abc",
			amount: Math.trunc((order_amount ?? 0) * 10 ** (decimals ?? 6)),
			tokenAddress: token_address !== ZERO_ADDRESS ? token_address : null,
		};

		setQrData(JSON.stringify(qrOptions));
	};

	const currentSelectedToken = list.find(
		(item) => item.value === selectedToken
	);
	// const matchingChains = (provider as any).chains?.filter(
	// 	(providerChain: { id: number }) => chain.id === providerChain.id
	// );
	// const currentChain = matchingChains?.[matchingChains?.length - 1];

	const gasFeeUSD =
		Number(feeData?.gasPriceUSD ?? 0) < 0 ? "--" : feeData?.gasPriceUSD;

	const checkForConfirmation = async () => {
		const paymentDetails = await getCheckoutDetails(
			String(activePaymentDetails.id)
		);

		const paymentCompleted =
			paymentDetails.payment_details?.payment_status === "Completed" &&
			paymentDetails?.payment_details?.transaction_hash;

		if (paymentCompleted) {
			// @akhilesh remove reload and update payment Details state
			// window.location.reload();
			return;
		}
	};

	const scanQR = () => {
		//generate Qr
		try {
			const qrOptions = {
				chainId: paymentDetails?.chain_id,
				recipient: paymentDetails?.burner_address,
				label: "abc",
				amount:
					paymentDetails.token_address === ZERO_ADDRESS
						? parseFloat(paymentDetails?.amount) * 1e18
						: parseFloat(paymentDetails?.amount) * 1e6,
				tokenAddress:
					paymentDetails.token_address !== ZERO_ADDRESS
						? paymentDetails.token_address
						: null,
			};

			setQrData(JSON.stringify(qrOptions));
			setQrOpen(true);
		} catch (error) {
			defaultErrorToast(error);
		}
	};

	const hideQR = () => {
		setQrOpen(false);
	};

	const paying_amount = parseFloat(paymentDetails?.amount).toFixed(6);

	const txChain = fetchChainDetails(
		activePaymentDetails.tokens[0].chain_id,
		validChains
	);

	return (
		<div className="bg-white-0">
			<div className="mt-6 flex w-full flex-col items-center justify-center">
				<div className="text-base font-medium">Amount to be paid</div>
				<div className="mt-3 text-4xl font-semibold">
					{Number(paying_amount).toFixed(2)}{" "}
					{currentSelectedToken?.label}
				</div>
			</div>
			<div className="space-y-6  bg-white-0 pt-8 pb-4">
				<div className="flex flex-col items-start">
					<div className="text-lightHeading">Token</div>
					<div className="flex w-full justify-between rounded-md">
						<DataSelect
							list={list}
							onChange={handleSelectOnChange}
							value={selectedToken}
							selectClassname="flex w-full justify-between rounded-md bg-gray-200"
						/>
					</div>
				</div>
				<div className="flex flex-col items-start">
					<div className="text-lightHeading">Reciever's address</div>
					<div className="flex w-full flex-row justify-between rounded-md border-2 bg-gray-200 p-2">
						{paymentDetails.burner_address}
						<CopyToClipboard
							hideContent={true}
							content={paymentDetails.burner_address}
						/>
					</div>
				</div>
				<AdditionalDetails
					currentSelectedTokenLabel={
						currentSelectedToken?.label as string
					}
					tokenAddress={paymentDetails?.token_address}
					amount={roundUp(Number(paying_amount), 4)}
					chainId={txChain?.id}
					conversionRate={paymentDetails.conversion_rate}
				/>
				{!address ? (
					<CustomConnectButton />
				) : address && txChain?.id === chain?.id ? (
					<CheckoutPayButton
						orderId={
							activePaymentDetails?.payment_details?.user_order_id
						}
						paymentDetails={paymentDetails}
						paymentId={activePaymentDetails.id?.toString() ?? ""}
						amount={roundUp(Number(paying_amount), 4)}
					>
						<>Proceed to Payment</>
					</CheckoutPayButton>
				) : (
					<div className="flex flex-col items-center justify-center">
						<div className="mb-2 flex w-full flex-row items-center justify-center rounded-md bg-errorBackgroundColor p-2 font-bold text-red-500">
							<GenericClose className="h-6 w-6" />
							Please connect to correct network
						</div>
						<ButtonV2
							onClick={handleSwitchNetwork}
							className="w-full"
						>
							Switch to {txChain.name}
						</ButtonV2>
					</div>
				)}
				{/* <div className="mt-2 flex justify-center space-x-2 text-sm text-lightHeading">
					<span className="mt-4">Pay using a QR?</span>
					<span
						className="mt-4 cursor-pointer font-bold text-button-300"
						onClick={scanQR}
					>
						Scan QR
					</span>
				</div> */}
			</div>
			{/* <QRModal
				isOpen={qrOpen}
				setIsOpen={setQrOpen}
				value={qrData}
				header={
					<div>
						<div className="mt-6 flex w-full flex-col items-center justify-center">
							<div className="text-base font-medium">
								Amount to be paid
							</div>
							<div className="mt-3 text-4xl font-semibold">
								{Number(paying_amount).toFixed(2)}{" "}
								{currentSelectedToken?.label}
							</div>
						</div>
					</div>
				}
			/> */}
			<div className="mt-2 flex justify-center space-x-2 text-sm text-lightHeading">
				{!qrOpen ? (
					<span
						className="cursor-pointer text-lightHeading"
						onClick={scanQR}
					>
						Pay using QR?{" "}
						<span className="text-primary">Show QR</span>
					</span>
				) : (
					<span
						className="mt-4 cursor-pointer text-lightHeading"
						onClick={hideQR}
					>
						Pay from browser wallet?{" "}
						<span className="text-primary">Pay via wallet</span>
					</span>
				)}
			</div>
			{qrOpen && <QRCodeGenerator value={qrData} />}
		</div>
	);
};

export default CheckoutPaymentRequired;
