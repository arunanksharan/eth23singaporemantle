import React from "react";
import ReactDOM from "react-dom";

import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";
import App from "./App";
import { ChainContextWrapper } from "./context/ChainWrapper";

const widgetDiv = document.querySelector("#purplepay-checkout-button");

ReactDOM.render(
	<React.StrictMode>
		<ChainContextWrapper>
			<App />
		</ChainContextWrapper>
	</React.StrictMode>,
	widgetDiv
);

// window.init = function () {
// 	ReactDOM.render(
// 		<React.StrictMode>
// 			<App />
// 		</React.StrictMode>,
// 		widgetDiv
// 	);
// };
