"use client";

import gsap from "gsap";
import React, {
	Children,
	cloneElement,
	forwardRef,
	isValidElement,
	type ReactElement,
	type ReactNode,
	type RefObject,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
} from "react";
import "./card-swap.css";

export interface CardSwapProps {
	width?: number | string;
	height?: number | string;
	cardDistance?: number;
	verticalDistance?: number;
	delay?: number;
	pauseOnHover?: boolean;
	onCardClick?: (idx: number) => void;
	onCardChange?: (idx: number) => void;
	skewAmount?: number;
	easing?: "linear" | "elastic";
	children: ReactNode;
}

export interface CardSwapHandle {
	next: () => void;
	prev: () => void;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
	({ customClass, ...rest }, ref) => (
		<div
			ref={ref}
			{...rest}
			className={`card ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
		/>
	)
);
Card.displayName = "Card";

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
	x: number;
	y: number;
	z: number;
	zIndex: number;
}

const makeSlot = (
	i: number,
	distX: number,
	distY: number,
	total: number
): Slot => ({
	x: i * distX,
	y: -i * distY,
	z: -i * distX * 1.5,
	zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
	gsap.set(el, {
		x: slot.x,
		y: slot.y,
		z: slot.z,
		xPercent: -50,
		yPercent: -50,
		skewY: skew,
		transformOrigin: "center center",
		zIndex: slot.zIndex,
		force3D: true,
	});

const CardSwap = forwardRef<CardSwapHandle, CardSwapProps>(
	(
		{
			width = 500,
			height = 400,
			cardDistance = 60,
			verticalDistance = 70,
			delay = 5000,
			pauseOnHover = false,
			onCardClick,
			onCardChange,
			skewAmount = 6,
			easing = "elastic",
			children,
		},
		ref
	) => {
		const config = useMemo(
			() =>
				easing === "elastic"
					? { ease: "elastic.out(0.6,0.9)", duration: 2 }
					: { ease: "power1.inOut", duration: 0.8 },
			[easing]
		);

		const childArr = useMemo(
			() => Children.toArray(children) as ReactElement<CardProps>[],
			[children]
		);
		const childCount = childArr.length;
		const refs = useMemo<CardRef[]>(
			() => Array.from({ length: childCount }, () => React.createRef()),
			[childCount]
		);

		const order = useRef<number[]>(
			Array.from({ length: childCount }, (_, i) => i)
		);

		const tlRef = useRef<gsap.core.Timeline | null>(null);
		const intervalRef = useRef<number>(0);
		const container = useRef<HTMLDivElement>(null);
		const total = refs.length;

		// Place cards and reset the stack whenever the geometry changes.
		useEffect(() => {
			order.current = Array.from({ length: total }, (_, i) => i);
			for (let i = 0; i < refs.length; i++) {
				const el = refs[i].current;
				if (el) {
					placeNow(
						el,
						makeSlot(i, cardDistance, verticalDistance, total),
						skewAmount
					);
				}
			}
		}, [refs, cardDistance, verticalDistance, skewAmount, total]);

		const runSwap = useCallback(
			(direction: "next" | "prev") => {
				if (total < 2) {
					return;
				}

				const current = order.current;
				const nextOrder =
					direction === "next"
						? [...current.slice(1), current[0]]
						: [current[total - 1], ...current.slice(0, -1)];
				order.current = nextOrder;

				tlRef.current?.kill();
				const tl = gsap.timeline();
				tlRef.current = tl;

				nextOrder.forEach((cardIndex, slotIndex) => {
					const el = refs[cardIndex].current;
					if (!el) {
						return;
					}
					const slot = makeSlot(
						slotIndex,
						cardDistance,
						verticalDistance,
						total
					);
					tl.to(
						el,
						{
							x: slot.x,
							y: slot.y,
							z: slot.z,
							zIndex: slot.zIndex,
							duration: config.duration,
							ease: config.ease,
						},
						0
					);
				});

				onCardChange?.(nextOrder[0]);
			},
			[cardDistance, verticalDistance, config, onCardChange, refs, total]
		);

		const startAuto = useCallback(() => {
			clearInterval(intervalRef.current);
			intervalRef.current = window.setInterval(() => runSwap("next"), delay);
		}, [delay, runSwap]);

		useEffect(() => {
			startAuto();
			return () => clearInterval(intervalRef.current);
		}, [startAuto]);

		useEffect(() => {
			if (!pauseOnHover) {
				return;
			}
			const node = container.current;
			if (!node) {
				return;
			}
			const pause = () => {
				tlRef.current?.pause();
				clearInterval(intervalRef.current);
			};
			const resume = () => {
				tlRef.current?.play();
				startAuto();
			};
			node.addEventListener("mouseenter", pause);
			node.addEventListener("mouseleave", resume);
			return () => {
				node.removeEventListener("mouseenter", pause);
				node.removeEventListener("mouseleave", resume);
			};
		}, [pauseOnHover, startAuto]);

		const handleNext = useCallback(() => {
			runSwap("next");
			startAuto();
		}, [runSwap, startAuto]);

		const handlePrev = useCallback(() => {
			runSwap("prev");
			startAuto();
		}, [runSwap, startAuto]);

		useImperativeHandle(ref, () => ({ next: handleNext, prev: handlePrev }), [
			handleNext,
			handlePrev,
		]);

		const rendered = childArr.map((child, i) =>
			isValidElement<CardProps>(child)
				? cloneElement(child, {
						key: i,
						ref: refs[i],
						style: {
							width,
							height,
							cursor: "pointer",
							...(child.props.style ?? {}),
						},
						onClick: (e) => {
							child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
							onCardClick?.(i);
						},
					} as CardProps & React.RefAttributes<HTMLDivElement>)
				: child
		);

		return (
			<div
				className="card-swap-container"
				ref={container}
				style={{ width, height }}
			>
				{rendered}
			</div>
		);
	}
);

CardSwap.displayName = "CardSwap";

export default CardSwap;
