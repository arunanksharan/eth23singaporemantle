import axios from "axios";
import { IPaymentDetails, ValidChainsResponse } from "../types";
import { Chain } from "wagmi";

const baseURL = "https://api-azsit.purplepay.app";

export const getCheckoutDetails = async (
	paymentId: string
): Promise<IPaymentDetails> => {
	const response = await axios.get(
		`${baseURL}/payments/burner_address/payment_verify/${paymentId}`
	);

	return response.data.data;
};

export const getValidChains = async (): Promise<ValidChainsResponse> => {
	const response = await axios.get(`${baseURL}/payments/chain_config/`);

	return response.data.data;
};

export const getExchangeRates = async () => {
	// default of ethereum
	const response = await fetch(
		"https://api.coingecko.com/api/v3/exchange_rates"
	);

	const rates = await response.json();

	const { eth, usd } = rates.rates;

	const ethToUsd = usd.value / eth.value;

	return ethToUsd;

	// 1 bitcoin is x ethers and y dollars, calculate how many dollars is 1 ether?
};
