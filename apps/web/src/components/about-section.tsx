"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useLoader } from "@/contexts/loader-context";
import Lanyard from "./lanyard";
import RotatingText from "./rotating-text";

gsap.registerPlugin(ScrollTrigger);

const COPY = {
	label: "about",
	heading: 'turning "what if..." into repositories',
};

const EXPERTISE = [
	{
		category: "frontend",
		stack: ["React", "Next.js", "TypeScript"],
	},
	{
		category: "backend",
		stack: ["Node.js", "Express", "PostgreSQL"],
	},
	{
		category: "design",
		stack: ["Interfaces", "Systems", "UX"],
	},
	{
		category: "ai",
		stack: ["LLMs", "Agents", "Automation"],
	},
] as const;

export default function AboutSection() {
	const { loaderComplete } = useLoader();
	const sectionRef = useRef<HTMLDivElement>(null);
	const cardContainerRef = useRef<HTMLDivElement>(null);
	const labelRef = useRef<HTMLSpanElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const pContainerRef = useRef<HTMLDivElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (loaderComplete) {
			ScrollTrigger.refresh();
		}
	}, [loaderComplete]);

	useEffect(() => {
		const sectionEl = sectionRef.current;
		const cardEl = cardContainerRef.current;
		const pContainerEl = pContainerRef.current;
		if (!(sectionEl && cardEl && pContainerEl)) {
			return;
		}

		const ctx = gsap.context(() => {
			// 1. Card Reveal
			gsap.fromTo(
				cardEl,
				{
					y: 160,
					opacity: 0,
					scale: 0.92,
				},
				{
					y: 0,
					opacity: 1,
					scale: 1,
					ease: "power2.out",
					scrollTrigger: {
						trigger: sectionEl,
						start: "top 80%",
						end: "top 25%",
						scrub: 1.2,
					},
				}
			);

			// 2. Label & Heading Reveal
			const headerElements = [labelRef.current, headingRef.current].filter(
				Boolean
			);
			if (headerElements.length > 0) {
				gsap.fromTo(
					headerElements,
					{
						filter: "blur(12px)",
						y: 40,
						opacity: 0,
					},
					{
						filter: "blur(0px)",
						y: 0,
						opacity: 1,
						stagger: 0.2,
						ease: "power2.out",
						scrollTrigger: {
							trigger: headingRef.current ?? sectionEl,
							start: "top 85%",
							end: "top 55%",
							scrub: 1.2,
						},
					}
				);
			}

			// 3. Paragraph Lines Reveal (Line by line, slide in from top on scroll down, disappear on scroll up)
			const lines = gsap.utils.toArray<HTMLElement>(
				".about-line",
				pContainerEl
			);
			if (lines.length > 0) {
				const linesTl = gsap.timeline({
					scrollTrigger: {
						trigger: pContainerEl,
						start: "top 75%",
						end: "bottom 45%",
						scrub: 1.2,
					},
				});

				linesTl.fromTo(
					lines,
					{
						yPercent: -120,
						opacity: 0,
					},
					{
						yPercent: 0,
						opacity: 1,
						stagger: 0.15,
						duration: 1,
						ease: "power2.out",
					}
				);
			}

			// 4. Grid items
			const gridItems = gridRef.current?.children;
			if (gridItems && gridItems.length > 0) {
				gsap.fromTo(
					gridItems,
					{
						filter: "blur(12px)",
						y: 30,
						opacity: 0,
					},
					{
						filter: "blur(0px)",
						y: 0,
						opacity: 1,
						stagger: 0.15,
						ease: "power2.out",
						scrollTrigger: {
							trigger: gridRef.current,
							start: "top 85%",
							end: "top 55%",
							scrub: 1.2,
						},
					}
				);
			}
		}, sectionEl);

		ScrollTrigger.refresh();

		return () => ctx.revert();
	}, []);

	return (
		<section
			className="relative z-20 flex min-h-screen w-full items-center justify-center overflow-hidden bg-background py-32 md:py-48 lg:py-64"
			id="about"
			ref={sectionRef}
		>
			<div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-start gap-16 px-6 lg:grid-cols-[2fr_3fr] lg:gap-24">
				{/* Left Column: Portrait Card Container */}
				<div
					className="flex h-[750px] w-full items-center justify-center lg:sticky lg:top-24"
					ref={cardContainerRef}
				>
					<Lanyard
						cardScale={5.04}
						gravity={[0, -40, 0]}
						position={[0, 0, 20]}
					/>
				</div>

				{/* Right Column: Content */}
				<div className="flex flex-col">
					<div>
						<span
							className="mb-4 block font-[family:var(--font-jetbrains-mono)] text-white/40 text-xs uppercase tracking-[0.3em]"
							ref={labelRef}
						>
							{COPY.label}
						</span>
						<h2
							className="mb-8 max-w-[65ch] font-[family:var(--font-jetbrains-mono)] font-medium text-4xl text-white leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
							ref={headingRef}
						>
							{COPY.heading}
						</h2>

						<div
							className="mb-10 space-y-4 font-[family:var(--font-jetbrains-mono)] text-base text-white/60 leading-normal md:text-lg"
							ref={pContainerRef}
						>
							<div className="overflow-hidden py-0.5">
								<p className="about-line flex max-w-[65ch] flex-wrap items-center gap-x-2 font-medium text-white">
									<span>i like</span>
									<RotatingText
										animate={{ y: 0 }}
										auto
										exit={{ y: "-120%" }}
										initial={{ y: "100%" }}
										loop
										mainClassName="px-2.5 py-0.5 bg-white text-black overflow-hidden justify-center rounded font-semibold inline-flex"
										rotationInterval={2000}
										splitBy="characters"
										splitLevelClassName="overflow-hidden pb-0.5"
										staggerDuration={0.025}
										staggerFrom="first"
										texts={[
											"building things",
											"breaking things",
											"repeating things",
											"just making stuff on the internet",
										]}
										transition={{ type: "spring", damping: 30, stiffness: 400 }}
									/>
								</p>
							</div>

							<p className="max-w-[65ch] space-y-1">
								<span className="block overflow-hidden py-0.5">
									<span className="about-line block">
										sometimes it’s a full-stack product.
									</span>
								</span>
								<span className="block overflow-hidden py-0.5">
									<span className="about-line block">
										sometimes it’s an ai experiment.
									</span>
								</span>
								<span className="block overflow-hidden py-0.5">
									<span className="about-line block">
										sometimes it’s a random idea that sounded cool at 2am and
									</span>
								</span>
								<span className="block overflow-hidden py-0.5">
									<span className="about-line block">
										somehow turned into a weekend project.
									</span>
								</span>
							</p>

							<p className="max-w-[65ch] space-y-1">
								<span className="block overflow-hidden py-0.5">
									<span className="about-line block">
										most days you’ll find me switching between code, design
										files,
									</span>
								</span>
								<span className="block overflow-hidden py-0.5">
									<span className="about-line block">
										documentation tabs, and way too many browser windows.
									</span>
								</span>
							</p>

							<p className="max-w-[65ch] space-y-1">
								<span className="block overflow-hidden py-0.5">
									<span className="about-line block">
										currently studying computer science while trying to get
										better
									</span>
								</span>
								<span className="block overflow-hidden py-0.5">
									<span className="about-line block">
										at building products that people actually enjoy using.
									</span>
								</span>
								<span className="block overflow-hidden py-0.5">
									<span className="about-line block">
										i’m interested in the space where engineering, design,
									</span>
								</span>
								<span className="block overflow-hidden py-0.5">
									<span className="about-line block">
										and curiosity overlap.
									</span>
								</span>
							</p>

							<div className="overflow-hidden py-0.5">
								<p className="about-line max-w-[65ch]">
									the goal isn’t just to make things work.
								</p>
							</div>

							<div className="overflow-hidden py-0.5">
								<p className="about-line max-w-[65ch] font-medium text-white">
									it’s to make them feel right.
								</p>
							</div>
						</div>
					</div>

					{/* Editorial Expertise Grid */}
					<div
						className="mt-8 grid grid-cols-1 gap-x-12 gap-y-2 sm:grid-cols-2"
						ref={gridRef}
					>
						{EXPERTISE.map((item) => (
							<div
								className="group border-white/10 border-t pt-6 pb-8 transition-colors duration-300 hover:border-white/30"
								key={item.category}
							>
								<h3 className="mb-2 font-[family:var(--font-jetbrains-mono)] font-medium text-lg text-white transition-transform duration-300 group-hover:translate-x-1">
									{item.category}
								</h3>
								<p className="font-[family:var(--font-jetbrains-mono)] text-white/50 text-xs tracking-wider transition-colors duration-300 group-hover:text-white/80">
									{item.stack.join("  ·  ")}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
