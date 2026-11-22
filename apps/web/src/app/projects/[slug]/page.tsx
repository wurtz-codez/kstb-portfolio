import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/case-studies";

interface CaseStudyPageProps {
	params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
	return CASE_STUDIES.map(({ slug }) => ({ slug }));
}

function getCaseStudy(slug: string) {
	const study = CASE_STUDIES.find((candidate) => candidate.slug === slug);
	if (!study) {
		notFound();
	}
	return study;
}

export async function generateMetadata({
	params,
}: CaseStudyPageProps): Promise<Metadata> {
	const { slug } = await params;
	const study = getCaseStudy(slug);
	return {
		title: `${study.title} Case Study | Koustubh Pande`,
		description: study.overview,
	};
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
	const { slug } = await params;
	const study = getCaseStudy(slug);
	return (
		<main className="min-h-svh bg-background px-6 py-8 text-white sm:px-10">
			<div className="mx-auto max-w-[1000px]">
				<nav
					aria-label="Case study navigation"
					className="flex flex-wrap items-center justify-between gap-4 border-white/15 border-b pb-6 text-sm"
				>
					<Link
						className="py-2 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
						href="/#works"
					>
						Back to projects
					</Link>
					<a
						className="rounded-full bg-white px-4 py-3 font-medium text-black focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
						download="koustubh-resume.pdf"
						href="/koustubh_resume.pdf"
					>
						Download Resume
					</a>
				</nav>
				<article className="py-16 md:py-24">
					<header>
						<p className="text-sm text-white/60 uppercase tracking-[0.2em]">
							Technical case study
						</p>
						<h1 className="mt-5 font-medium text-5xl tracking-tight sm:text-7xl">
							{study.title}
						</h1>
						<p className="mt-4 text-white/90 text-xl sm:text-2xl">
							{study.subtitle}
						</p>
						<p className="mt-6 max-w-[70ch] text-base text-white/70 leading-relaxed sm:text-lg">
							{study.overview}
						</p>
						<ul
							aria-label="Technology stack"
							className="mt-6 flex flex-wrap gap-2"
						>
							{study.stack.map((technology) => (
								<li
									className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-white/80"
									key={technology}
								>
									{technology}
								</li>
							))}
						</ul>
						<div className="mt-8 flex flex-wrap gap-4 text-sm">
							<a
								className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-5 py-2 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
								href={study.github}
								rel="noopener noreferrer"
								target="_blank"
							>
								View code
							</a>
							<a
								className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-5 py-2 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
								href={study.live}
								rel="noopener noreferrer"
								target="_blank"
							>
								Live demo
							</a>
						</div>
					</header>
					<div className="mt-16 space-y-12">
						{study.sections.map((section) => (
							<section
								className="border-white/15 border-t pt-8"
								key={section.title}
							>
								<h2 className="font-medium text-2xl leading-snug sm:text-3xl">
									{section.title}
								</h2>
								<div className="mt-5 max-w-[75ch] space-y-4 text-base text-white/70 leading-relaxed sm:text-lg">
									{section.paragraphs.map((paragraph) => (
										<p key={paragraph}>{paragraph}</p>
									))}
									{section.points && (
										<ul className="list-disc space-y-3 pl-5 marker:text-white/40">
											{section.points.map((point) => (
												<li key={point}>{point}</li>
											))}
										</ul>
									)}
								</div>
							</section>
						))}
						<section className="border-white/15 border-t pt-8">
							<h2 className="font-medium text-2xl">
								Explore the implementation
							</h2>
							<ul className="mt-5 space-y-3 text-base text-white/80">
								{study.sources.map((source) => (
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
						</section>
					</div>
				</article>
				<footer className="flex flex-wrap justify-between gap-4 border-white/15 border-t py-8 text-sm text-white/70">
					<p>© 2026 Koustubh Pande</p>
					<a
						className="underline underline-offset-4"
						href="mailto:koustubhpande021@gmail.com"
					>
						Discuss a project
					</a>
				</footer>
			</div>
		</main>
	);
}
