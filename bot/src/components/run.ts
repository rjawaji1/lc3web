import type {
	APIMessageComponentInteraction,
	APIInteractionResponse
} from "discord-api-types/v10"
import { ephemeral, reply } from "../discord_responses";
import { runLC3 } from "../lc3";

export const run = async (
	interaction: APIMessageComponentInteraction,
	_env: Env,
	_ctx: ExecutionContext
): Promise<APIInteractionResponse> => {
	const prefix = "```x86asm\n";
	const suffix = "\n```";
	const description = interaction.message.embeds[0]?.description;
	if (!description?.startsWith(prefix) || !description.endsWith(suffix)) {
		return ephemeral("Source code could not be found in this message.");
	}

	try {
		const code = description.slice(prefix.length, -suffix.length);
		const output = runLC3(code).replace(/```/g, "``\u200b`").slice(0, 1992);
		return reply(`\`\`\`\n${output}\n\`\`\``);
	} catch (error) {
		return ephemeral((error instanceof Error ? error.message : "Unable to run source code.").slice(0, 2000));
	}
}
