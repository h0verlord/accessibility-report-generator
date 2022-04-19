import * as fs from 'fs'
import Parser from './parser.js'

const jsonPath = process.env.reportJsonPath

// read json file
fs.readFile(jsonPath, (err, data) => {
  if (err) throw err
  let objectData = JSON.parse(data.toString())
  const date = Date.now()

  // read html from template
  const htmlContent = fs
    .readFileSync('./reports/html/report-template.html')
    .toString()
  const parser = new Parser(objectData, htmlContent)

  // Parse Json, generate some elements and append to htmlContent
  const generatedReport = parser.traverseJsonReport()

  fs.writeFile(`reports/html/example_${date}.html`, generatedReport, (err) => {
    if (err) throw err
  })
})

