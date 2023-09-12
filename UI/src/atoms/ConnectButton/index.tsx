import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "../Button";

const CustomConnectButton = () => {
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				authenticationStatus,
				mounted,
			}) => {
				// Note: If your app doesn't use authentication, you
				// can remove all 'authenticationStatus' checks
				const ready = mounted && authenticationStatus !== "loading";
				const connected =
					ready &&
					account &&
					chain &&
					(!authenticationStatus ||
						authenticationStatus === "authenticated");
				return (
					<div
						{...(!ready && {
							"aria-hidden": true,
							style: {
								opacity: 0,
								pointerEvents: "none",
								userSelect: "none",
							},
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<Button
										size="md"
										className="w-full"
										onClick={openConnectModal}
										type="button"
									>
										Connect Wallet
									</Button>
								);
							}
							if (chain.unsupported) {
								return (
									<div>
										<Button
											size="md"
											className="w-full"
											onClick={openChainModal}
											type="button"
										>
											Switch network
										</Button>
										<div className="mt-2 text-center text-red-500">
											Incorrect network detected
										</div>
									</div>
								);
							}
							return (
								<div style={{ display: "flex", gap: 12 }}>
									<button
										onClick={openChainModal}
										style={{
											display: "flex",
											alignItems: "center",
										}}
										type="button"
									>
										{chain.hasIcon && (
											<div
												style={{
													background:
														chain.iconBackground,
													width: 12,
													height: 12,
													borderRadius: 999,
													overflow: "hidden",
													marginRight: 4,
												}}
											>
												{chain.iconUrl && (
													<img
														alt={
															chain.name ??
															"Chain icon"
														}
														src={chain.iconUrl}
														style={{
															width: 12,
															height: 12,
														}}
													/>
												)}
											</div>
										)}
										{chain.name}
									</button>
									<button
										onClick={openAccountModal}
										type="button"
									>
										{account.displayName}
										{account.displayBalance
											? ` (${account.displayBalance})`
											: ""}
									</button>
								</div>
							);
						})()}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
};

export default CustomConnectButton;
