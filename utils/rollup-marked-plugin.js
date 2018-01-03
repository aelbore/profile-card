module.exports =   {
  name: 'replace marked imports',
  transform: code => ({ code: code.replace(/import\s*\*\s*as\s*marked/g, 'import marked'), map: { mappings: '' } })
};