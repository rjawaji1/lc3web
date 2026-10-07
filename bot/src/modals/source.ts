import type { APIModalSubmitInteraction, APIInteractionResponse } from 'discord-api-types/v10';
import { ButtonStyle, ComponentType } from 'discord-api-types/v10';
import assemble from '@lc3/sim/lc3_as.js';
import { ephemeral, reply } from '../discord_responses';
import { Colors } from '../constants';
import { modalTextInputValue } from '../helper';

export const source = (interaction: APIModalSubmitInteraction, _env: Env, _ctx: ExecutionContext): APIInteractionResponse => {
	const code = modalTextInputValue(interaction, 'code');

	const result = assemble(code);
	if (result.error) return ephemeral(result.error.join('\n').slice(0, 2000));

	return reply('', {
		embeds: [
			{
				title: 'LC3 Source Code',
				description: `\`\`\`x86asm\n${code}\n\`\`\``,
				color: Colors.Blurple,
			},
		],
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						custom_id: 'run_code',
						label: 'Run',
						style: ButtonStyle.Primary,
					},
				],
			},
		],
	});
};
