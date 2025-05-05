<p align="center">
  <a href="https://component.gallery">
    <img alt="" src="https://github.com/inbn/component-gallery/raw/main/public/favicon-96x96.png" width="96" />
  </a>
</p>
<h1 align="center">
  The Component Gallery
</h1>

This project is built with [Astro](https://astro.build/).

## 🚀 Quick start

1. **Create .env file**

   Duplicate the file `.env.example` in the root of the project and call it `.env`. You'll need to add values for `AIRTABLE_BASE_ID` and `AIRTABLE_TOKEN`.

   **IMPORTANT NOTE:** The full Airtable database this project uses is private, but there’s an example with enough data to get started with here: https://airtable.com/shrSIQXYkS0mo53jY (click the 'Copy base' link in the top right to get your own version).

1. **Install dependencies**

   ```sh
   npm install
   ```

1. **Start developing.**

   ```sh
   npm start
   ```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
