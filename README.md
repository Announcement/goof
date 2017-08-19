# goof
An evolving tool to detect dependencies and "graph" them.

run `node source/index` to see it in action.

## current features

 - recursively crawl your directories (mainly *node_modules*)
 - look for **package.json** and evaluate it
 - count the total number of modules installed <sup>1</sup> using a simple query <sup>query:count</sup>

## coming soon

 - use rollup (custom plugin) instead of `fs.readdir`
 - detect used and unused plugin

## end goal

 - watch files
 - new build tool
 - lit pipeline (update the dependent on change)

## the database

 The database is a very simple hexastore implementation store in a javascript object.
 This is because this is clearly a graph database problem as I believe any dependency resolution should be and hexastore happens to be the only one I really know at this point in time unfortunately, feel free to recommend other more appropriate alternatives.


---

## notes

The name is because the project is centered around a graph but not entirely. The output is also fun and colorful denoting the playful name.

<sup>1</sup> This includes modules not being used resting on all child directories at this point in time.

query:count

``` javascript

graph.get({predicate: 'name'}).map(it => it.object).length
```

Next up is using rollup to actually evaluate the javascript and search for real dependencies as they are being used.

The goal is to be able to detect a file's update or it's dependencies update so it can be recompiled and all information will stay live for a custom build pipeline.
