"use client";

import PillNav from "./pill-nav";

const NAV_ITEMS = [
	{ label: "Works", href: "#works" },
	{ label: "Experience", href: "#experience" },
	{ label: "About", href: "#about" },
];

export default function Header() {
	return (
		<PillNav
			baseColor="#000000"
			className="site-nav"
			ease="power2.easeOut"
			hoveredPillTextColor="#ffffff"
			initialLoadAnimation={false}
			items={NAV_ITEMS}
			pillColor="#ffffff"
			pillTextColor="#000000"
		/>
	);
}
