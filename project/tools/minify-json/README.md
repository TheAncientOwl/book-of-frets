# 🗜️ Minify JSON

Clears whitespace and newline characters to save up disk space.

## 1. Usage

```bash
$ ./project/tools/minify-json/run.sh <path-to-json-file>
```

## 2. Results example

### ✅ Minified file created: `public/songs/without-you/config.min.json` (original file 365 lines)

#### 📏 File sizes:

```
-rw-r--r--@ 1 theancientowl staff 7574 Oct  9 16:16 public/songs/without-you/config.json
-rw-r--r--@ 1 theancientowl staff 2868 Oct 10 15:52 public/songs/without-you/config.min.json
```

#### 💾Saved space: `4706 bytes (62.13%)`

### ✅ Minified file created: `public/songs/adore-you/config.min.json` (original file 134 lines)

####📏 File sizes:

```
-rw-r--r--@ 1 theancientowl staff 2969 Oct  9 16:16 public/songs/adore-you/config.json
-rw-r--r--@ 1 theancientowl staff 1717 Oct 10 15:54 public/songs/adore-you/config.min.json
```

#### 💾 Saved space: `1252 bytes (42.17%)`

### 3. Conclusion

So, the bigger the formatted json file -> the bigger the savings.
