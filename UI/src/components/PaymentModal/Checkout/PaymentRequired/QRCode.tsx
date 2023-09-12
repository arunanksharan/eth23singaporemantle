import { createQR } from "@purple-pay/sdk";
import { TransferRequestURLFields } from "@purple-pay/sdk/build/main/types";
import QRCodeStyling from "qr-code-styling";
import React, { useEffect, useRef } from "react";

const qrCode = new QRCodeStyling({
	width: 300,
	height: 300,
	image: "https://dashboard.purplepay.app/svg/qrLogo.svg",
	dotsOptions: {
		color: "#363A4E",
		type: "rounded",
	},
	imageOptions: {
		crossOrigin: "anonymous",
		margin: 8,
	},
});

const QRCodeGenerator = ({ value }: { value: string }) => {
	const ref = useRef(null);

	const encodeUrl = () => {
		if (!value?.includes("http")) {
			const data: TransferRequestURLFields = JSON.parse(value);
			const qrCode = createQR({
				...data,
			});

			const svgStr = qrCode?._options?.data || "";
			return svgStr;
		}

		return value;
	};

	useEffect(() => {
		qrCode.update({
			data: encodeUrl(),
		});
	}, [value]);

	useEffect(() => {
		if (ref?.current) {
			qrCode.append(ref?.current);
		}
	}, []);

	return (
		<>
			<div className="flex h-full w-full justify-center p-4">
				<div
					style={{
						backgroundImage: "url('/images/QRbackground.jpg')",
						backgroundSize: "cover",
					}}
				>
					<div ref={ref} className="p-3" />
				</div>
			</div>
		</>
	);
};

export default QRCodeGenerator;
