import { PermissionFlagsBits } from 'discord-api-types/v10';

export const Colors = {
	Blurple: 0x5865f2,
} as const;

export const Emojis = {
	CreateTicket: '🎫',
	RequestClose: '🔒',
	ConfirmClose: '✅',
	CancelClose: '❌',
} as const;

export const Limits = {
	ChannelName: 100,
} as const;



export const Permissions = {
	ReadWrite:
		PermissionFlagsBits.ViewChannel |
		PermissionFlagsBits.SendMessages |
		PermissionFlagsBits.ReadMessageHistory,
	ReadWriteManage:
		PermissionFlagsBits.ViewChannel |
		PermissionFlagsBits.SendMessages |
		PermissionFlagsBits.ReadMessageHistory |
		PermissionFlagsBits.ManageChannels,
} as const;

// prettier-ignore
export const Responses = {
	// Invalid things
	InvalidInteraction: 'Invalid interaction.',
	NotImplemented:     'Not implemented.',

	// HTTP responses
	MethodNotAllowed:   'Method not allowed',
	InvalidSignature:   'Invalid request signature',
	InvalidRequestType: 'Invalid request type',

	// Fallback
	SomethingWentWrong: 'Something went wrong.',
	RateLimited:        'Rate limited. Try again in ',
} as const;
