# lc3web

This is a fork of the web-based LC-3 simulator built by @wchargin with opinionated improvements to assist with the RMIT Programming Studio course.

## structure

| package | name       | description                          |
| ------- | ---------- | ------------------------------------ |
| `sim/`  | `@lc3/sim` | Core simulator logic                 |
| `web/`  | `@lc3/web` | The web simulator                    |
| `cli/`  | `@lc3/cli` | Command line assembler and simulator |
| `bot/`  | `@lc3/bot` | Workers Discord bot                  |

## dev

```sh
pnpm install

pnpm dev     # run the web sim
pnpm build   # build all packages
pnpm check   # typecheck
pnpm lint    # lint
pnpm format  # format
pnpm types   # regenerate the bot's worker types
```

Run `pnpm types` after changing the Worker configuration to refresh
`bot/worker-configuration.d.ts`.

## CLI

```sh
pnpm --filter @lc3/cli start --assemble program.asm program.obj
pnpm --filter @lc3/cli start --simulate program.obj
```

## Discord bot

The existing `/run` command opens a source-code modal. Submitting valid LC-3
assembly creates a message with a Run button, which opens a program-input modal.
Runs are bounded to 1,000,000 instructions and 1,950 output characters.

Command registration loads `.env` at the workspace root and also supports the
existing `bot/.env`. Environment variables take precedence over file values;
root `.env` values take precedence over `bot/.env` values. Use `.env.example`
as a template.

```sh
pnpm --filter @lc3/bot register  # register /run with Discord
pnpm --filter @lc3/bot dev       # run the Worker locally
pnpm --filter @lc3/bot deploy    # deploy to Cloudflare
```

For local Worker development, use `bot/.dev.vars` or `bot/.env`. Set the
corresponding Cloudflare secrets for deployment and configure Discord's
interactions endpoint URL to point at the Worker.
