# Learning Games

Small browser games for practising school topics. Plain HTML/CSS/JS, no build step.

**Live:** https://bodis.github.io/learning-games/

## Structure

```
index.html                    ← table of contents (topic → games)
angol/
  rendhagyo-igek/index.html   ← English irregular verbs
```

## Adding a game

1. Create a folder `<topic>/<game>/` with an `index.html` inside.
2. Add an entry to the `catalog` JSON block at the top of the root `index.html`.
3. Commit and push. GitHub Pages publishes it automatically.

## Extending the irregular verbs list

Edit the tab-separated `verb-data` block at the top of `angol/rendhagyo-igek/index.html`.
