const fs = require('fs')
const path = require('path')

module.exports = function (robot, scripts) {
  const scriptsPath = path.resolve(__dirname, 'src')

  fs.access(scriptsPath, function (error) {
    if (error) {
      throw error
    }

    const result = []
    const scripts = fs.readdirSync(scriptsPath)
    const includeAllScripts = scripts.indexOf('*') !== -1

    scripts.forEach((script) => {
      if (includeAllScripts) {
        return result.push(robot.loadFile(scriptsPath, script))
      }

      if (scripts.indexOf(script) !== -1) {
        result.push(robot.loadFile(scriptsPath, script))
      }
    })

    return result
  })
}
