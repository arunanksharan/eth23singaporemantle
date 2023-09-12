import toast from "react-hot-toast";
import { Chain } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";

export const defaultErrorToast = (error: any, customMessage?: string) => {
	toast.error(error?.message ?? customMessage ?? "Something went wrong");
	console.trace(error);
};

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

export const testnetChains = [shibuyaTestnet, polygonMumbai];

export const mainnetChains = [astarMainnet, polygon];

export const validChains = true ? mainnetChains : testnetChains;

export const capitalizeString = (data: string) => {
	return data.toUpperCase();
};

export const fetchChainDetails = (
	chainId: number | string,
	validChains: Chain[]
): Chain => {
	const currChain = (validChains as any).find(
		(chain: any) => chain.id === Number(chainId)
	);

	if (!currChain) {
		throw new Error(`Chain with id ${chainId} not found`);
	}

	return currChain;
};

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const pollingTime = 5000;

export const shortenAddress = (address: string) => {
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const contractDetails = {
	address: "0x9a92797CEdFb315e3e2517544C73EDa64EA4D39e",
	abi: [
		{
			inputs: [
				{ internalType: "string", name: "_name", type: "string" },
				{
					internalType: "string",
					name: "_registered_chain",
					type: "string",
				},
				{ internalType: "string", name: "_new_chain", type: "string" },
				{
					internalType: "string",
					name: "_new_chain_address",
					type: "string",
				},
			],
			name: "addChain",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [{ internalType: "bytes", name: "_data", type: "bytes" }],
			name: "decode",
			outputs: [{ internalType: "string", name: "", type: "string" }],
			stateMutability: "pure",
			type: "function",
		},
		{
			inputs: [{ internalType: "bytes", name: "_hash", type: "bytes" }],
			name: "decodeChain",
			outputs: [
				{ internalType: "string", name: "chain", type: "string" },
				{
					internalType: "string",
					name: "user_address",
					type: "string",
				},
			],
			stateMutability: "pure",
			type: "function",
		},
		{
			inputs: [{ internalType: "bytes", name: "_hash", type: "bytes" }],
			name: "decodeRegisteringChain",
			outputs: [
				{ internalType: "string", name: "chain", type: "string" },
				{
					internalType: "address",
					name: "user_address",
					type: "address",
				},
			],
			stateMutability: "pure",
			type: "function",
		},
		{
			inputs: [],
			name: "fetchIDFromAddress",
			outputs: [
				{
					components: [
						{
							internalType: "bytes",
							name: "namehash",
							type: "bytes",
						},
						{
							internalType: "address",
							name: "sender_address",
							type: "address",
						},
						{
							internalType: "bytes",
							name: "serialisedData",
							type: "bytes",
						},
						{
							internalType: "bytes[]",
							name: "multi_chain_address",
							type: "bytes[]",
						},
					],
					internalType: "struct CrossChainKYCPOC.IDStruct",
					name: "userID",
					type: "tuple",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "bytes", name: "nameHash", type: "bytes" },
			],
			name: "getID",
			outputs: [
				{
					components: [
						{
							internalType: "bytes",
							name: "namehash",
							type: "bytes",
						},
						{
							internalType: "address",
							name: "sender_address",
							type: "address",
						},
						{
							internalType: "bytes",
							name: "serialisedData",
							type: "bytes",
						},
						{
							internalType: "bytes[]",
							name: "multi_chain_address",
							type: "bytes[]",
						},
					],
					internalType: "struct CrossChainKYCPOC.IDStruct",
					name: "",
					type: "tuple",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "string", name: "_name", type: "string" },
				{ internalType: "string", name: "_chain", type: "string" },
			],
			name: "getNameHash",
			outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
			stateMutability: "pure",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "bytes", name: "nameHash", type: "bytes" },
			],
			name: "getSerialisedID",
			outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "string", name: "_name", type: "string" },
				{ internalType: "string", name: "_chain", type: "string" },
			],
			name: "isSenderRegistered",
			outputs: [{ internalType: "bool", name: "", type: "bool" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "string", name: "_name", type: "string" },
				{
					internalType: "string",
					name: "_parent_chain",
					type: "string",
				},
				{ internalType: "string", name: "_data", type: "string" },
			],
			name: "storeID",
			outputs: [
				{
					components: [
						{
							internalType: "bytes",
							name: "namehash",
							type: "bytes",
						},
						{
							internalType: "address",
							name: "sender_address",
							type: "address",
						},
						{
							internalType: "bytes",
							name: "serialisedData",
							type: "bytes",
						},
						{
							internalType: "bytes[]",
							name: "multi_chain_address",
							type: "bytes[]",
						},
					],
					internalType: "struct CrossChainKYCPOC.IDStruct",
					name: "",
					type: "tuple",
				},
			],
			stateMutability: "nonpayable",
			type: "function",
		},
	],
};

export const chainIDToName = {
	[polygon.id]: polygon.name,
	[polygonMumbai.id]: polygonMumbai.name,
	[astarMainnet.id]: astarMainnet.name,
	[shibuyaTestnet.id]: shibuyaTestnet.name,
};

export const roundUp = (amount: number, precision: number) => {
	precision = Math.pow(10, precision);
	return Math.ceil(amount * precision) / precision;
};

export const cleanError = (message?: string): string | undefined => {
	if (message?.includes("insufficient funds")) {
		return "Insufficient funds to complete transaction";
	}

	if (message?.includes("rejected")) {
		return "Transaction Rejected By User";
	}
};
