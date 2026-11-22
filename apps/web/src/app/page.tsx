"use client";

import AboutSection from "@/components/about-section";
import ExperienceSection from "@/components/experience-section";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import IntroLoader from "@/components/intro-loader";
import WorksSection from "@/components/works-section";

export default function Home() {
	return (
		<IntroLoader>
			<div className="grid min-h-svh grid-rows-[auto_1fr]">
				<a
					className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-medium focus:text-black"
					href="#main-content"
				>
					Skip to content
				</a>
				<Header />
				<main id="main-content">
					<HeroSection />
					<WorksSection />
					<ExperienceSection />
					<AboutSection />
				</main>
				<Footer />
			</div>
		</IntroLoader>
	);
}
