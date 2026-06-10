"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import CardSwap, { Card } from "./card-swap";
import { DecryptedText } from "./decrypted-text";
import GlitchText from "./glitch-text";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
	{
		title: "Qode",
		description: "The nervous system for visual codebase exploration.",
		longDescription:
			"Qode is a specialized engine for mapping complex codebases into interactive visual graphs. It leverages tree-sitter and sigma.js to let developers see the actual architecture of their software, identifying bottlenecks and dead code through data-driven visualization.",
		category: "work",
		tags: ["Next.js", "Tree-sitter", "Sigma.js", "LLM", "AI", "TS"],
		github: "https://github.com/wurtz-codez/verq",
		live: "https://verqai.vercel.app",
	},
	{
		title: "verq",
		description:
			"A comprehensive AI-based platform designed to simplify workflows.",
		longDescription:
			"Verq is an integrated workspace that automates repetitive engineering tasks using custom LLM agents. It bridges the gap between project management and code execution, allowing teams to go from high-level requirements to PR-ready code in minutes.",
		category: "work",
		tags: ["Next.js", "AI", "React"],
		github: "https://github.com/wurtz-codez/verq",
		live: "https://verqai.vercel.app",
	},
	{
		title: "Arkaiv",
		description:
			"AI-based search, discovery, and curation engine for models and tools.",
		longDescription:
			"Arkaiv serves as a high-performance discovery layer for the rapidly evolving AI ecosystem. It curates state-of-the-art models and developer tools, providing semantic search capabilities that help engineers find the exact components needed for their next project.",
		category: "work",
		tags: ["Discovery", "AI", "Tailwind"],
		github: "https://github.com/wurtz-codez/arkaiv",
		live: "https://arkaiv.vercel.app",
	},
	{
		title: "Jewelry by LUNA",
		description:
			"E-commerce platform showcasing premium, curated jewelry collections.",
		longDescription:
			"A premium digital storefront designed for the luxury jewelry market. This project focuses on high-fidelity visual storytelling, utilizing smooth transition logic and a custom checkout flow to mirror the physical elegance of the curated collections.",
		category: "work",
		tags: ["E-commerce", "React", "Stripe"],
		github: "https://github.com/wurtz-codez/Jewelry-by-LUNA",
		live: "https://www.jewelrybyluna.in",
	},
	{
		title: "ALLROUND",
		description: "Private software engine for multi-agent coordination.",
		longDescription:
			"ALLROUND is a low-latency coordination engine built for multi-agent systems. It handles the real-time communication, state synchronization, and task delegation required for complex AI swarms to operate autonomously across distributed environments.",
		category: "project",
		tags: ["Agentic", "TS", "Bun"],
		github: "https://github.com/singularityworks-xyz/ALLROUND",
		live: "#",
	},
] as const;

