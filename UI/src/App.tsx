import React, { useEffect, useMemo } from "react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import PaymentModal from "./components/PaymentModal";
import { Toaster } from "react-hot-toast";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import "@heathmont/moon-themes-tw/lib/moon.css";
import { useChains } from "./context/ChainWrapper";

const App = () => {
	const { validChains } = useChains();
	console.log("🚀 ~ file: App.tsx:13 ~ App ~ validChains:", validChains);

	console.log({ validChains });

	const { chains, provider } = useMemo(
		() => configureChains([...validChains], [publicProvider()]),
		[validChains.length]
	);

	const { connectors } = getDefaultWallets({
		appName: "purple_pay",
		projectId: "ee2e3f010161f953fff75354f09e5b93",
		chains,
	});

	const wagmiClient = createClient({
		autoConnect: true,
		connectors,
		provider,
	});
	const [activePaymentId, setActivePaymentId] = React.useState<string>("");

	const [open, setOpen] = React.useState<boolean>(false);

	const handleOpenModal = (paymentId: string) => {
		setOpen(true);
		setActivePaymentId(paymentId);
	};
	//completed Astar - 94a5d247-ff9a-453b-91f1-85866273197d
	//Pending Astar - cd4fafe8-b6f9-48a7-a300-50c7b0860a5c
	//Initial = 335901dc-bbf0-4cbb-b541-780418c77483
	const handleModalOpen = () => {
		const myEvent = new CustomEvent("purplePayInitModal", {
			detail: {
				// paymentId: "6df1d24f-e8be-4143-a99a-449cf022ddff",
				paymentId: "cd4fafe8-b6f9-48a7-a300-50c7b0860a5c",
			},
			bubbles: true,
			cancelable: true,
			composed: false,
		});

		document.dispatchEvent(myEvent);
	};

	useEffect(() => {
		document.addEventListener("purplepaySuccessPayment", () => {
			setOpen(false);
		});

		document.addEventListener("purplePayInitModal", (event) => {
			const paymentId = (event as CustomEvent).detail.paymentId;
			if (!paymentId) {
				console.warn("Payment ID not found");
				return;
			}

			handleOpenModal(paymentId);
		});
	}, []);

	return (
		<div>
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains}>
					{activePaymentId && (
						<PaymentModal
							open={open}
							setOpen={setOpen}
							paymentId={activePaymentId}
						/>
					)}
					{/* <button onClick={handleModalOpen}>send it</button> */}
					<Toaster />
				</RainbowKitProvider>
			</WagmiConfig>
		</div>
	);
};

export default App;
