// import { parseHeader, parseTestResults } from './parser.js'
import * as fs from 'fs'
import Parser from './parserClass.js'

const jsonPath = 'reports/json/report.json'

const parser = new Parser()
// parserHelper.hello()

// read json file and save to variable
fs.readFile(jsonPath, (err, data) => {
  if (err) throw err
  const objectData = JSON.parse(data)
  const date = Date.now()
  // read html from template
  let htmlContent = fs.readFileSync('report-template.html')

  // Parse Json, generate some elements and append to htmlContent
  // const headerHtml = parseHeader(objectData[index], index)
  // Create Header for Host
  htmlContent = parser.traverseJsonReport(objectData, htmlContent)
  // const reportHeader = parseHeader(objectData[index], index)
  //   const resultsHtml = parseTestResults(objectData[index], index)
  //   // enclose body and html tags before writing into new html file
  //   htmlContent += headerHtml
  //   htmlContent += resultsHtml
  // }
  // Write final HTML into file.
  // fs.writeFile(`reports/html/example_${date}.html`, htmlContent, (err) => {
  //   if (err) throw err
  // })
})
