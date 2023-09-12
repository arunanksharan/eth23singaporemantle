import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { getValidChains } from "src/service";
import { Chain } from "wagmi";
import { polygon } from "wagmi/chains";

interface ChainState {
	validChains: Chain[];
}

const ChainContext = createContext<ChainState | null>(null);

export const ChainContextWrapper: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [validChains, setValidChains] = useState<Chain[]>([polygon]);

	const getValidChainsAPI = async () => {
		const res = await getValidChains();
		setValidChains(res.chain_details);
	};

	useEffect(() => {
		getValidChainsAPI();
	}, []);

	return (
		<ChainContext.Provider
			value={{
				validChains,
			}}
		>
			{children}
		</ChainContext.Provider>
	);
};

export const useChains = () => {
	const state = useContext(ChainContext);

	if (!state) {
		console.trace("Use inside context provider");
		throw new Error("Use inside context provider");
	}

	return state;
};
