import Button from "@heathmont/moon-core-tw/lib/button/Button";
import ButtonSettingsProps from "@heathmont/moon-core-tw/lib/button/private/types/ButtonSettingsProps";
import React, { ButtonHTMLAttributes } from "react";

const ButtonV2: React.FC<
	{
		isLoading?: boolean;
		children?: React.ReactNode;
		loadingMessage?: string;
	} & ButtonSettingsProps &
		ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, isLoading, loadingMessage, ...props }) => {
	return (
		<Button
			// animation={"progress"}
			// animation={isLoading ? "progress" : undefined}
			disabled={isLoading || props.disabled}
			{...props}
			onClick={props.onClick}
			className={`relative ${
				isLoading && (props.variant === "primary" || !props.variant)
					? " text-piccolo"
					: ""
			} ${
				isLoading && props.variant === "secondary"
					? " text-white-0"
					: ""
			} ${props.className}`}
		>
			{isLoading ? (
				<span
					className={`w-full h-full flex justify-center absolute top-2.5 z-1 ${
						props.variant === "secondary"
							? "text-text-150"
							: "text-white-0"
					}`}
				>
					<svg
						className="animate-spin h-5 w-5 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
				</span>
			) : null}

			{children}
		</Button>
	);
};

export default ButtonV2;
