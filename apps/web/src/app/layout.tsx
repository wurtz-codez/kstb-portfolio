import type { Metadata } from "next";

import { JetBrains_Mono } from "next/font/google";

import "../index.css";
import Providers from "@/components/providers";

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Koustubh Pande",
	description: "This is who I am.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${jetbrainsMono.variable} antialiased`}>
				<Providers>
					<div className="min-h-svh">{children}</div>
				</Providers>
			</body>
		</html>
	);
}
