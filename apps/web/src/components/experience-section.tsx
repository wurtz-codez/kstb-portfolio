const EXPERIENCE = [
	{
		id: "singularity-works",
		role: "Founding Engineer / Co-founder",
		company: "Singularity Works",
		start: "2025-08",
		startLabel: "Aug 2025",
		end: null,
		endLabel: "Present",
		summary:
			"Built product architecture, reusable frontend systems, and backend integration workflows in an early-stage startup.",
		details: [
			"Architected and developed full-stack product infrastructure, working across system architecture, frontend engineering, backend integration, and deployment.",
			"Designed a monorepo architecture using pnpm, Bun, and Turborepo, with Docker-based development workflows and CI/CD integration.",
			"Built 40+ reusable React components, implementing code splitting and lazy loading to improve frontend performance and maintainability.",
			"Designed REST API contracts and service boundaries to support frontend-backend integration and deployment workflows.",
		],
		stack: [
			"React",
			"TypeScript",
			"Node.js",
			"pnpm",
			"Bun",
			"Turborepo",
			"Docker",
			"REST APIs",
			"CI/CD",
		],
	},
	{
		id: "freelance",
		role: "Full-Stack Developer",
		company: "Freelance",
		start: "2024-12",
		startLabel: "Dec 2024",
		end: "2025-06",
		endLabel: "Jun 2025",
		summary:
			"Delivered e-commerce applications, admin dashboards, and responsive client websites, from frontend interfaces to backend functionality.",
		details: [
			"Developed a MERN-stack e-commerce platform for a jewelry startup, including product catalogs, order management, and an administrative dashboard.",
			"Implemented role-based administration with JWT authentication for managing application operations.",
			"Developed React/Redux features for an Appwrite-backed gamified application.",
			"Built responsive websites for a school organization and a designer using Next.js and Tailwind CSS.",
		],
		stack: [
			"React",
			"Next.js",
			"Node.js",
			"Express.js",
			"MongoDB",
			"Redux",
			"Appwrite",
			"JWT",
			"Tailwind CSS",
		],
	},
] as const;

export default function ExperienceSection() {
	return (
		<section
			aria-labelledby="experience-heading"
			className="relative z-20 scroll-mt-24 bg-background px-6 py-24 md:py-40"
			id="experience"
		>
			<div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
				<div>
					<p className="mb-4 text-sm text-white/60 uppercase tracking-[0.2em]">
						Experience
					</p>
					<h2
						className="font-medium text-4xl text-white leading-tight tracking-tight md:text-5xl"
						id="experience-heading"
					>
						Professional journey
					</h2>
				</div>
				<ol className="ml-2 border-white/20 border-l">
					{EXPERIENCE.map((experience) => (
						<li
							className="relative pb-14 pl-7 last:pb-0 md:pl-10"
							key={experience.id}
						>
							<span
								aria-hidden="true"
								className="absolute top-1.5 -left-1.5 size-3 rounded-full bg-white ring-8 ring-background"
							/>
							<p className="mb-3 text-sm text-white/60">
								<time dateTime={experience.start}>{experience.startLabel}</time>
								{" – "}
								{experience.end ? (
									<time dateTime={experience.end}>{experience.endLabel}</time>
								) : (
									experience.endLabel
								)}
							</p>
							<h3 className="font-medium text-white text-xl md:text-2xl">
								{experience.role}
							</h3>
							<p className="mt-2 text-base text-white/80">
								{experience.company} · Remote
							</p>
							<p className="mt-4 max-w-[65ch] text-base text-white/70 leading-relaxed">
								{experience.summary}
							</p>
							<ul
								aria-label={`${experience.company} technologies`}
								className="mt-5 flex flex-wrap gap-2"
							>
								{experience.stack.map((technology) => (
									<li
										className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/70"
										key={technology}
									>
										{technology}
									</li>
								))}
							</ul>
							<details className="group mt-6">
								<summary className="w-fit cursor-pointer rounded-sm py-2 font-medium text-sm text-white underline decoration-white/40 underline-offset-4 hover:decoration-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4">
									Engineering responsibilities
									<span className="sr-only"> at {experience.company}</span>
								</summary>
								<ul className="mt-3 list-disc space-y-3 pl-5 text-base text-white/70 leading-relaxed marker:text-white/40">
									{experience.details.map((detail) => (
										<li key={detail}>{detail}</li>
									))}
								</ul>
							</details>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
