import type { APIChatInputApplicationCommandInteraction, APIInteractionResponse } from 'discord-api-types/v10';
import { modal, modalTextAreaComponent } from '../discord_responses';

export const run = (_interaction: APIChatInputApplicationCommandInteraction, _env: Env, _ctx: ExecutionContext): APIInteractionResponse => {
	return modal('parse_code', 'Run LC3', [
		modalTextAreaComponent('code', 'Enter Source Code', {
			required: true,
			maxLength: 4000,
		}),
	]);
};
