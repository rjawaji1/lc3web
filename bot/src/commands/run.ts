import type {
	APIChatInputApplicationCommandInteraction,
	APIInteractionResponse
} from "discord-api-types/v10"
import { modal, modalTextAreaComponent } from "../discord_responses"

export const run = async (
	_interaction: APIChatInputApplicationCommandInteraction,
	_env: Env,
	_ctx: ExecutionContext
): Promise<APIInteractionResponse> => {
	return modal("run", "Run LC3", [modalTextAreaComponent("code", "Enter Source Code")]);
}
