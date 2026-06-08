"use client";

import type { CSSProperties, FC } from "react";
import "./glitch-text.css";

interface GlitchTextProps {
	children: string;
	speed?: number;
	enableShadows?: boolean;
	enableOnHover?: boolean;
	className?: string;
}

interface CustomCSSProperties extends CSSProperties {
	"--after-duration": string;
	"--before-duration": string;
	"--after-shadow": string;
	"--before-shadow": string;
}

const GlitchText: FC<GlitchTextProps> = ({
	children,
	speed = 0.5,
	enableShadows = true,
	enableOnHover = false,
	className = "",
}) => {
	const inlineStyles: CustomCSSProperties = {
		"--after-duration": `${speed * 3}s`,
		"--before-duration": `${speed * 2}s`,
		"--after-shadow": enableShadows
			? "-3px 0 rgba(255, 255, 255, 0.25)"
			: "none",
		"--before-shadow": enableShadows
			? "3px 0 rgba(255, 255, 255, 0.15)"
			: "none",
	};

	const hoverClass = enableOnHover ? "enable-on-hover" : "";

	return (
		<div
			className={`glitch ${hoverClass} ${className}`}
			data-text={children}
			style={inlineStyles}
		>
			{children}
		</div>
	);
};

export default GlitchText;
