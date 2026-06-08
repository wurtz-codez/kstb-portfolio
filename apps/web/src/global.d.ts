import type * as THREE from "three";

declare module "meshline" {
	export class MeshLineGeometry extends THREE.BufferGeometry {
		constructor();
		setPoints(points: THREE.Vector3[] | number[]): void;
	}
	export class MeshLineMaterial extends THREE.ShaderMaterial {
		// biome-ignore lint/suspicious/noExplicitAny: library constructor parameters are untyped
		constructor(parameters?: any);
	}
}

declare global {
	// biome-ignore lint/style/noNamespace: React JSX global namespace extension
	namespace JSX {
		interface IntrinsicElements {
			// biome-ignore lint/suspicious/noExplicitAny: custom R3F elements are dynamic
			meshLineGeometry: any;
			// biome-ignore lint/suspicious/noExplicitAny: custom R3F elements are dynamic
			meshLineMaterial: any;
		}
	}
}

declare module "react" {
	// biome-ignore lint/style/noNamespace: React JSX namespace extension
	namespace JSX {
		interface IntrinsicElements {
			// biome-ignore lint/suspicious/noExplicitAny: custom R3F elements are dynamic
			meshLineGeometry: any;
			// biome-ignore lint/suspicious/noExplicitAny: custom R3F elements are dynamic
			meshLineMaterial: any;
		}
	}
}
