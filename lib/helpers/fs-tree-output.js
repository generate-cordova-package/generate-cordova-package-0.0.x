// proxy module which could be replaced by another implemenation,
// if needed someday

const fsTree = require('fs-tree')

function outputToFs (tree) {
  fsTree(tree)
}

module.exports = outputToFs
