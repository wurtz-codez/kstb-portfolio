"use client";

import { DecryptedText } from "@/components/decrypted-text";

import { useLoader } from "@/contexts/loader-context";

const POINTS = [
	"Full-Stack Product Builder",
	"AI-Driven System Designer",
	"Co-Founder of Singularity Works",
	"iOS Application Developer",
] as const;

export default function BottomText() {
	const { loaderComplete } = useLoader();

	return (
		<div className="bottom-text-points">
			{POINTS.map((point, index) => (
				<DecryptedText
					className="bottom-text-point text-sm md:text-base"
					delay={500 + index * 200}
					duration={3500 + index * 250}
					key={point}
					startWhen={loaderComplete}
				>
					{point}
				</DecryptedText>
			))}
		</div>
	);
}
