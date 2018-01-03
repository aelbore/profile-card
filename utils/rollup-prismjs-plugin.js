module.exports = {
  name: 'replace prismjs imports',
  transform: code => ({ code: code.replace(/import\s*\*\s*as\s*Prism/g, 'import Prism'), map: { mappings: '' } })
};