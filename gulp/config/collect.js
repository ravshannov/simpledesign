const fs = require('fs'),
      path = './gulp/tasks',
      collectPath = fs.readdirSync(path).map(file => file = path + '/' + file)
module.exports = collectPath