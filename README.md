# goof
An evolving tool to detect dependencies and "graph" them.

run `node header/mod_crawl` for the legacy implementation
run `node header/mod_rollup` for the newer, more intelligent implementation.

---

# mod_crawl

- crawls a directroy reading package.json and all information to a graphing database.

# mod_rollup

- reads a file and prints **local** dependencies recursively
