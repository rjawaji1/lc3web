import {
	APIActionRowComponent,
	APIButtonComponentWithCustomId,
	APIEmbed,
	InteractionResponseType,
	MessageFlags,
} from "discord-api-types/v10";
import type {
	APIInteractionResponse,
	APIInteractionResponseCallbackData
} from "discord-api-types/v10";

function discordResponse(
	data: Partial<APIInteractionResponseCallbackData>,
): APIInteractionResponse {
	return {
		type: InteractionResponseType.ChannelMessageWithSource,
		data: { ...data }
	}
}

export function ephemeral(content: string, ...embeds: APIEmbed[]) {
	return discordResponse({ content, embeds, flags: MessageFlags.Ephemeral })
}

export function reply(
	content: string,
	options?: {
		embeds?: APIEmbed[];
		components: APIActionRowComponent<APIButtonComponentWithCustomId>[];
	},
) {
	return discordResponse({ content, ...options });
}
