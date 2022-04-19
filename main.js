import * as fs from 'fs';
import Parser from './parserClass.js';
var jsonPath = 'reports/json/report.json';
// read json file
fs.readFile(jsonPath, function (err, data) {
    if (err)
        throw err;
    var objectData = JSON.parse(data.toString());
    var date = Date.now();
    // read html from template
    var htmlContent = fs.readFileSync('report-template.html').toString();
    var parser = new Parser(objectData, htmlContent);
    // Parse Json, generate some elements and append to htmlContent
    var generatedReport = parser.traverseJsonReport();
    fs.writeFile("reports/html/example_".concat(date, ".html"), generatedReport, function (err) {
        if (err)
            throw err;
    });
});
//# sourceMappingURL=main.js.map