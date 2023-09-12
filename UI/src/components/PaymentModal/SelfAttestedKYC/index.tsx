import { Signer, ethers } from "ethers";
import React from "react";
import toast from "react-hot-toast";
import Button from "src/atoms/Button";
import CustomConnectButton from "src/atoms/ConnectButton";
import { contractDetails } from "src/helpers";
import { useAccount, useSigner } from "wagmi";

const SelfAttestationKYC: React.FC<{
	refetch: () => void;
	skipKYC: () => void;
}> = ({ refetch, skipKYC }) => {
	const { data: signer } = useSigner();
	const { address } = useAccount();

	const contract = new ethers.Contract(
		contractDetails.address,
		contractDetails.abi,
		signer as Signer
	);

	const [isLoading, setIsLoading] = React.useState(false);
	const [isDomainAvailable, setDomainAvailability] = React.useState(false);
	const [namespaceData, setNamespaceData] = React.useState({});
	const [inputValue, setInputValue] = React.useState("");

	const [userData, setUserData] = React.useState({
		name: "",
		email: "",
	});

	const handleUserDataUpdate = (key: "name" | "email") => (value: string) => {
		setUserData((prev) => ({ ...prev, [key]: value }));
	};

	const verifyNameExists = async (name: string, chain: string) => {
		try {
			setIsLoading(true);
			const response = await contract.isSenderRegistered(name, chain);

			if (response) {
				throw new Error("Domain already claimed");
			}
			toast.success("Domain Available go ahead and claim");
			setDomainAvailability(true);
		} catch (error) {
			toast.error("Domain Not Available");
		} finally {
			setIsLoading(false);
		}
	};

	const claimDomain = async (name: string, chain: string, data: string) => {
		try {
			setIsLoading(true);
			const res = await contract.storeID(name, chain, data);
			await res.wait();
			refetch();
			toast.success("Domain Claimed Successfully");
		} catch (error) {
			toast.error("Unable to claim domain. Please try again");
		} finally {
			setIsLoading(false);
		}
	};

	const handleClaimDomain = async () => {
		const formatted = inputValue + ".demo";
		const [name, chain, merchantHandle] = formatted.split(".");

		const userNamespace = `${name}.${chain}`;

		claimDomain(userNamespace, merchantHandle, JSON.stringify(userData));
	};

	const checkDomainAvailability = async () => {
		const formatted = inputValue + ".demo";
		const [name, chain, merchantHandle] = formatted.split(".");

		const userNamespace = `${name}.${chain}`;

		verifyNameExists(userNamespace, merchantHandle);
	};

	return (
		<div className="px-4">
			<div className="flex justify-center text-xl m-3">
				Claim your Purple ID
			</div>

			{address ? (
				<div className="flex flex-col items-center">
					{!Object.keys(namespaceData).length ? (
						<>
							<div className="w-full mb-4">
								<div className="relative flex mt-2 w-full">
									<input
										type="url"
										name=""
										id=""
										placeholder="Enter PurpleID to claim"
										value={inputValue}
										onChange={(e) => {
											setDomainAvailability(false);
											setInputValue(e.target.value);
										}}
										className="flex-1 border block w-full min-w-0 px-4 py-3 placeholder-gray-500 border-gray-300 rounded-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
									/>
									<div className="inline-flex items-center px-3 text-gray-900 border border-gray-300 bg-gray-50 sm:text-sm">
										.demo
									</div>
								</div>
							</div>
							{/* <input
								type="text"
								value={inputValue}
								onChange={(e) => {
									setDomainAvailability(false);
									setInputValue(e.target.value);
								}}
								className="rounded border border-gray-300 px-4 py-2 w-full mb-4"
								placeholder="Enter namespaces to claim"
							/> */}
							{!isDomainAvailable && (
								<Button
									isLoading={isLoading}
									disabled={inputValue.length == 0}
									onClick={checkDomainAvailability}
									size="md"
									loadingMessage="Checking Availability"
								>
									Check Availability
								</Button>
							)}
							{isDomainAvailable && (
								<Button
									isLoading={isLoading}
									disabled={isLoading}
									onClick={handleClaimDomain}
									size="md"
									loadingMessage="Claiming Domain"
								>
									Claim Domain
								</Button>
							)}

							<div
								className="text-xs text-right mt-2 self-end cursor-pointer"
								onClick={skipKYC}
							>
								Skip to payment
							</div>
						</>
					) : (
						<>
							<div>
								You have successfully claimed Purple ID :{" "}
								<span className="font-semibold">
									{inputValue}
								</span>{" "}
							</div>
						</>
					)}
				</div>
			) : (
				<CustomConnectButton />
			)}
		</div>
	);
};

export default SelfAttestationKYC;
