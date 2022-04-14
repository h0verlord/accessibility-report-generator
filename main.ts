import * as fs from 'fs'
import Parser from './parserClass.ts'

const jsonPath = 'reports/json/report.json'

// read json file
fs.readFile(jsonPath, (err, data) => {
  if (err) throw err
  const objectData = JSON.parse(data)
  const date = Date.now()

  // read html from template
  const htmlContent = fs.readFileSync('report-template.html').toString()
  const parser = new Parser(objectData, htmlContent)

  // Parse Json, generate some elements and append to htmlContent
  const generatedReport = parser.traverseJsonReport()

  fs.writeFile(`reports/html/example_${date}.html`, generatedReport, (err) => {
    if (err) throw err
  })
})
