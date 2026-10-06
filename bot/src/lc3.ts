import assemble from "../../src/lc3_as.js";
import LC3 from "../../src/lc3_core.js";
import { reset } from "../../src/world_state.js";

export function runLC3(code: string, input = ""): string {
	const result = assemble(code);
	if (result.error) throw new Error(result.error.join("\n"));

	const maxSteps = 1_000_000;
	const maxOutput = 1950;
	const lc3 = new LC3();

	lc3.loadAssembled(result);
	for (const byte of new TextEncoder().encode(input)) {
		lc3.sendKey(byte);
	}
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
		let inputExhausted = false;
		while (lc3.isRunning() && steps < maxSteps && output.length < maxOutput) {
			const instruction = lc3.getMemory(lc3.pc);
			if ((instruction === 0xf020 || instruction === 0xf023) &&
				lc3.bufferedKeys.isEmpty() && (lc3.getMemory(lc3.kbsr) & 0x8000) === 0) {
				inputExhausted = true;
				break;
			}
			lc3.nextInstruction();
			steps++;
		}
		output = (output + decoder.decode()).slice(0, maxOutput);
		if (output.length >= maxOutput) {
			output += "\n[Output limit reached]";
		} else if (inputExhausted) {
			output += "\n[Input exhausted. Run again with more input.]";
		} else if (lc3.isRunning()) {
			output += "\n[Instruction limit reached]";
		}
		return output;
	} finally {
		reset();
	}
}
