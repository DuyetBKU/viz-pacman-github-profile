# 🎮 Pacman Contribution Graph - DuyetBKU Edition

Transform your GitHub/GitLab contribution graph into an interactive Pac-Man game!

**Created by: DuyetBKU**

## ✨ Features

- 🎮 **Interactive Game**: Play Pac-Man on your contribution calendar
- 🎨 **10+ Color Themes**: Dracula, Solarized, Monokai, React, GitHub, GitLab & more
- 📊 **Multi-Platform Support**: GitHub, GitLab, and more platforms
- 🎵 **Optional Sound Effects**: Classic Pac-Man audio
- 🚀 **High Performance**: Optimized canvas & SVG rendering
- 📦 **Easy Integration**: NPM package, CLI tool, or GitHub Action
- 🎯 **Smart AI**: Adaptive ghost behavior with multiple difficulty modes

## 🚀 Quick Start

### Option 1: NPM Package

```bash
npm install pacman-contribution-graph
```

```html
<!DOCTYPE html>
<html>
	<head>
		<script src="node_modules/pacman-contribution-graph/dist/pacman-contribution-graph.min.js"></script>
	</head>
	<body>
		<canvas id="pacman-canvas" width="1166" height="174"></canvas>
		<script>
			const renderer = new PacmanRenderer({
				canvas: document.getElementById('pacman-canvas'),
				platform: 'github',
				username: 'your-username',
				gameTheme: 'react-dark',
				enableSounds: true
			});
			renderer.start();
		</script>
	</body>
</html>
```

### Option 2: CLI Tool

```bash
# Option A: Install globally
npm install -g pacman-contribution-graph
pacman-contribution-graph \
  --platform github \
  --username torvalds \
  --gameTheme react-dark \
  --output pacman.svg
```

Or use npx without installing:

```bash
# Option B: Use npx (without installing)
npx pacman-contribution-graph \
  --platform github \
  --username torvalds \
  --gameTheme react-dark \
  --output pacman.svg
```

### Option 3: GitHub Action

Use this GitHub Action to automatically generate Pac-Man contribution graphs in your workflow.

> **Note**: This section is for **users** of this action. If you're using this action in your own repository, follow these steps.

#### Quick Setup (Copy & Paste)

Run this command in your repository to automatically create and setup the workflow file:

```bash
mkdir -p .github/workflows && cat > .github/workflows/pacman.yml << 'EOF'
name: generate pacman game

on:
  schedule:
    - cron: "0 */6 * * *"   # Every 6 hours (reduce frequency to avoid overload)
  workflow_dispatch:
  push:
    branches:
      - main

jobs:
  generate:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    timeout-minutes: 10   # Increase timeout

    steps:
      # 🔥 Increase Node memory (MOST IMPORTANT)
      - name: Increase Node memory
        run: echo "NODE_OPTIONS=--max-old-space-size=8192" >> $GITHUB_ENV

      # 🟢 Generate pacman graph
      - name: generate pacman-contribution-graph.svg
        uses: DuyetBKU/viz-pacman-github-profile@main
        with:
          github_user_name: ${{ github.repository_owner }}
          github_token: ${{ secrets.GITHUB_TOKEN }}
          theme: github-light # Options: github-light, github-dark, gitlab-light, gitlab-dark, react-light, react-dark, dracula-light, dracula-dark, monokai-light, monokai-dark, solarized-light, solarized-dark
          music: 'false' # Set to 'true' to enable music

      # 🚀 Push to output branch
      - name: push pacman-contribution-graph.svg to the output branch
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.PERSONAL_TOKEN }}
EOF
echo "✅ Workflow file created at .github/workflows/pacman.yml"
```

#### Manual Setup

If you prefer to create the file manually, create `.github/workflows/pacman.yml`:

```yaml
name: generate pacman game

on:
    schedule:
        - cron: '0 */6 * * *' # Every 6 hours (reduce frequency to avoid overload)
    workflow_dispatch:
    push:
        branches:
            - main

jobs:
    generate:
        permissions:
            contents: write
        runs-on: ubuntu-latest
        timeout-minutes: 10 # Increase timeout

        steps:
            # 🔥 Increase Node memory (MOST IMPORTANT)
            - name: Increase Node memory
              run: echo "NODE_OPTIONS=--max-old-space-size=8192" >> $GITHUB_ENV

            # 🟢 Generate pacman graph
            - name: generate pacman-contribution-graph.svg
              uses: DuyetBKU/viz-pacman-github-profile@main
              with:
                  github_user_name: ${{ github.repository_owner }}
                  github_token: ${{ secrets.GITHUB_TOKEN }}
                  theme: github-light # Options: github-light, github-dark, gitlab-light, gitlab-dark, react-light, react-dark, dracula-light, dracula-dark, monokai-light, monokai-dark, solarized-light, solarized-dark
                  music: 'false' # Set to 'true' to enable music

            # 🚀 Push to output branch
            - name: push pacman-contribution-graph.svg to the output branch
              uses: crazy-max/ghaction-github-pages@v3.1.0
              with:
                  target_branch: output
                  build_dir: dist
              env:
                  GITHUB_TOKEN: ${{ secrets.PERSONAL_TOKEN }}
```

