# goof
An evolving tool to detect dependencies and "graph" them.

run `node source/index` to see what it does.

Right now it just traces all the dependencies based on a directory structure
Next up is using rollup to actually evaluate the javascript and search for real dependencies as they are being used.

The goal is to be able to detect a file's update or it's dependencies update so it can be recompiled and all information will stay live for a custom build pipeline.
