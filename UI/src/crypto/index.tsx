import { Chain } from "wagmi";

import { fetchChainDetails } from "./../helpers";

const envChainId = 5;

if (!envChainId) {
	throw new Error("NEXT_PUBLIC_CHAIN_ID is not set");
}

export const shibuyaTestnet: Chain = {
	id: 81,
	name: "Shibuya Testnet",
	network: "shibuya",
	nativeCurrency: {
		name: "SBY",
		symbol: "SBY",
		decimals: 18,
	},
	rpcUrls: {
		default: { http: ["https://evm.shibuya.astar.network"] },
		public: { http: ["https://evm.shibuya.astar.network"] },
	},
	blockExplorers: {
		default: {
			name: "SubScan",
			url: "https://shibuya.subscan.io",
		},
	},
	testnet: true,
};

export const astarMainnet: Chain = {
	id: 592,
	name: "Astar",
	network: "astar",
	nativeCurrency: {
		name: "ASTR",
		symbol: "ASTR",
		decimals: 18,
	},
	rpcUrls: {
		default: { http: ["https://astar.public.blastapi.io"] },
		public: { http: ["https://astar.public.blastapi.io"] },
	},
	blockExplorers: {
		default: {
			name: "SubScan",
			url: "https://astar.subscan.io",
		},
	},
	testnet: false,
};

export const generateBlockExplorerLink = (
	validChain: Chain[],
	chainId?: number | string,
	hash?: string,
	isAccount?: boolean
) => {
	if (!chainId || !hash) return;

	const chain = fetchChainDetails(chainId, validChain);

	if (!chain) {
		throw new Error(`Chain with id ${chainId} not found`);
	}

	if ([shibuyaTestnet.id, astarMainnet.id].includes(chain.id)) {
		if (isAccount) {
			return `${chain?.blockExplorers?.default.url}/account/${hash}`;
		}
		return `${chain?.blockExplorers?.default.url}/extrinsic/${hash}`;
	}

	if (isAccount) {
		return `${chain.blockExplorers?.default.url}/address/${hash}`;
	}
	return `${chain.blockExplorers?.default.url}/tx/${hash}`;
};
// export const useMerchantContract = (
// 	address?: string,
// 	orderId?: string,
// 	paymentId?: string,
// 	amount?: number
// ) => {
// 	const abi = useABI("merchant");

// 	const { config } = usePrepareContractWrite({
// 		address: address,
// 		abi,
// 		functionName: "recievePayments",
// 		args: [orderId, paymentId, paymentId],
// 		overrides: {
// 			value: ethers.utils.parseEther(amount?.toString() ?? ""),
// 		},
// 	});
// 	const { data, isLoading, isSuccess, writeAsync } = useContractWrite(config);

// 	return {
// 		writeAsync,
// 		data,
// 		isLoading,
// 		isSuccess,
// 	};
// };

// export const useCreateMerchantWallet = (): {
// 	createSmartAccount: () => Promise<SmartAccount>;
// 	isLoading: boolean;
// } => {
// 	const [isLoading, setIsLoading] = useState(false);

// 	const { data: signer } = useSigner();

// 	const createSmartAccount = async () => {
// 		try {
// 			setIsLoading(true);
// 			const smartAccount = await setupSmartAccount(signer);

// 			return smartAccount;
// 		} catch (error) {
// 			defaultErrorToast(error);
// 			return Promise.reject(error);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	return {
// 		createSmartAccount,
// 		isLoading,
// 	};
// };

// export const transferERC20 = (
// 	tokenAddress: string,
// 	toAddress: string,
// 	amount: number
// ): Transaction => {
// 	const erc20Interface = new ethers.utils.Interface([
// 		"function pullTokens(address token, address dest, uint256 amount)",
// 	]);

// 	const data = erc20Interface.encodeFunctionData("pullTokens", [
// 		tokenAddress,
// 		toAddress,
// 		amount,
// 	]);

// 	return {
// 		to: tokenAddress,
// 		data,
// 	};
// };
