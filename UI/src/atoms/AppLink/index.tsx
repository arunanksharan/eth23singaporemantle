import React, { ReactNode } from "react";

const AppLink: React.FC<
	React.AnchorHTMLAttributes<{
		children: ReactNode;
	}>
> = ({ children, href }) => {
	return (
		<a
			href={href}
			target="__blank"
			className="text-primary-600 w-full truncate"
		>
			{children}
		</a>
	);
};

export default AppLink;
