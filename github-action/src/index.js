import * as core from '@actions/core';
import * as fs from 'fs';
import { PacmanRenderer } from 'pacman-contribution-graph';
import * as path from 'path';

const generateSvg = async (userName, githubToken, theme, music) => {
	return new Promise((resolve, reject) => {
		let generatedSvg = '';
		const conf = {
			platform: 'github',
			username: userName,
			outputFormat: 'svg',
			gameSpeed: 1,
			gameTheme: theme,
			enableSounds: music,
			githubSettings: {
				accessToken: githubToken
			},
			svgCallback: (svg) => {
				generatedSvg = svg;
			},
			gameOverCallback: () => {
				resolve(generatedSvg);
			}
		};

		const renderer = new PacmanRenderer(conf);
		renderer.start();
	});
};

(async () => {
	try {
		const userName = core.getInput('github_user_name');
		const githubToken = core.getInput('github_token');
		let theme = core.getInput('theme') || 'github';
		const music = core.getInput('music') === 'true';

		// TODO: Check active users
		fetch('https://elec.abozanona.me/github-action-analytics.php?username=' + userName);

		// Extract base theme name and generate light/dark versions
		let baseTheme = theme.replace('-light', '').replace('-dark', '');

		const lightTheme = `${baseTheme}-light`;
		const darkTheme = `${baseTheme}-dark`;

		// Generate light theme SVG
		const svgContent = await generateSvg(userName, githubToken, lightTheme, music);
		console.log(`💾 writing to dist/pacman-contribution-graph-light.svg (${lightTheme})`);
		fs.mkdirSync(path.dirname('dist/pacman-contribution-graph-light.svg'), { recursive: true });
		fs.writeFileSync('dist/pacman-contribution-graph-light.svg', svgContent);

		// Generate dark theme SVG
		const svgDarkContent = await generateSvg(userName, githubToken, darkTheme, music);
		console.log(`💾 writing to dist/pacman-contribution-graph-dark.svg (${darkTheme})`);
		fs.mkdirSync(path.dirname('dist/pacman-contribution-graph-dark.svg'), { recursive: true });
		fs.writeFileSync('dist/pacman-contribution-graph-dark.svg', svgDarkContent);
	} catch (e) {
		core.setFailed(`Action failed with "${e.message}"`);
	}
})();
