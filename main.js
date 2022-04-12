import { parseHeader, parseTestResults } from './parser.js'
import * as fs from 'fs'

const jsonPath = 'reports/json/report.json'

let objectData

// read json file and save to variable
fs.readFile(jsonPath, (err,data) => {
    if (err) throw err
    objectData = JSON.parse(data)
    let date = Date.now()
    // read html from template
    let htmlContent = fs.readFileSync('report-template.html')
    
    for (let index = 0; index < objectData.length; index++) {
        // Parse Json, generate some elements and append to htmlContent
        let headerHtml = parseHeader(objectData[index], index)
        let resultsHtml = parseTestResults(objectData[index], index)
        // enclose body and html tags before writing into new html file
        htmlContent += headerHtml
        htmlContent += resultsHtml
    }
    htmlContent += `\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
    crossorigin="anonymous"></script>`
    htmlContent+= "\n</body>\n</html>"    
    
    // Write final HTML into file.
    fs.writeFile(`reports/html/example_${date}.html`, htmlContent, (err) => {
        if (err) throw err
    })
})


