function getGlossary(request, reply) {
  var glossary = [{
    expression: 'less fortunate',
    definition: 'People who are less lucky and do not have enough money for nice things.'
  }, {
    expression: 'donation',
    definition: 'A gift you give to somebody who really needs it.'
  }, {
    expression: 'charity',
    definition: 'doing something nice for somebody else to make their lives better'
  }];

  reply(glossary)
}

module.exports = {
  getGlossary: getGlossary,
}
