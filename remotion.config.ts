import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setEntryPoint('./src/index.ts');

// Use a locally-installed headless shell when available (sandbox cannot
// download Chrome from remotion.media). Set REMOTION_BROWSER_EXECUTABLE
// or drop in a path here to override.
const browserExecutable =
	process.env.REMOTION_BROWSER_EXECUTABLE ??
	'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
Config.setBrowserExecutable(browserExecutable);
