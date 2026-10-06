import type {
	APIModalSubmitInteraction,
	APIInteractionResponse
} from "discord-api-types/v10"

import { ephemeral } from "../discord_responses";
import { Responses } from "../constants";

import { source } from "./source"
import { input } from "./input"

type ModalHandler = (
	interaction: APIModalSubmitInteraction,
	env: Env,
	ctx: ExecutionContext
) => Promise<APIInteractionResponse>;

const modals: Record<string, ModalHandler> = {
	"parse_code": source,
	"run_input": input
}

export async function handleModalSubmit(
	interaction: APIModalSubmitInteraction,
	env: Env,
	ctx: ExecutionContext
): Promise<Response> {
	const handler = modals[interaction.data.custom_id];

	if (handler) return Response.json(await handler(interaction, env, ctx));

	return Response.json(ephemeral(Responses.NotImplemented));
}
