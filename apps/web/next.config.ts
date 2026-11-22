import "@kstb-s-portfolio/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// React StrictMode's dev-only double mount makes @react-three/fiber call
	// forceContextLoss() on its reused <canvas>, which permanently blanks the
	// lanyard card. Keep it off so WebGL scenes render in development.
	reactStrictMode: false,
	typedRoutes: true,
	reactCompiler: true,
};

export default nextConfig;
