/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	important: true,
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./node_modules/@heathmont/moon-core-tw/**/*.{js,ts,jsx,tsx}",
	],
	presets: [
		require("@heathmont/moon-core-tw/lib/private/presets/ds-moon-preset"),
	],
	theme: {
		extend: {
			fontFamily: {
				primary: ["Inter"],
			},
			screens: {
				sm: "280px",
				md: "768px",
				lg: "976px",
				xl: "1440px",
			},
			width: {
				12: "3rem",
				14: "3.5rem",
				16: "4rem",
				18: "4.5rem",
				120: "30rem",
				128: "32rem",
			},
			height: {
				120: "30rem",
				128: "32rem",
			},
			colors: {
				// old colors
				primary: "#141322",
				secondary: "#1F1D35",
				primaryText: "#2D2D2D",
				descriptionText: "#9B9B9B",
				border: "#E4E6EA",
				disabledPrimary: "#72717b",
				lightText: "#C6CBD9",
				lightHeading: "#AFAFAF",
				errorBackgroundColor: "#FDF1F1",

				// new palette
				success: {
					0: "#EFFCF9",
					50: "#E6F7ED",
					75: "#9fb8a8",
					100: "#779b85",
					125: "#e8eeea",
					150: "#4AA96C",
					200: "#3d6f50",
					300: "#15522c",
					400: "#0f391f",
					500: "#0d321b",
				},

				pending: {
					50: "#FF8C4A",
				},

				alert: {
					50: "#FFECD9",
					75: "#e0b89a",
					100: "#d39b70",
					200: "#c07033",
					300: "#b35309",
					400: "#7d3a06",
					500: "#6d3305",
				},

				failure: {
					0: "#FDF1F1",
					50: "#FEE9E6",
					250: "#E14141",
					300: "#dc2626",
					75: "#f1a6a6",
					100: "#eb8181",
					200: "#e24b4b",
					400: "#9a1b1b",
					500: "#861717",
				},

				button: {
					50: "#F5F1FF",
					75: "#E7E2FF",
					150: "#AB8EFF",
					300: "#7e57c2",
					350: "#664497",
					100: "#b49edc",
					200: "#9474cc",
					400: "#583d88",
					500: "#4d3576",
				},

				text: {
					75: "#8E94AD",
					100: "#A9B4C8",
					150: "#6B7280",
					175: "#5A607D",
					300: "#363a4e",
					50: "#ebebed",
					200: "#585b6c",
					400: "#262937",
					500: "#212330",
				},

				white: {
					0: "#ffffff",
					50: "#FCFCFC",
					300: "#fbf9ff",
					350: "#F9F9FF",
					375: "#F9F9F9",
					380: "#F4F4F4",
					425: "#A3A3A3",
					75: "#fdfdff",
					100: "#fdfcff",
					200: "#fcfaff",
					400: "#b0aeb3",
					500: "#99989c",
				},

				stroke: {
					200: "#EADEFF",
					300: "#e4e6ea",
					350: "#B196FF",
					400: "#C5C5C5",
					50: "#fcfdfd",
					75: "#f4f5f6",
					100: "#eff1f3",
					500: "#8b8c8f",
				},

				tremor: {
					content: {
						subtle: "#7e56c2",
						DEFAULT: "#363a4e",
					},
					background: {
						DEFAULT: "#ffffff",
					},
					border: {
						DEFAULT: "#e4e6ea",
					},
					back: {
						default: "#7E57C2",
					},
				},
			},
			boxShadow: {
				"tremor-dropdown":
					"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(2 23 122 / 0.1)",
			},
			keyframes: {
				flicker: {
					"0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": {
						opacity: 0.99,
						filter: "drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))",
					},
					"20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
						opacity: 0.4,
						filter: "none",
					},
				},
				shimmer: {
					"0%": {
						backgroundPosition: "-700px 0",
					},
					"100%": {
						backgroundPosition: "700px 0",
					},
				},
			},
			animation: {
				flicker: "flicker 3s linear infinite",
				shimmer: "shimmer 1.3s linear infinite",
			},
		},
	},
	plugins: [],
};
