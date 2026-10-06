import type {
	APIMessageComponentInteraction,
	APIInteractionResponse
} from "discord-api-types/v10"
import { modal, modalTextAreaComponent } from "../discord_responses";

export const run = async (
	_interaction: APIMessageComponentInteraction,
	_env: Env,
	_ctx: ExecutionContext
): Promise<APIInteractionResponse> => {
	return modal("run_input", "Run LC3", [
		modalTextAreaComponent("input", "Program input (optional)", {
			required: false,
			maxLength: 4000,
			placeholder: "Enter all characters for GETC / IN in order. Leave blank if none are needed.",
		}),
	]);
}
