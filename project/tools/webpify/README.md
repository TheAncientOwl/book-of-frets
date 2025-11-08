# 🛠️ 🏞️ Webpify

`webpify` is a command-line tool that converts images to WEBP format. It is designed to help optimize images for web use by reducing file size while maintaining acceptable visual quality.

## Usage

```bash
$ ./project/tools/webpify/run.sh <input_image_path> [quality]
```

The `quality` argument is optional. If omitted, it defaults to 100.

## Notes

In order for the scripts to work `$BOOK_OF_FRETS` env variable has to be set to the root of project directory.

```
$ export $BOOK_OF_FRETS="path/to/project/root"
```
