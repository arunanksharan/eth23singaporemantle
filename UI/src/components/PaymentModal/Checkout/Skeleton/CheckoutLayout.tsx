import React from "react";
import { DarkLogo, IDLogo, Logo } from "src/assets/svg";

const CheckoutLayout: React.FC<{
	isDomainClaiming: boolean;
	children: React.ReactNode;
}> = ({ isDomainClaiming, children }) => {
	return (
		<div className=" bg-white-0 pb-4">
			{/* <div className="flex items-center justify-center p-6 box-border sm:w-full md:w-120 bg-secondary">
				{isDomainClaiming ? <IDLogo /> : <Logo />}
			</div> */}
			<div className="flex w-full items-center justify-center bg-button-50 py-6">
				<DarkLogo className="h-8 w-auto" />
			</div>
			<div className="">{children}</div>
			{/* NEED MORE SUPPORT */}
			{/* <>
				<div className="text-lightHeading text-center mt-8 mb-4 text-sm">
					Need any Support?{" "}
					<a
						className="text-primary"
						href="mailto:letstalk@purplepay.app"
					>
						Reach out
					</a>
				</div>
			</> */}
		</div>
	);
};

export default CheckoutLayout;
