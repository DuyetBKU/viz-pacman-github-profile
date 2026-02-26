# 🎮 Pacman Contribution Graph

Transform your GitHub/GitLab contribution graph into an interactive Pac-Man game!

> **Original Project**: [abozanona/pacman-contribution-graph](https://github.com/abozanona/pacman-contribution-graph)  
> **Enhanced Edition**: DuyetBKU - Added light/dark theme variants for all themes

<picture>
   <!--  If DARK MODE → dark.svg -->
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/DuyetBKU/.github/output/pacman-contribution-graph-dark.svg">
  <!-- FALLBACK: Light mode → light.svg -->
  <img src="https://raw.githubusercontent.com/DuyetBKU/.github/output/pacman-contribution-graph-light.svg">
  
</picture>

## ✨ Features

- 🎮 **Interactive Game**: Play Pac-Man on your contribution calendar
- 🎨 **12 Color Themes**: 6 theme families × 2 variants (light + dark)
    - GitHub, GitLab, Dracula, Solarized, Monokai, React
- 📊 **Multi-Platform Support**: GitHub, GitLab, and more platforms
- 🎵 **Optional Sound Effects**: Classic Pac-Man audio
- 🚀 **High Performance**: Optimized canvas & SVG rendering
- 📦 **Easy Integration**: NPM package, CLI tool, or GitHub Action
- ⚡ **Auto Light/Dark Mode**: Detects your system preference

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

**Without installing (recommended):**

```bash
npx pacman-contribution-graph \
  --platform github \
  --username torvalds \
  --gameTheme react-dark \
  --output pacman.svg
```

**Or install globally:**

```bash
npm install -g pacman-contribution-graph

pacman-contribution-graph \
  --platform github \
  --username torvalds \
  --gameTheme react-dark \
  --output pacman.svg
```

### Option 3: GitHub Action (Automated SVG Generation)

Use this GitHub Action to automatically generate **light + dark theme SVGs** and display them in your README.

---

## 🎯 GitHub Action Setup (Step-by-Step)

### Step 1: Fork This Repository

Fork to your GitHub account:  
**https://github.com/DuyetBKU/viz-pacman-github-profile**

```bash
# Or clone and push to your own repo
git clone https://github.com/YOUR-USERNAME/viz-pacman-github-profile.git
cd viz-pacman-github-profile
git remote set-url origin https://github.com/YOUR-USERNAME/viz-pacman-github-profile.git
```

---

### Step 2: Create `.github/workflows/pacman.yml`

Create the workflow file in your repository:

```bash
mkdir -p .github/workflows
```

Then create `.github/workflows/pacman.yml`:

```yaml
name: generate pacman game

on:
    schedule:
        - cron: '0 */6 * * *' # Every 6 hours
    workflow_dispatch: # Manual trigger
    push:
        branches:
            - main

jobs:
    generate:
        permissions:
            contents: write
        runs-on: ubuntu-latest
        timeout-minutes: 10

        steps:
            - name: Checkout code
              uses: actions/checkout@v4

            - name: Create output branch if not exists
              run: |
                  git fetch --all
                  git branch -r | grep origin/output || git checkout --orphan output && git push origin output

            - name: Increase Node memory
              run: echo "NODE_OPTIONS=--max-old-space-size=8192" >> $GITHUB_ENV

            - name: Generate pacman graph (light & dark)
              uses: DuyetBKU/viz-pacman-github-profile@main
              with:
                  github_user_name: ${{ github.repository_owner }}
                  github_token: ${{ secrets.GITHUB_TOKEN }}
                  theme: react-dark
                  music: 'false'

            - name: Push to output branch
              uses: crazy-max/ghaction-github-pages@v3.1.0
              with:
                  target_branch: output
                  build_dir: dist
              env:
                  GITHUB_TOKEN: ${{ secrets.PERSONAL_TOKEN }}
```

---

### Step 3: Create `PERSONAL_TOKEN` Secret

GitHub Actions needs a personal token to push SVG files to the `output` branch.

1. Go to: **https://github.com/settings/tokens/new**

2. Create New Personal Access Token (classic):

    - Token name: `PERSONAL_TOKEN`
    - Select scopes:
        - ✅ `repo` (full control of private repositories)
        - ✅ `workflow` (update GitHub Action workflows)

3. Copy the generated token (⚠️ **Copy immediately, won't show again**)

4. Go to your repo: **Settings → Secrets and variables → Actions**

5. Click **New repository secret**:

    - Name: `PERSONAL_TOKEN`
    - Value: (paste your token)

6. Click **Add secret**

---

### Step 4: Create `output` Branch

This branch will store the generated SVG files separately from your main code.

```bash
# Option 1: Via command line
git checkout --orphan output
git commit --allow-empty -m "Initial output branch"
git push origin output

# Option 2: Via GitHub web interface
# Settings → Branches → New branch → Type "output"
```

---

### Step 5: Trigger Workflow

1. Go to **Actions** tab in your repo
2. Select **"generate pacman game"** workflow
3. Click **"Run workflow"** → select **main** branch → **"Run workflow"**
4. Wait 30 seconds for SVG generation to complete ✅

---

### Step 6: Verify Generated Files

Check if files were created:

- **Light theme**: `https://raw.githubusercontent.com/YOUR-USERNAME/viz-pacman-github-profile/output/dist/pacman-contribution-graph-light.svg`
- **Dark theme**: `https://raw.githubusercontent.com/YOUR-USERNAME/viz-pacman-github-profile/output/dist/pacman-contribution-graph-dark.svg`

Replace `YOUR-USERNAME` with your actual GitHub username.

---

## 📸 Display in Your README

### Option 1: Auto Light/Dark Mode (Recommended)

This will automatically show dark theme on dark mode, light theme on light mode:

```html
<div align="center">
	<h2>📊 My Contribution Activity</h2>

	<picture>
		<source
			media="(prefers-color-scheme: dark)"
			srcset="
				https://raw.githubusercontent.com/YOUR-USERNAME/viz-pacman-github-profile/output/dist/pacman-contribution-graph-dark.svg
			"
		/>
		<source
			media="(prefers-color-scheme: light)"
			srcset="
				https://raw.githubusercontent.com/YOUR-USERNAME/viz-pacman-github-profile/output/dist/pacman-contribution-graph-light.svg
			"
		/>
		<img
			alt="Pacman Contribution Graph"
			src="https://raw.githubusercontent.com/YOUR-USERNAME/viz-pacman-github-profile/output/dist/pacman-contribution-graph-light.svg"
		/>
	</picture>
</div>
```

### Option 2: Always Dark Theme

```markdown
![Pacman Dark](https://raw.githubusercontent.com/YOUR-USERNAME/viz-pacman-github-profile/output/dist/pacman-contribution-graph-dark.svg)
```

### Option 3: Always Light Theme

```markdown
![Pacman Light](https://raw.githubusercontent.com/YOUR-USERNAME/viz-pacman-github-profile/output/dist/pacman-contribution-graph-light.svg)
```

### Option 4: Show Both Side by Side

```html
<div align="center">
	<h3>Light Theme</h3>
	<img
		alt="Light"
		src="https://raw.githubusercontent.com/YOUR-USERNAME/viz-pacman-github-profile/output/dist/pacman-contribution-graph-light.svg"
		width="100%"
	/>

	<h3>Dark Theme</h3>
	<img
		alt="Dark"
		src="https://raw.githubusercontent.com/YOUR-USERNAME/viz-pacman-github-profile/output/dist/pacman-contribution-graph-dark.svg"
		width="100%"
	/>
</div>
```

---

## 🎨 Complete Theme List

| Theme ID      | Style            |       Light       |       Dark       |
| ------------- | ---------------- | :---------------: | :--------------: |
| **GitHub**    | GitHub colors    |  `github-light`   |  `github-dark`   |
| **GitLab**    | GitLab colors    |  `gitlab-light`   |  `gitlab-dark`   |
| **React**     | React cyan       |   `react-light`   |   `react-dark`   |
| **Dracula**   | Dracula theme    |  `dracula-light`  |  `dracula-dark`  |
| **Solarized** | Solarized colors | `solarized-light` | `solarized-dark` |
| **Monokai**   | Monokai neon     |  `monokai-light`  |  `monokai-dark`  |

---

## ⚙️ Configuration Options

### CLI Options

```bash
npx pacman-contribution-graph \
  --platform github|gitlab \
  --username YOUR_USERNAME \
  --gameTheme github-light|github-dark|... \
  --output output.svg \
  --music true|false
```

### JavaScript Options

```javascript
new PacmanRenderer({
	// Required
	canvas: HTMLCanvasElement,
	platform: 'github' | 'gitlab',
	username: string,

	// Optional
	gameTheme: string, // Default: 'github-light'
	enableSounds: boolean, // Default: false
	gameSpeed: number, // 0.5-2, Default: 1
	outputFormat: 'canvas' | 'svg',
	githubSettings: {
		accessToken: string // For private contributions
	}
});
```

---

## 🎮 Game Controls In Future!

| Input               | Action                |
| ------------------- | --------------------- |
| **⬆️ ⬇️ ⬅️ ➡️**     | Move Pac-Man          |
| **🍒 Eat dots**     | Score points          |
| **👻 Avoid ghosts** | Don't get caught      |
| **⭐ Eat ghosts**   | Score big when scared |

---

## ❓ Troubleshooting

### Workflow fails with "Permission denied" on output branch

**Solution**: Ensure `PERSONAL_TOKEN` is set correctly in Secrets:

- Go to **Settings → Secrets and variables → Actions**
- Check that `PERSONAL_TOKEN` exists and is a valid GitHub token

### SVG shows light theme but I expected dark

**Solution**: Make sure you're using the correct SVG URL:

- Dark: `...pacman-contribution-graph-dark.svg`
- Light: `...pacman-contribution-graph-light.svg`

### Action fails with "Node out of memory"

**Solution**: Already handled in workflow with:

```yaml
- name: Increase Node memory
  run: echo "NODE_OPTIONS=--max-old-space-size=8192" >> $GITHUB_ENV
```

If still failing, increase further:

```yaml
run: echo "NODE_OPTIONS=--max-old-space-size=16384" >> $GITHUB_ENV
```

### How do I change the theme?

Edit `.github/workflows/pacman.yml`:

```yaml
- name: Generate pacman graph (light & dark)
  uses: DuyetBKU/viz-pacman-github-profile@main
  with:
      theme: react-dark # ← Change this to: github-light, gitlab-dark, dracula-light, etc.
```

Then re-run the workflow.

---

## 🛠️ Development

### Setup & Build

```bash
git clone https://github.com/DuyetBKU/viz-pacman-github-profile.git
cd viz-pacman-github-profile
npm install
npm run build
```

### Project Structure

```
src/
├── core/              # Game engine & theme definitions
├── movement/          # Ghost AI logic
├── providers/         # GitHub/GitLab API integration
├── renderers/         # Canvas & SVG rendering
└── utils/             # Helper functions

github-action/        # GitHub Action implementation
cli/                  # CLI tool
dist/                 # Compiled output (50KB minified)
```

### Key Technologies

- **TypeScript** - Type-safe development
- **Webpack 5** - Module bundling
- **Canvas/SVG** - Graphics rendering
- **GitHub API** - Data source

---

## 📊 Performance Stats

| Metric                 | Value                      |
| ---------------------- | -------------------------- |
| **Bundle Size**        | 50KB minified (~15KB gzip) |
| **Canvas Performance** | 60 FPS                     |
| **SVG Performance**    | 5 FPS                      |
| **Themes Available**   | 12 (6 × light/dark)        |
| **Grid Size**          | 53 weeks × 7 days          |

---

## 🔗 Useful Links

- 📦 **NPM Package**: https://www.npmjs.com/package/pacman-contribution-graph
- 🔧 **GitHub Action**: https://github.com/DuyetBKU/viz-pacman-github-profile
- 💾 **SVG Output**: https://github.com/DuyetBKU/.github (output branch)
- 🎨 **Color Themes**: See constants in `src/core/constants.ts`

---

## 📄 License

MIT License - Feel free to use, modify, and distribute

## 🙏 Credits

- **Original Creator**: [abozanona](https://github.com/abozanona/pacman-contribution-graph)
- **Enhanced by**: DuyetBKU
- **Inspired by**: Retro gaming and the joy of open-source contributions

---

## 🎉 Ready to Play?

```bash
# Quick start with CLI
npx pacman-contribution-graph --platform github --username YOUR_USERNAME --output pacman.svg

# Or install globally
npm install -g pacman-contribution-graph
pacman-contribution-graph --username YOUR_USERNAME
```

**Display in your README** and watch your contributions turn into a fun game! 🎮👾

---

Made with ❤️ and lots of 👻