export default function WorksSection() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const deckRef = useRef<HTMLDivElement>(null);
	const [decryptActive, setDecryptActive] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const sectionEl = sectionRef.current;
		if (!sectionEl) {
			return;
		}

		const trigger = ScrollTrigger.create({
			trigger: sectionEl,
			start: "top 80%",
			onEnter: () => setDecryptActive(true),
			once: true,
		});

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionEl,
					start: "top bottom", // Starts when top of section enters bottom of viewport
					end: "bottom bottom", // Ends when bottom of section reaches bottom of viewport
					scrub: 1.2,
				},
			});

			const textChildren = textRef.current?.children;
			if (textChildren) {
				tl.fromTo(
					textChildren,
					{
						filter: "blur(12px)",
						y: 40,
						opacity: 0,
					},
					{
						filter: "blur(0px)",
						y: 0,
						opacity: 1,
						stagger: 0.25,
						duration: 1.2,
						ease: "power2.out",
					}
				);
			}

			if (deckRef.current) {
				tl.fromTo(
					deckRef.current,
					{
						opacity: 0,
						scale: 0.8,
						y: 100,
					},
					{
						opacity: 1,
						scale: 1,
						y: 0,
						duration: 1.5,
						ease: "power3.out",
					},
					"-=0.8"
				);
			}
		}, sectionEl);

		return () => {
			ctx.revert();
			trigger.kill();
		};
	}, []);

	return (
		<section
			className="relative z-20 flex min-h-screen w-full items-center justify-center overflow-hidden bg-background py-32 md:py-48 lg:py-64"
			id="works"
			ref={sectionRef}
		>
			<div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[40%_60%] lg:gap-24">
				{/* Left Column: Heading and Info */}
				<div className="flex flex-col items-start" ref={textRef}>
					<span className="mb-6 block font-[family:var(--font-jetbrains-mono)] text-white/40 text-xs uppercase tracking-[0.3em]">
						Works
					</span>
					<div className="mb-4 flex flex-col items-start leading-tight">
						<span className="select-none font-[family:var(--font-jetbrains-mono)] font-bold text-4xl text-white tracking-tight md:text-5xl lg:text-6xl">
							built outta
						</span>
						<GlitchText
							className="font-[family:var(--font-jetbrains-mono)] font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl"
							enableShadows
							speed={0.4}
						>
							curiosity
						</GlitchText>
					</div>
					<div className="mt-6 min-h-[12rem] max-w-[50ch] font-[family:var(--font-jetbrains-mono)] text-base text-white/50 leading-relaxed md:text-lg lg:min-h-[14rem]">
						<DecryptedText
							delay={0}
							duration={2000}
							speed={30}
							startWhen={decryptActive}
						>
							{PROJECTS[activeIndex]?.longDescription ?? ""}
						</DecryptedText>
					</div>
				</div>

				{/* Right Column: CardSwap Stacked Deck */}
				<div
					className="relative flex h-[540px] w-full items-center justify-center lg:justify-end"
					ref={deckRef}
				>
					<div className="relative mr-0 h-[540px] w-[700px] lg:mr-8">
						<CardSwap
							cardDistance={55}
							delay={5000}
							easing="elastic"
							height={540}
							onCardChange={(idx) => setActiveIndex(idx)}
							pauseOnHover={true}
							skewAmount={3}
							verticalDistance={55}
							width={700}
						>
							{PROJECTS.map((project, index) => (
								<Card
									className="flex h-full w-full select-none flex-col justify-between p-10"
									key={project.title}
								>
									<div className="flex flex-col">
										<div className="flex items-start justify-between">
											<span className="font-[family:var(--font-jetbrains-mono)] text-white/40 text-xs uppercase tracking-[0.15em]">
												{project.category}
											</span>
											<span className="font-[family:var(--font-jetbrains-mono)] font-bold text-3xl text-white/10 leading-none">
												0{index + 1}
											</span>
										</div>
										<h3 className="mt-8 font-[family:var(--font-jetbrains-mono)] font-medium text-4xl text-white tracking-tight">
											{project.title}
										</h3>
										<p className="mt-6 max-w-[32ch] font-[family:var(--font-jetbrains-mono)] text-base text-white/50 leading-relaxed">
											{project.description}
										</p>
									</div>

									<div className="mt-auto flex flex-col gap-4">
										<div className="flex flex-wrap gap-2">
											{project.tags.map((tag) => (
												<span
													className="rounded-full border border-white/5 bg-white/5 px-2.5 py-1 font-[family:var(--font-jetbrains-mono)] text-[10px] text-white/40 uppercase tracking-wide"
													key={tag}
												>
													{tag}
												</span>
											))}
										</div>

										<div className="flex items-center gap-4 border-white/5 border-t pt-4">
											{project.github && (
												<a
													className="font-[family:var(--font-jetbrains-mono)] text-white/60 text-xs underline underline-offset-4 transition-colors hover:text-white"
													href={project.github}
													rel="noopener noreferrer"
													target="_blank"
												>
													code
												</a>
											)}
											{project.live && project.live !== "#" && (
												<a
													className="flex items-center gap-1 font-[family:var(--font-jetbrains-mono)] text-white/60 text-xs underline underline-offset-4 transition-colors hover:text-white"
													href={project.live}
													rel="noopener noreferrer"
													target="_blank"
												>
													live demo <span className="text-[9px]">↗</span>
												</a>
											)}
										</div>
									</div>
								</Card>
							))}
						</CardSwap>
					</div>
				</div>
			</div>
		</section>
	);
}
