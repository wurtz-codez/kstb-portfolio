"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import type React from "react";

export default function PortraitCard() {
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const mouseXSpring = useSpring(x);
	const mouseYSpring = useSpring(y);

	const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
	const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		const xPct = mouseX / width - 0.5;
		const yPct = mouseY / height - 0.5;

		x.set(xPct);
		y.set(yPct);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<motion.div
			className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950"
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			style={{
				rotateX,
				rotateY,
				transformStyle: "preserve-3d",
			}}
		>
			{/* The Hero Image element */}
			<div className="absolute inset-0 z-0">
				<Image
					alt="Koustubh Pande Editorial Portrait"
					className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
					fill
					priority
					src="/portrait.png"
				/>
			</div>

			{/* Subtle grain overlay */}
			<div className="pointer-events-none absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />

			{/* Clean Editorial Overlay */}
			<div
				className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6"
				style={{ transform: "translateZ(40px)" }}
			>
				<div className="flex flex-col gap-2">
					<div>
						<h3 className="font-medium font-sans text-2xl text-white leading-none tracking-tight">
							Koustubh
						</h3>
						<p className="mt-1.5 font-mono text-[11px] text-white/60 tracking-wider">
							Developer, designer, builder..
						</p>
					</div>

					<div className="mt-4 flex items-center justify-between border-white/10 border-t pt-3 font-mono text-[10px] text-white/40 uppercase tracking-[0.15em]">
						<span>India</span>
						<span>Building on the web</span>
					</div>
				</div>
			</div>

			{/* Highlight Glare */}
			<motion.div
				className="pointer-events-none absolute inset-0 z-30"
				style={{
					background:
						"radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 80%)",
					left: useTransform(mouseXSpring, [-0.5, 0.5], ["-20%", "20%"]),
					top: useTransform(mouseYSpring, [-0.5, 0.5], ["-20%", "20%"]),
				}}
			/>
		</motion.div>
	);
}
