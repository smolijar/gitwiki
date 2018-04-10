const NodeGit = require('nodegit');

module.exports.refs = repo => repo
  .getReferenceNames(NodeGit.Reference.TYPE.LISTALL)
  .then(refs => refs.map((ref) => {
    const [, group, ...compoundName] = ref.split('/');
    const name = compoundName[compoundName.length - 1];
    return {
      ref, group, name, compoundName: compoundName.join('/'),
    };
  }));

module.exports.findRef = (repo, name) => module.exports
  .refs(repo)
  .then(refs => refs.find(r => r.name === name));
