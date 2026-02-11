# Song Create Tool

Helper script used to generate a new song directory along with its required assets and configuration.

This tool:

- Creates a song directory under `public/songs/`
- Moves a provided cover image into the directory
- Converts the cover image to **WebP**
- Resizes the cover image to the required dimensions
- Generates the song configuration boilerplate

---

## Usage

```bash
./project/tools/song/create/run.sh <dir-name> <cover-image-src-path>
```
