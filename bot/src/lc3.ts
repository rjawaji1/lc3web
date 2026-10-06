import assemble from "../../src/lc3_as.js";
import LC3 from "../../src/lc3_core.js";
import { reset } from "../../src/world_state.js";

export function runLC3(code: string): string {
	const result = assemble(code);
	if (result.error) throw new Error(result.error.join("\n"));

	const maxSteps = 100_000;
	const maxOutput = 1900;
	const lc3 = new LC3();
	lc3.loadAssembled(result);
	const decoder = new TextDecoder();
	let output = "";

	lc3.addListener((event: { type: string; value?: number | string }) => {
		if (output.length >= maxOutput) return;
		if (event.type === "keyout") {
			output += decoder.decode(new Uint8Array([event.value as number]), { stream: true });
		} else if (event.type === "print") {
			output += event.value as string;
		}
		output = output.slice(0, maxOutput);
	});

	reset();
	try {
		let steps = 0;
		while (lc3.isRunning() && steps < maxSteps && output.length < maxOutput) {
			lc3.nextInstruction();
			steps++;
		}
		output = (output + decoder.decode()).slice(0, maxOutput);
		if (output.length >= maxOutput) {
			output += "\n[Output limit reached]";
		} else if (lc3.isRunning()) {
			output += "\n[Instruction limit reached]";
		}
		return output;
	} finally {
		reset();
	}
}
