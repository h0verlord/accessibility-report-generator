import { parseHeader, parseTestResults } from './parser.js'
import * as fs from 'fs'

const jsonPath = 'reports/json/axe-results-1649250927112.json'

let objectData

// read json file and save to variable
fs.readFile(jsonPath, (err,data) => {
    if (err) throw err
    objectData = JSON.parse(data)
    let date = Date.now()
    // read html from template
    let htmlContent = fs.readFileSync('report-template.html')

    // Parse Json, generate some elements and append to htmlContent
    let headerHtml = parseHeader(objectData[0])
    let passesHtml = parseTestResults(objectData[0].passes)
    // let violationsHtml = parseInapplicable(objectData[0].violations)
    // let incompleteHtml = parseInapplicable(objectData[0].incomplete)
    // let inaplicableHtml = parseInapplicable(objectData[0].inapplicable)
    
    // enclose body and html tags before writing into new html file
    htmlContent += headerHtml
    // htmlContent += passesHtml
    // htmlContent += violationsHtml
    // htmlContent += incompleteHtml
    // htmlContent += inaplicableHtml
    htmlContent+= "\n</body>\n</html>"    
    
    // Write final HTML into file.
    fs.writeFile(`reports/html/example_${date}.html`, htmlContent, (err) => {
        if (err) throw err
    })

    //generate h1 element

    //generate h2 description
    //generate p element with tags
})


