# ejs

An Express + EJS project generated from HTML.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Open your browser to http://localhost:8080

## Project Structure

```
ejs/
  package.json
  server.js
  .gitignore
  README.md
  views/
    index.ejs
    partials/
  public/
    inline/
    external/
```

## Notes

- The original HTML is preserved in `views/index.ejs`.
- Reusable sections are extracted into `views/partials/`.
- Static assets are served from `public/`.
