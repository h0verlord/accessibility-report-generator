import * as fs from 'fs'
import Parser from './parserClass.js'

const jsonPath = 'reports/json/report.json'

// read json file and save to variable
fs.readFile(jsonPath, (err, data) => {
  if (err) throw err
  const objectData = JSON.parse(data)
  const date = Date.now()
  // read html from template
  const htmlContent = fs.readFileSync('report-template.html').toString()
  // let htmlContent = ''
  const parser = new Parser(objectData, htmlContent)
  // Parse Json, generate some elements and append to htmlContent
  // const headerHtml = parseHeader(objectData[index], index)
  // Create Header for Host
  const generatedReport = parser.traverseJsonReport()

  // const reportHeader = parseHeader(objectData[index], index)
  //   const resultsHtml = parseTestResults(objectData[index], index)
  //   // enclose body and html tags before writing into new html file
  //   htmlContent += headerHtml
  //   htmlContent += resultsHtml
  // }
  // Write final HTML into file.
  fs.writeFile(`reports/html/example_${date}.html`, generatedReport, (err) => {
    if (err) throw err
  })
})
