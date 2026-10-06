export default {
	fetch(request, env, ctx): Response {
		return new Response('Not Implemented', { status: 405 });
	},
} satisfies ExportedHandler<Env>;
