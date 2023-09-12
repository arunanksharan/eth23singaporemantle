import { Chain } from "wagmi";

export interface IPaymentDetails {
	id: string;
	payment_details: PaymentDetails;
	tokens: Token[];
}

export interface PaymentDetails {
	user_order_id: string;
	address_from: string;
	burner_address_to: string;
	final_address_to: string;
	order_amount: number;
	transaction_hash: string;
	initial_block_number: string;
	transaction_block_number: string;
	transaction_block_hash: string;
	payment_type: string;
	currency: string;
	payment_status: string;
	blockchain_network: string;
	token: string;
	symbol: string;
	token_address: string;
	chain_name: string;
	chain_id: string;
	token_type: string;
	decimals: number;
	image_url: string;
}

export interface Token {
	burner_address: string;
	order_amount: number;
	is_used_for_payment: boolean;
	symbol: string;
	token_address: string;
	chain_id: string;
	chain_name: string;
	decimals: number;
	image_url: string;
	transfer_to_merchant_transaction_hash?: string;
	burner_contract_deploy_status: string;
	burner_contract_deploy_failure_reason: any;
}

export interface ValidChainsResponse {
	chain_details: Chain[];
}
