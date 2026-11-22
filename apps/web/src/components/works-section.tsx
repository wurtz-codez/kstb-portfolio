"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import CardSwap, { Card, type CardSwapHandle } from "./card-swap";
import GlitchText from "./glitch-text";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
	{
		title: "Qode",
		subtitle: "Local-First Codebase Intelligence",
		description:
			"Explore unfamiliar repositories through dependency graphs and keyword + semantic retrieval.",
		longDescription:
			"Qode is a local-first developer tool that parses repositories into interactive dependency graphs. It combines keyword and semantic retrieval to help engineers navigate unfamiliar codebases, with Tree-sitter for parsing and Sigma.js for graph visualization.",
		category: "work",
		tags: ["React", "TypeScript", "Tree-sitter", "Sigma.js", "WASM"],
		github: "https://github.com/wurtz-codez/Qode",
		live: "https://qode-beta.vercel.app/home",
		caseStudy: "/projects/qode",
	},
	{
		title: "VerQ",
		subtitle: "AI Interview Practice Platform",
		description:
			"Practice resume-based interviews with spoken answers and structured AI feedback.",
		longDescription:
			"VerQ is an AI-powered interview practice platform that turns a candidate's resume into personalized interview questions, processes spoken answers, and generates structured feedback using Gemini and Deepgram. It helps candidates practice interviews tailored to their experience.",
		category: "work",
		tags: ["React", "Node.js", "Gemini", "Deepgram"],
		github: "https://github.com/wurtz-codez/verq",
		live: "https://verqai.vercel.app",
		caseStudy: "/projects/verq",
	},
	{
		title: "Arkaiv",
		subtitle: "Open-source Contributions",
		description:
			"Contributed subscription flows, email retries, and UI improvements to an AI discovery platform.",
		longDescription:
			"Arkaiv is an AI discovery platform originally created in tutankhAman/arkaiv. My contributions include the unsubscribe endpoint and dashboard notifications, subscription API and email delivery retries, CORS configuration, and navigation and dialog styling.",
		category: "work",
		tags: ["React", "Express", "MongoDB"],
		github: "https://github.com/wurtz-codez/arkaiv",
		live: "https://arkaiv.vercel.app",
		attribution: [
			{
				label: "Original project",
				href: "https://github.com/tutankhAman/arkaiv",
			},
			{
				label: "Subscription contributions",
				href: "https://github.com/wurtz-codez/arkaiv/commit/299ace3adc4b0faa102b6af9953b618dacf51ce6",
			},
			{
				label: "API and email retries",
				href: "https://github.com/wurtz-codez/arkaiv/commit/6a0632eed53d2680acf20115d649fe25c6f0a5aa",
			},
			{
				label: "UI contributions",
				href: "https://github.com/wurtz-codez/arkaiv/commit/b9b2147a8a39dc3f051f09a6a1616035a77de7e0",
			},
		],
	},
	{
		title: "Jewelry by LUNA",
		subtitle: "Jewelry E-commerce",
		description:
			"Browse curated jewelry collections and purchase through an integrated checkout.",
		longDescription:
			"Jewelry by LUNA is a React storefront for browsing curated jewelry collections and completing purchases through a custom checkout flow. Product presentation and page transitions support the shopping experience, with Stripe handling payments.",
		category: "work",
		tags: ["E-commerce", "React", "Stripe"],
		github: "https://github.com/wurtz-codez/Jewelry-by-LUNA",
		live: "https://www.jewelrybyluna.in",
	},
	{
		title: "ALLROUND",
		subtitle: "Multi-Agent Coordination",
		description:
			"Coordinate AI agents through shared state, real-time communication, and task delegation.",
		longDescription:
			"ALLROUND is a private TypeScript and Bun engine for coordinating multiple AI agents. It handles real-time communication, state synchronization, and task delegation so agents can share progress and work across distributed environments.",
		category: "project",
		tags: ["Agentic", "TS", "Bun"],
		github: null,
		live: null,
	},
] as const;

