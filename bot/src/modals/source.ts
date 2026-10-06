import type {
	APIModalSubmitInteraction,
	APIInteractionResponse
} from "discord-api-types/v10"
import { ButtonStyle, ComponentType } from "discord-api-types/v10";
import assemble from "../../../src/lc3_as.js";
import { ephemeral, reply } from "../discord_responses";
import { Colors } from "../constants";

export const source = async (
	interaction: APIModalSubmitInteraction,
	_env: Env,
	_ctx: ExecutionContext
): Promise<APIInteractionResponse> => {
	const inputs = interaction.data.components.flatMap((component) => {
		if (component.type === ComponentType.ActionRow) return component.components;
		if (component.type === ComponentType.Label && component.component.type === ComponentType.TextInput) {
			return [component.component];
		}
		return [];
	});
	const code = inputs.find((input) => input.custom_id === "code")?.value ?? "";

	const result = assemble(code);
	if (result.error) return ephemeral(result.error.join("\n").slice(0, 2000));

	return reply("", {
		embeds: [{
			title: "LC3 Source Code",
			description: `\`\`\`x86asm\n${code}\n\`\`\``,
			color: Colors.Blurple,
		}],
		components: [{
			type: ComponentType.ActionRow,
			components: [{
				type: ComponentType.Button,
				custom_id: "run_code",
				label: "Run",
				style: ButtonStyle.Primary,
			}],
		}],
	});
}
