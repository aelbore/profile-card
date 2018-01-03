
module.exports =   {
  name: 'replace jquery imports',
  transform: code => ({ code: code.replace('import * as $', 'import $'), map: { mappings: '' } })
};