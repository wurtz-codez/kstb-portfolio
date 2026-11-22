"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { LoaderProvider } from "@/contexts/loader-context";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		const media = gsap.matchMedia();
		media.add("(prefers-reduced-motion: no-preference)", () => {
			const lenis = new Lenis({ smoothWheel: true });

			const onLenisScroll = () => {
				ScrollTrigger.update();
			};

			lenis.on("scroll", onLenisScroll);

			let rafId = 0;
			const raf = (time: number) => {
				lenis.raf(time);
				rafId = requestAnimationFrame(raf);
			};

			rafId = requestAnimationFrame(raf);

			return () => {
				cancelAnimationFrame(rafId);
				lenis.off("scroll", onLenisScroll);
				lenis.stop();
				lenis.destroy();
			};
		});

		return () => media.revert();
	}, []);

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="dark"
			disableTransitionOnChange
			enableSystem
		>
			<LoaderProvider>
				{children}
				<Toaster richColors />
			</LoaderProvider>
		</ThemeProvider>
	);
}
