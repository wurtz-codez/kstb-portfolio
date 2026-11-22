interface CaseStudy {
	slug: string;
	title: string;
	subtitle: string;
	overview: string;
	stack: readonly string[];
	github: string;
	live: string;
	sections: readonly {
		title: string;
		paragraphs: readonly string[];
		points?: readonly string[];
	}[];
	sources: readonly { label: string; href: string }[];
}

export const CASE_STUDIES: readonly CaseStudy[] = [
	{
		slug: "qode",
		title: "Qode",
		subtitle: "Local-First Codebase Intelligence",
		overview:
			"A developer tool that turns repositories into navigable dependency graphs and combines keyword and semantic retrieval to help engineers understand unfamiliar code.",
		stack: [
			"React",
			"TypeScript",
			"Vite",
			"Tree-sitter WASM",
			"Sigma.js",
			"KuzuDB WASM",
			"Transformers.js",
			"Web Workers",
		],
		github: "https://github.com/wurtz-codez/Qode",
		live: "https://qode-beta.vercel.app/home",
		sections: [
			{
				title: "The problem",
				paragraphs: [
					"Reading individual files makes it difficult to understand how an unfamiliar repository fits together. Qode brings code structure and search into one interface, helping developers move between symbols, dependencies, and execution paths.",
				],
			},
			{
				title: "Architecture and data flow",
				paragraphs: [
					"The browser experience accepts a repository archive or GitHub URL and performs parsing and indexing locally. The graph provides structural context; retrieval helps locate relevant code within it.",
				],
				points: [
					"Tree-sitter WASM extracts code structure, including imports, functions, and classes.",
					"Graph data is indexed with KuzuDB WASM and explored through Sigma.js and Graphology.",
					"BM25 keyword results and embedding-based matches are combined using reciprocal rank fusion.",
					"Web Workers move ingestion work away from the interface thread.",
				],
			},
			{
				title: "Technical decisions",
				paragraphs: [
					"Keyword search handles exact names; semantic retrieval helps when a developer describes intent instead of knowing a symbol. Reciprocal rank fusion combines positions in the two result lists without requiring their raw scores to share a scale.",
					"The search implementation also accepts keyword-only results while embeddings are unavailable. This keeps the retrieval path useful without making semantic indexing a prerequisite for every query.",
				],
			},
			{
				title: "Delivered workflow and trade-offs",
				paragraphs: [
					"Developers can inspect architecture, follow relationships across files, and locate code through the visual explorer. A CLI and MCP interface also expose repository indexing to coding agents.",
					"Local indexing avoids a server upload for parsing, but moves processing and memory costs to the user's device. Repository size and browser capabilities therefore matter when evaluating the experience.",
				],
			},
		],
		sources: [
			{
				label: "Project documentation",
				href: "https://github.com/wurtz-codez/Qode#readme",
			},
			{
				label: "Hybrid retrieval implementation",
				href: "https://github.com/wurtz-codez/Qode/blob/main/qode-web/src/core/search/hybrid-search.ts",
			},
			{
				label: "Ingestion worker",
				href: "https://github.com/wurtz-codez/Qode/blob/main/qode-web/src/workers/ingestion.worker.ts",
			},
		],
	},
	{
		slug: "verq",
		title: "VerQ",
		subtitle: "AI Interview Practice Platform",
		overview:
			"An interview practice product that turns resume context into personalized questions, processes spoken answers, and returns structured feedback with Gemini and Deepgram.",
		stack: [
			"React",
			"Vite",
			"Node.js",
			"MongoDB",
			"Gemini",
			"Deepgram",
			"Firebase Auth",
		],
		github: "https://github.com/wurtz-codez/verq",
		live: "https://verqai.vercel.app",
		sections: [
			{
				title: "The problem",
				paragraphs: [
					"Generic question lists do not reflect a candidate's experience or respond to an answer. VerQ connects resume context, the target role, and spoken responses into a personalized practice session.",
				],
			},
			{
				title: "Architecture and data flow",
				paragraphs: [
					"A React interface connects to a Node.js backend with separate services for resume processing, model interactions, speech, and interview persistence.",
				],
				points: [
					"Resume processing supplies candidate context for question generation.",
					"Gemini generates questions, evaluates answers, and supports follow-up questions based on the previous response.",
					"Deepgram transcribes audio responses; text-to-speech services provide spoken questions.",
					"Interview records store questions, answers, evaluations, and session status in MongoDB, associated with a user identity.",
				],
			},
			{
				title: "Technical decisions",
				paragraphs: [
					"Speech recognition and answer evaluation use separate services. Transcription produces text that the evaluation stage can consume, keeping audio handling separate from model-specific question and feedback logic.",
					"The interview service persists each question, answer, and evaluation together. Explicit session states distinguish pending, active, completed, and cancelled interviews, while a separate summary evaluation can be stored on completion.",
				],
			},
			{
				title: "Delivered workflow and trade-offs",
				paragraphs: [
					"The product brings resume-based questions, voice interaction, and feedback into one interview workflow. The repository includes scripts for exercising PDF extraction, question generation, and speech conversion.",
					"Transcription quality affects the answer sent for evaluation, and external model and speech APIs add latency and availability dependencies. The backend documents fallback question generation when a question provider is unavailable; this does not replace the full speech and evaluation pipeline.",
				],
			},
		],
		sources: [
			{
				label: "Project documentation",
				href: "https://github.com/wurtz-codez/verq#readme",
			},
			{
				label: "Interview workflow",
				href: "https://github.com/wurtz-codez/verq/blob/main/backend/src/workflows/interview-flow.js",
			},
			{
				label: "Interview persistence service",
				href: "https://github.com/wurtz-codez/verq/blob/main/backend/src/services/interviewService.js",
			},
		],
	},
];
