const path = require('path');
const {
  sortWith, ascend, descend, prop, propOr,
} = require('ramda');
const { findRef } = require('./refs');

module.exports = (repo, treePath = null, ref = null) => {
  const formatEntry = entry => ({
    name: entry.name(),
    path: entry.path(),
    isDirectory: entry.isDirectory(),
  });
  const sortEntries = sortWith([descend(prop('isDirectory')), ascend(prop('name'))]);
  const formatTree = tree => ({ tree: sortEntries(tree.entries().map(formatEntry)) });
  const formatBlob = (blobEntry, rootTree) => {
    const dirPath = path.parse(treePath).dir;
    return Promise.all([
      blobEntry.getBlob()
        .then(blob => ({ ...formatEntry(blobEntry), content: blob.toString() })),
      dirPath === '' ? Promise.resolve(formatTree(rootTree)) : rootTree.getEntry(dirPath)
        .then(entry => entry.getTree())
        .then(formatTree),
    ])
      .then(([blob, { tree }]) => ({ blob, tree }));
  };

  const revision = ref ? findRef(repo, ref)
    .then(r => repo.getReferenceCommit(propOr(ref, 'ref', r))) : repo.getHeadCommit();

  return revision
    .then(rev => rev.getTree())
    .then((tree) => {
      // if treePath is null, stay on root
      if (!treePath) return formatTree(tree);
      return tree.getEntry(treePath)
        .then((entry) => {
          if (entry.isBlob()) {
            return formatBlob(entry, tree);
          }
          return entry.getTree()
            .then(formatTree);
        });
    });
};
