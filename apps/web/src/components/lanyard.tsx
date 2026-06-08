/* eslint-disable react/no-unknown-property */
"use client";

import {
	Environment,
	Lightformer,
	useGLTF,
	useTexture,
} from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
	BallCollider,
	CuboidCollider,
	Physics,
	RigidBody,
	type RigidBodyProps,
	useRopeJoint,
	useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { useEffect, useRef, useState } from "react";
import { CatmullRomCurve3, Color, RepeatWrapping, Vector3 } from "three";

import "./lanyard.css";

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
	position?: [number, number, number];
	gravity?: [number, number, number];
	fov?: number;
	transparent?: boolean;
	cardScale?: number;
}

export default function Lanyard({
	position = [0, 0, 30],
	gravity = [0, -40, 0],
	fov = 20,
	transparent = true,
	cardScale = 2.25,
}: LanyardProps) {
	const [isMobile, setIsMobile] = useState<boolean>(
		() => typeof window !== "undefined" && window.innerWidth < 768
	);

	useEffect(() => {
		const handleResize = (): void => setIsMobile(window.innerWidth < 768);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="lanyard-wrapper">
			<Canvas
				camera={{ position, fov }}
				dpr={[1, isMobile ? 1.5 : 2]}
				gl={{ alpha: transparent }}
				onCreated={({ gl }) =>
					gl.setClearColor(new Color(0x00_00_00), transparent ? 0 : 1)
				}
			>
				<ambientLight intensity={Math.PI} />
				<Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
					<Band cardScale={cardScale} isMobile={isMobile} />
				</Physics>
				<Environment blur={0.75}>
					<Lightformer
						color="white"
						intensity={2}
						position={[0, -1, 5]}
						rotation={[0, 0, Math.PI / 3]}
						scale={[100, 0.1, 1]}
					/>
					<Lightformer
						color="white"
						intensity={3}
						position={[-1, -1, 1]}
						rotation={[0, 0, Math.PI / 3]}
						scale={[100, 0.1, 1]}
					/>
					<Lightformer
						color="white"
						intensity={3}
						position={[1, 1, 1]}
						rotation={[0, 0, Math.PI / 3]}
						scale={[100, 0.1, 1]}
					/>
					<Lightformer
						color="white"
						intensity={10}
						position={[-10, 0, 14]}
						rotation={[0, Math.PI / 2, Math.PI / 3]}
						scale={[100, 10, 1]}
					/>
				</Environment>
			</Canvas>
		</div>
	);
}

interface BandProps {
	maxSpeed?: number;
	minSpeed?: number;
	isMobile?: boolean;
	cardScale?: number;
}

function Band({
	maxSpeed = 50,
	minSpeed = 0,
	isMobile = false,
	cardScale = 2.25,
}: BandProps) {
	// biome-ignore lint/suspicious/noExplicitAny: refs depend on Three/Rapier internals
	const band = useRef<any>(null);
	// biome-ignore lint/suspicious/noExplicitAny: refs depend on Three/Rapier internals
	const fixed = useRef<any>(null);
	// biome-ignore lint/suspicious/noExplicitAny: refs depend on Three/Rapier internals
	const j1 = useRef<any>(null);
	// biome-ignore lint/suspicious/noExplicitAny: refs depend on Three/Rapier internals
	const j2 = useRef<any>(null);
	// biome-ignore lint/suspicious/noExplicitAny: refs depend on Three/Rapier internals
	const j3 = useRef<any>(null);
	// biome-ignore lint/suspicious/noExplicitAny: refs depend on Three/Rapier internals
	const card = useRef<any>(null);

	const vec = new Vector3();
	const ang = new Vector3();
	const rot = new Vector3();
	const dir = new Vector3();

	// biome-ignore lint/suspicious/noExplicitAny: props depend on Three/Rapier internals
	const segmentProps: any = {
		type: "dynamic" as RigidBodyProps["type"],
		canSleep: true,
		colliders: false,
		angularDamping: 4,
		linearDamping: 4,
	};

	// biome-ignore lint/suspicious/noExplicitAny: useGLTF nodes/materials are dynamically generated
	const { nodes, materials } = useGLTF("/card.glb") as any;
	const texture = useTexture("/lanyard.png");
	const [curve] = useState(
		() =>
			new CatmullRomCurve3([
				new Vector3(),
				new Vector3(),
				new Vector3(),
				new Vector3(),
			])
	);
	const [dragged, drag] = useState<false | Vector3>(false);
	const [hovered, hover] = useState(false);

	useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
	useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
	useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
	useSphericalJoint(j3, card, [
		[0, 0, 0],
		[0, 1.45, 0],
	]);

	useEffect(() => {
		if (hovered) {
			document.body.style.cursor = dragged ? "grabbing" : "grab";
			return () => {
				document.body.style.cursor = "auto";
			};
		}
	}, [hovered, dragged]);

	useFrame((state, delta) => {
		if (dragged && typeof dragged !== "boolean") {
			vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
			dir.copy(vec).sub(state.camera.position).normalize();
			vec.add(dir.multiplyScalar(state.camera.position.length()));

			for (const ref of [card, j1, j2, j3, fixed]) {
				ref.current?.wakeUp();
			}

			card.current?.setNextKinematicTranslation({
				x: vec.x - dragged.x,
				y: vec.y - dragged.y,
				z: vec.z - dragged.z,
			});
		}
		if (fixed.current) {
			for (const ref of [j1, j2]) {
				if (!ref.current.lerped) {
					ref.current.lerped = new Vector3().copy(ref.current.translation());
				}
				const clampedDistance = Math.max(
					0.1,
					Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
				);
				ref.current.lerped.lerp(
					ref.current.translation(),
					delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
				);
			}
			curve.points[0].copy(j3.current.translation());
			curve.points[1].copy(j2.current.lerped);
			curve.points[2].copy(j1.current.lerped);
			curve.points[3].copy(fixed.current.translation());
			band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
			ang.copy(card.current.angvel());
			rot.copy(card.current.rotation());
			card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
		}
	});

	curve.curveType = "chordal";
	texture.wrapS = texture.wrapT = RepeatWrapping;

	return (
		<>
			<group position={[0, 4, 0]}>
				<RigidBody
					ref={fixed}
					{...segmentProps}
					type={"fixed" as RigidBodyProps["type"]}
				/>
				<RigidBody
					position={[0.5, 0, 0]}
					ref={j1}
					{...segmentProps}
					type={"dynamic" as RigidBodyProps["type"]}
				>
					<BallCollider args={[0.1]} />
				</RigidBody>
				<RigidBody
					position={[1, 0, 0]}
					ref={j2}
					{...segmentProps}
					type={"dynamic" as RigidBodyProps["type"]}
				>
					<BallCollider args={[0.1]} />
				</RigidBody>
				<RigidBody
					position={[1.5, 0, 0]}
					ref={j3}
					{...segmentProps}
					type={"dynamic" as RigidBodyProps["type"]}
				>
					<BallCollider args={[0.1]} />
				</RigidBody>
				<RigidBody
					position={[2, 0, 0]}
					ref={card}
					{...segmentProps}
					type={
						dragged
							? ("kinematicPosition" as RigidBodyProps["type"])
							: ("dynamic" as RigidBodyProps["type"])
					}
				>
					<CuboidCollider
						args={[0.8 * (cardScale / 2.25), 1.125 * (cardScale / 2.25), 0.01]}
					/>
					<group
						// biome-ignore lint/suspicious/noExplicitAny: using any for React Three Fiber Pointer event
						onPointerDown={(e: any) => {
							e.target.setPointerCapture(e.pointerId);
							drag(
								new Vector3()
									.copy(e.point)
									.sub(vec.copy(card.current.translation()))
							);
						}}
						onPointerOut={() => hover(false)}
						onPointerOver={() => hover(true)}
						// biome-ignore lint/suspicious/noExplicitAny: using any for React Three Fiber Pointer event
						onPointerUp={(e: any) => {
							e.target.releasePointerCapture(e.pointerId);
							drag(false);
						}}
						position={[0, -1.2 * (cardScale / 2.25), -0.05]}
						scale={cardScale}
					>
						<mesh geometry={nodes.card.geometry}>
							<meshPhysicalMaterial
								clearcoat={isMobile ? 0 : 1}
								clearcoatRoughness={0.15}
								map={materials.base.map}
								map-anisotropy={16}
								metalness={0.8}
								roughness={0.9}
							/>
						</mesh>
						<mesh
							geometry={nodes.clip.geometry}
							material={materials.metal}
							material-roughness={0.3}
						/>
						<mesh geometry={nodes.clamp.geometry} material={materials.metal} />
					</group>
				</RigidBody>
			</group>
			<mesh ref={band}>
				<meshLineGeometry />
				<meshLineMaterial
					color="white"
					depthTest={false}
					lineWidth={1}
					map={texture}
					repeat={[-4, 1]}
					resolution={isMobile ? [1000, 2000] : [1000, 1000]}
					useMap
				/>
			</mesh>
		</>
	);
}