#### Custom Configuration

You can customize the theme and other settings:

```yaml
# 🟢 Generate pacman graph
- name: generate pacman-contribution-graph.svg
  uses: DuyetBKU/viz-pacman-github-profile@main
  with:
      github_user_name: ${{ github.repository_owner }}
      github_token: ${{ secrets.GITHUB_TOKEN }}
      theme: github-light # Options: github-light, github-dark, gitlab-light, gitlab-dark, react-light, react-dark, dracula-light, dracula-dark, monokai-light, monokai-dark, solarized-light, solarized-dark
    GITHUB_TOKEN: ${{ secrets.PERSONAL_TOKEN }}
```

#### Output

The action generates **two SVG files** automatically:

1. **Light theme**: `pacman-contribution-graph-light.svg`
2. **Dark theme**: `pacman-contribution-graph-dark.svg`

These files will be:

1. **Generated** in the `dist/` directory during workflow execution
2. **Pushed** to the `output` branch (separate from your main branch)
3. **Accessible** via:
    - Light: `https://raw.githubusercontent.com/DuyetBKU/viz-pacman-github-profile/output/dist/pacman-contribution-graph-light.svg`
    - Dark: `https://raw.githubusercontent.com/DuyetBKU/viz-pacman-github-profile/output/dist/pacman-contribution-graph-dark.svg`

You can then:

- Display it in your README with smart light/dark theme support (replace `DuyetBKU` with your GitHub username when you fork):

    ```html
    <picture>
    	<source
    		media="(prefers-color-scheme: dark)"
    		srcset="https://raw.githubusercontent.com/DuyetBKU/viz-pacman-github-profile/output/dist/pacman-contribution-graph-dark.svg"
    	/>
    	<source
    		media="(prefers-color-scheme: light)"
    		srcset="https://raw.githubusercontent.com/DuyetBKU/viz-pacman-github-profile/output/dist/pacman-contribution-graph-light.svg"
    	/>
    	<img
    		alt="pacman contribution graph"
    		src="https://raw.githubusercontent.com/DuyetBKU/viz-pacman-github-profile/output/dist/pacman-contribution-graph-light.svg"
    	/>
    </picture>
    ```

    Or simple markdown:

    ```markdown
    ![Pacman Contributions](https://raw.githubusercontent.com/DuyetBKU/viz-pacman-github-profile/output/dist/pacman-contribution-graph-light.svg)
    ```

- Use it in your profile README
- Share the direct link to the SVG file

## 🎨 Available Themes

| Theme             | Style            | Best For                 |
| ----------------- | ---------------- | ------------------------ |
| `github-light`    | Light gray/green | GitHub light theme users |
| `github-dark`     | Dark gray/green  | GitHub dark theme users  |
| `gitlab-light`    | Light blue       | GitLab light theme users |
| `gitlab-dark`     | Dark blue        | GitLab dark theme users  |
| `dracula-light`   | Purple/pink      | Dracula light theme      |
| `dracula-dark`    | Purple/pink dark | Dracula dark theme       |
| `solarized-light` | Warm yellow      | Solarized light users    |
| `solarized-dark`  | Warm colors      | Solarized dark users     |
| `monokai-light`   | Neon colors      | Monokai light theme      |
| `monokai-dark`    | Neon colors      | Monokai dark theme       |
| `react-light`     | Light cyan       | React fans (light)       |
| `react-dark`      | Dark cyan        | React fans (dark)        |

## ⚙️ Configuration Options

```javascript
new PacmanRenderer({
	// Required
	canvas: HTMLCanvasElement, // Canvas element
	platform: 'github' | 'gitlab', // Data source
	username: string, // Username

	// Optional
	gameTheme: string, // Theme (default: 'github')
	enableSounds: boolean, // Audio (default: false)
	gameSpeed: number, // Speed 0.5-2 (default: 1)
	playerStyle: 'conservative' | 'aggressive' | 'opportunistic',
	outputFormat: 'canvas' | 'svg',
	maxFrames: number,
	githubSettings: {
		accessToken: string
	}
});
```

