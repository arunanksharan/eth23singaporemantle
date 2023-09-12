// write a React component that copies to clipboard, show tick icon for 3 seconds and then hide it

import React from "react";
import { toast } from "react-hot-toast";

import { Copy } from "src/assets/svg";

export function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(" ");
}

const CopyToClipboard: React.FC<{
	content?: string | null;
	displayContent?: string;
	hideContent?: boolean;
	removeBorder?: boolean;
	paddingLeft?: boolean;
	textColor?: string;
}> = ({
	content: clipboard,
	hideContent,
	displayContent,
	removeBorder,
	paddingLeft,
	textColor,
}) => {
	const [isClicked, setIsClicked] = React.useState(false);

	const handleClick = () => {
		if (!clipboard) return;
		navigator.clipboard.writeText(clipboard);
		setIsClicked(true);
		toast.success("Copied to clipboard");
		setTimeout(() => {
			setIsClicked(false);
		}, 1500);
	};

	return (
		<div className="flex h-full items-center">
			{!hideContent && (
				<div
					className={classNames(
						"justify-left mr-4 flex h-14 items-center truncate px-2",
						removeBorder ? "" : "border border-border",
						paddingLeft ? "pl-6" : "",
						textColor ? textColor : ""
					)}
					style={{ width: "87%" }}
				>
					{displayContent ?? clipboard}
				</div>
			)}
			{isClicked ? (
				<div>
					<Copy className="h-6 w-6 cursor-pointer text-green-500" />
				</div>
			) : (
				<div onClick={handleClick}>
					<Copy className="h-6 w-6 cursor-pointer text-green-500" />
				</div>
			)}
		</div>
	);
};

export default CopyToClipboard;
