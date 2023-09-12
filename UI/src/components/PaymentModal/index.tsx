import React, { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Checkout from "./Checkout";
import Button from "src/atoms/Button";
import { useAccount, useSigner } from "wagmi";
import { Signer, ethers } from "ethers";
import { contractDetails, defaultErrorToast } from "src/helpers";
import SelfAttestationKYC from "./SelfAttestedKYC";
import CheckoutLayout from "./Checkout/Skeleton/CheckoutLayout";

const PaymentModal: React.FC<{
	open: boolean;
	setOpen: (value: boolean) => void;
	paymentId: string;
}> = ({ open, setOpen, paymentId }) => {
	const cancelButtonRef = useRef(null);

	const [namespaceLoading, setNamespaceLoading] = React.useState(false);
	const [namespace, setNamespace] = React.useState("");
	const [skippedKYC, setSkippedKYC] = React.useState(false);

	const { address } = useAccount();
	const { data: signer } = useSigner();

	// const checkKYC = async () => {
	// 	try {
	// 		if (!signer) {
	// 			// throw new Error("No signer found");
	// 			return;
	// 		}

	// 		setNamespaceLoading(true);

	// 		const contract = new ethers.Contract(
	// 			contractDetails.address,
	// 			contractDetails.abi,
	// 			signer
	// 		);
	// 		const res = await contract.fetchIDFromAddress();

	// 		if (res.serialisedData !== "0x") {
	// 			const [namehash, senderAddress] = res;
	// 			const { chain, user_address } = await contract.decodeChain(
	// 				namehash
	// 			);

	// 			if (senderAddress === address) {
	// 				setNamespace(`${chain}.${user_address}`);
	// 			} else {
	// 				setNamespace("");
	// 			}
	// 		} else {
	// 			setNamespace("");
	// 		}
	// 	} catch (error) {
	// 		defaultErrorToast(error);
	// 	} finally {
	// 		setNamespaceLoading(false);
	// 	}
	// };

	// useEffect(() => {
	// 	if (open && address) {
	// 		checkKYC();
	// 	}
	// }, [open, address, signer]);

	const showKYC = !namespace.length && !skippedKYC;

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10 purplepay-widget-container"
				initialFocus={cancelButtonRef}
				onClose={() => null}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center text-center sm:items-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
								<CheckoutLayout isDomainClaiming={!namespace}>
									<div className="">
										<div className="mt-2 px-4">
											{open && (
												<>
													<Checkout
														paymentId={paymentId}
													/>
												</>
											)}
											{/* {namespaceLoading ? (
												<div className="my-8 text-center">
													Checking Self attested
													KYC...
												</div>
											) : (
												<>
													{showKYC ? (
														<>
															<SelfAttestationKYC
																skipKYC={() =>
																	setSkippedKYC(
																		true
																	)
																}
																refetch={
																	checkKYC
																}
															/>
														</>
													) : (
														<>
															{open && (
																<>
																	<Checkout
																		paymentId={
																			paymentId
																		}
																	/>
																</>
															)}
														</>
													)}

													{address &&
													!namespaceLoading &&
													!!namespace ? (
														<>
															<div className="text-sm flex items-center justify-between my-2 bg-gray-100 p-3 mx-4">
																<div>
																	Active
																	Purple ID:
																</div>
																<div className="font-semibold">
																	{namespace}
																</div>
															</div>
															<div className="text-xs text-center mt-2">
																Powered by{" "}
																<span className=" text-secondary ">
																	Purple ID
																</span>
															</div>
														</>
													) : null}
												</>
											)} */}
										</div>

										<div className="w-full flex justify-center">
											<div className="m-8 mb-0">
												<Button
													variant="secondary"
													onClick={() =>
														setOpen(false)
													}
												>
													Cancel Transaction
												</Button>
											</div>
										</div>
									</div>
								</CheckoutLayout>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default PaymentModal;