## 🎮 Game Controls

| Input            | Action                 |
| ---------------- | ---------------------- |
| **Arrow Keys**   | Move Pac-Man           |
| **Eat Pellets**  | Score points           |
| **Avoid Ghosts** | Don't get caught       |
| **Power-ups**    | Make ghosts vulnerable |

## 🧠 AI Difficulty Modes

### Conservative

- Focus on safety
- Avoid ghosts aggressively
- Slower exploration

### Aggressive

- Pursue high-value targets
- Take calculated risks
- Quick decisions

### Opportunistic (Default)

- Balanced approach
- Adapt to situations
- Dynamic gameplay

## ❓ GitHub Action FAQ & Troubleshooting

### How do I find my GitHub username?

Your GitHub username is the part after `github.com/` in your profile URL. For example: `https://github.com/torvalds` → username is `torvalds`.

### Where is the generated file saved?

The SVG file is generated in your GitHub Actions workflow directory and can be committed to your repository using the workflow example above.

### Can I run the action for a different user?

Yes, simply change the `github_user_name` input:

```yaml
with:
    github_user_name: different-username
```

### What permissions do I need?

- **Read permissions**: To fetch contribution data (included by default)
- **Write permissions**: If you want to commit the generated file to the repository
    ```yaml
    permissions:
        contents: write
    ```

### Does the action need a special token?

No, the default `${{ github.token }}` is usually sufficient. Only use a personal token if you need:

- Higher API rate limits
- Access to private contributions
- Cross-repository access

### The action is failing with API rate limit

Try using a GitHub token with higher rate limits:

```yaml
with:
    github_token: ${{ secrets.MY_GITHUB_TOKEN }}
```

Then create a Personal Access Token in GitHub Settings → Developer settings → Personal access tokens.

### How often should I run the action?

Use scheduling to update at your preferred frequency:

```yaml
schedule:
    - cron: '0 */3 * * *' # Every 3 hours
    - cron: '0 0 * * 0' # Weekly on Sunday at midnight
    - cron: '0 0 1 * *' # Monthly on the 1st
```

Or trigger on specific events:

```yaml
on:
    push:
        branches: [main]
    pull_request:
```

## 🛠️ Development

### Setup

```bash
git clone https://github.com/DuyetBKU/viz-pacman-github-profile.git
cd viz-pacman-github-profile
npm install
```

### Build

```bash
npm run build       # Production build
npm run dev         # Development with watch
npm run test        # Run tests
```

### Project Structure

```
src/
├── core/                 # Game engine & themes
├── movement/             # AI logic
├── providers/            # GitHub/GitLab API
├── renderers/            # Canvas & SVG
└── utils/                # Helpers

dist/                    # Compiled (50KB minified)
github-action/           # GitHub Action
cli/                     # CLI tool
```

## 🔧 Technologies

- **TypeScript** - Type-safe code
- **Webpack** - Bundling
- **Canvas/SVG** - Rendering
- **GitHub API** - Data fetching
- **Jest** - Testing

## 📊 Game Statistics

- **Grid**: 53 weeks × 7 days
- **Total Cells**: 371
- **Ghosts**: 4 unique + eyes
- **Size**: 50KB minified (~15KB gzip)
- **Performance**: 60 FPS (canvas), 5 FPS (SVG)
- **Themes**: 10 pre-configured

## 🐛 Troubleshooting

### Rate Limit Exceeded

```javascript
githubSettings: {
	accessToken: 'ghp_xxxxxxxxxxxx';
}
```

### Performance Issues

```javascript
gameSpeed: 0.5,           // Slower
outputFormat: 'canvas'    // Better performance
```

### SVG Not Rendering

```javascript
outputFormat: 'svg',
svgCallback: (svg) => {
  document.getElementById('container').innerHTML = svg;
}
```

## 🎓 Learning Resources

This project demonstrates:

- TypeScript development
- Canvas API rendering
- Pathfinding algorithms (A\*)
- Game loop architecture
- GitHub API integration

## 📄 License

MIT License - Feel free to use, modify, and distribute

## 🎉 About

**Created by**: DuyetBKU  
**Version**: 3.0.0  
**Status**: Active Development

Inspired by retro gaming and the joy of open source contributions.

---

🎮 **Ready to play?**

```bash
npm install pacman-contribution-graph
```

Or use the CLI:

```bash
npx pacman-contribution-graph --platform github --username YOUR_USERNAME
```

## 👤 Author

**DuyetBKU**

## 🙏 Credits

Original project by [abozanona](https://github.com/abozanona/pacman-contribution-graph)

---

Made with ❤️ and a lot of 👻
