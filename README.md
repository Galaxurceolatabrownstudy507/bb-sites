# bb-recipes

Community fetch recipes for [bb-browser](https://github.com/epiral/bb-browser).

Each recipe is a JS function that runs inside your browser via `bb-browser eval`. The browser is already logged in — no API keys, no cookie extraction, no anti-bot bypass.

## Quick Start

```bash
bb-browser recipe update           # install/update recipes
bb-browser recipe list             # list available recipes
bb-browser recipe run reddit/me    # run a recipe
```

## Available Recipes

### Reddit
| Recipe | Args | Description |
|--------|------|-------------|
| `reddit/me` | — | Current logged-in user info |
| `reddit/posts` | `username` | User's submitted posts (auto-paginated) |
| `reddit/thread` | `url` | Full discussion tree for a post |
| `reddit/context` | `url` | Ancestor chain for a specific comment |

### Twitter
| Recipe | Args | Description |
|--------|------|-------------|
| `twitter/user` | `screen_name` | User profile |
| `twitter/thread` | `tweet_id` | Tweet + all replies (supports URL or numeric ID) |

## Writing a Recipe

```javascript
// @name platform/command
// @description What this recipe does
// @domain www.example.com
// @args arg1 arg2
// @example bb-browser recipe run platform/command value1

async function(args) {
  const resp = await fetch('/api/...?q=' + args.arg1, {credentials: 'include'});
  return await resp.json();
}
```

## Private Recipes

Put private recipes in `~/.bb-browser/recipes/`. They override community recipes with the same name.
