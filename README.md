# Rav Link website

Use Node.js 24 (see `.nvmrc`) and Yarn 1.22.22.

```sh
yarn install --frozen-lockfile --non-interactive --production=false
yarn run build
```

The production build compiles the app and prerenders the English and Turkish
pages, validating their headings and SEO metadata. It writes the deployable
website to `dist/`. Local prerendering uses installed Chrome, or the executable
specified by `PUPPETEER_EXECUTABLE_PATH`; Vercel uses the bundled Chromium binary.

Vercel's install command, build command, and output directory are defined in
`vercel.json`. Keep `yarn.lock` committed when changing dependencies.
The Production build GitHub Actions workflow runs the full build on pushes and
pull requests to catch syntax errors and prerender failures before deployment.

After pushing a build fix, redeploy the updated commit in Vercel. If an old build
still fails, redeploy with the existing build cache disabled and check the first
error in the build log above the final exit-code message.

## Development

Run `yarn dev` for the frontend and `yarn dev:server` for the local API.
