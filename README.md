# CLI Tool 

A versatile **Node.js command-line tool** built with Commander, fs, and Chalk. It performs multiple file-based operations:

* `count-words <file>` — counts words
* `count-lines <file>` — counts lines
* `summary <file>` — displays line, word, and sentence counts
* `search <word> <file>` — searches for a word (supporting `--ignore-case`)
* `stat <file>` — shows file type, size, creation & modification timestamps

---

## ⚙️ Installation

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
npm install
```

### Usage

```bash
# Run locally
node index.js <command>

# If installed globally
cli <command>
```

**Examples:**

```bash
node index.js count-words notes.txt
node index.js count-lines notes.txt
node index.js summary notes.txt
node index.js search --ignore-case hello notes.txt
node index.js stat notes.txt
```

---

### ✅ Notes

* Use `--debug` or `--verbose` flags for detailed output
* You can install globally with `npm install -g .` for direct `cli` command access

---

### 💡 Next Steps

* Expand with new commands (`append`, `replace`, `head`, `tail`, etc.)
* Add richer error handling and user prompts
* Consider adding unit tests and publishing to npm

