const fs = require('fs');

const getJSONFromFile = (filePath) => {
  const data = fs.readFileSync(filePath, { encoding: 'utf8' });
  return JSON.parse(data);;
};

module.exports = getJSONFromFile;