interface DeckConfig {
	width: number;
	height: number;
	distance: number;
	vDistance: number;
	compensate: boolean;
}

const DESKTOP_DECK: DeckConfig = {
	width: 700,
	height: 540,
	distance: 55,
	vDistance: 55,
	compensate: false,
};

function getDeckConfig(viewportWidth: number): DeckConfig {
	if (viewportWidth >= 1024) {
		return DESKTOP_DECK;
	}
	if (viewportWidth >= 640) {
		return {
			width: 460,
			height: 460,
			distance: 30,
			vDistance: 30,
			compensate: true,
		};
	}
	return {
		width: 260,
		height: 460,
		distance: 14,
		vDistance: 14,
		compensate: true,
	};
}

function useDeckConfig(): DeckConfig {
	const [config, setConfig] = useState<DeckConfig>(DESKTOP_DECK);

	useEffect(() => {
		const update = () => setConfig(getDeckConfig(window.innerWidth));
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	return config;
}

export default function WorksSection() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const deckRef = useRef<HTMLDivElement>(null);
	const deckControlRef = useRef<CardSwapHandle>(null);
	const deck = useDeckConfig();
	const [activeIndex, setActiveIndex] = useState(0);
	const activeProject = PROJECTS[activeIndex] ?? PROJECTS[0];
	const handleCardChange = useCallback(
		(idx: number) => setActiveIndex(idx),
		[]
	);
	const offsetX = ((PROJECTS.length - 1) * deck.distance) / 2;
	const offsetY = ((PROJECTS.length - 1) * deck.vDistance) / 2;

	useEffect(() => {
		const sectionEl = sectionRef.current;
		if (!sectionEl) {
			return;
		}

		const media = gsap.matchMedia();
		media.add(
			"(prefers-reduced-motion: no-preference)",
			() => {
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
			},
			sectionEl
		);

		return () => {
			media.revert();
		};
	}, []);

	return (
		<section
			aria-labelledby="works-heading"
			className="relative z-20 flex min-h-screen w-full items-center justify-center overflow-hidden bg-background py-32 md:py-48 lg:py-64"
			id="works"
			ref={sectionRef}
		>
			<h2 className="sr-only" id="works-heading">
				Selected projects
			</h2>
			<div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[2fr_3fr] lg:gap-24">
				{/* Left Column: Heading and Info */}
				<div className="flex flex-col items-start" ref={textRef}>
					<span className="mb-6 block font-[family:var(--font-jetbrains-mono)] text-white/60 text-xs uppercase tracking-[0.3em]">
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
					<div className="mt-6 min-h-[12rem] max-w-[50ch] font-[family:var(--font-jetbrains-mono)] text-base text-white/70 leading-relaxed md:text-lg lg:min-h-[14rem]">
						<p id="project-description">{activeProject.longDescription}</p>
						{"attribution" in activeProject && (
							<ul
								aria-label="Arkaiv attribution and contributions"
								className="mt-5 flex flex-wrap gap-x-4 gap-y-3 text-sm"
							>
								{activeProject.attribution.map((source) => (
									<li key={source.href}>
										<a
											className="underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
											href={source.href}
											rel="noopener noreferrer"
											target="_blank"
										>
											{source.label}
										</a>
									</li>
								))}
							</ul>
						)}
					</div>
					{"caseStudy" in activeProject && (
						<Link
							className="mt-5 inline-flex min-h-11 items-center rounded-full border border-white/30 px-5 py-2 text-sm text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
							href={activeProject.caseStudy}
						>
							Read {activeProject.title} case study
						</Link>
					)}

					{/* Manual deck controls */}
					<div className="mt-8 flex items-center gap-4 font-[family:var(--font-jetbrains-mono)]">
						<button
							aria-label="Previous project"
							className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white focus-visible:border-white/60 focus-visible:text-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
							onClick={() => deckControlRef.current?.prev()}
							type="button"
						>
							<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
						</button>
						<span className="text-white/60 text-xs tabular-nums">
							{String(activeIndex + 1).padStart(2, "0")} /{" "}
							{String(PROJECTS.length).padStart(2, "0")}
						</span>
						<button
							aria-label="Next project"
							className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white focus-visible:border-white/60 focus-visible:text-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
							onClick={() => deckControlRef.current?.next()}
							type="button"
						>
							<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
						</button>
					</div>
				</div>

				{/* Right Column: CardSwap Stacked Deck */}
				<div
					className="relative flex w-full items-center justify-center lg:justify-end"
					ref={deckRef}
					style={{ height: deck.height }}
				>
					<div
						className="relative mr-0 lg:mr-8"
						style={{
							width: deck.width,
							height: deck.height,
							transform: deck.compensate
								? `translate(${-offsetX}px, ${offsetY}px)`
								: undefined,
						}}
					>
						<CardSwap
							cardDistance={deck.distance}
							delay={5000}
							easing="elastic"
							height={deck.height}
							onCardChange={handleCardChange}
							pauseOnHover={true}
							ref={deckControlRef}
							skewAmount={3}
							verticalDistance={deck.vDistance}
							width={deck.width}
						>
							{PROJECTS.map((project, index) => (
								<Card
									className="flex h-full w-full select-none flex-col justify-between p-6 md:p-10"
									key={project.title}
								>
									<div className="flex flex-col">
										<div className="flex items-start justify-between">
											<span className="font-[family:var(--font-jetbrains-mono)] text-white/60 text-xs uppercase tracking-[0.15em]">
												{project.category}
											</span>
											<span className="font-[family:var(--font-jetbrains-mono)] font-bold text-2xl text-white/10 leading-none md:text-3xl">
												0{index + 1}
											</span>
										</div>
										<h3 className="mt-6 font-[family:var(--font-jetbrains-mono)] font-medium text-2xl text-white tracking-tight md:mt-8 md:text-4xl">
											{project.title}
										</h3>
										<p className="mt-2 font-[family:var(--font-jetbrains-mono)] font-medium text-sm text-white/80 md:text-base">
											{project.subtitle}
										</p>
										<p className="mt-3 max-w-[40ch] font-[family:var(--font-jetbrains-mono)] text-sm text-white/60 leading-relaxed md:mt-4 md:text-base">
											{project.description}
										</p>
									</div>

									<div className="mt-auto flex flex-col gap-4">
										<div className="flex flex-wrap gap-2">
											{project.tags.map((tag) => (
												<span
													className="rounded-full border border-white/5 bg-white/5 px-2.5 py-1 font-[family:var(--font-jetbrains-mono)] text-[10px] text-white/60 uppercase tracking-wide"
													key={tag}
												>
													{tag}
												</span>
											))}
										</div>

										<div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-white/5 border-t pt-4">
											{project.github && (
												<a
													className="inline-flex min-h-6 items-center font-[family:var(--font-jetbrains-mono)] text-white/60 text-xs underline underline-offset-4 transition-colors hover:text-white"
													href={project.github}
													rel="noopener noreferrer"
													target="_blank"
												>
													code
												</a>
											)}
											{!project.github && (
												<span className="text-sm text-white/70">
													Private repository
												</span>
											)}
											{"attribution" in project && (
												<span className="text-sm text-white/70">
													Fork · Contributor
												</span>
											)}
											{project.live && (
												<a
													className="inline-flex min-h-6 items-center gap-1 font-[family:var(--font-jetbrains-mono)] text-white/60 text-xs underline underline-offset-4 transition-colors hover:text-white"
													href={project.live}
													rel="noopener noreferrer"
													target="_blank"
												>
													live demo <span className="text-[9px]">↗</span>
												</a>
											)}
											{"caseStudy" in project && (
												<Link
													aria-label={`Read ${project.title} case study`}
													className="inline-flex min-h-6 items-center text-sm text-white/80 underline underline-offset-4 hover:text-white"
													href={project.caseStudy}
												>
													case study
												</Link>
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
