"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface ExpertiseCardProps {
	icon: LucideIcon;
	label: string;
	title: string;
	description: string;
	index: number;
}

export default function ExpertiseCard({
	icon: Icon,
	label,
	title,
	description,
	index,
}: ExpertiseCardProps) {
	return (
		<motion.div
			className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:bg-white/[0.05]"
			initial={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.5, delay: 0.1 * index }}
			viewport={{ once: true }}
			whileHover={{ y: -5 }}
			whileInView={{ opacity: 1, y: 0 }}
		>
			<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 transition-colors group-hover:bg-white/10">
				<Icon className="h-5 w-5 text-white/70" />
			</div>
			<p className="mb-1 font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">
				{label}
			</p>
			<h4 className="mb-2 font-medium text-base text-white">{title}</h4>
			<p className="text-sm text-white/50 leading-relaxed">{description}</p>
		</motion.div>
	);
}
