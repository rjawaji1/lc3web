import type {
	APIChatInputApplicationCommandInteraction,
	APIInteractionResponse
} from "discord-api-types/v10"

import { ephemeral } from "../discord_responses";
import { Responses } from "../constants";

type CommandHandler = (
	interaction: APIChatInputApplicationCommandInteraction,
	env: Env,
	ctx: ExecutionContext
) => Promise<APIInteractionResponse>;

const slash_commands: Record<string, CommandHandler> = {}

export async function handleApplicationCommand(
	interaction: APIChatInputApplicationCommandInteraction,
	env: Env,
	ctx: ExecutionContext
): Promise<Response> {
	const handler = slash_commands[interaction.data.name];

	if (handler) return Response.json(await handler(interaction, env, ctx));

	return Response.json(ephemeral(Responses.NotImplemented));
}
