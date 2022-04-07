function traverseJsonReport(report) {
  // Take the whole json collection and parse individual tests from it
  // call parseHeader, parseInaplicable, parsePasses, parseIncomplete and parseViolations
}

function addLiElement(){
  return `\n<li class="list-group-item d-flex justify-content-between align-items-center">`
}

function addSpanElement(label, data){
  return `\n<span class="input-group-text" id="basic-addon1">${label}</span>${data}`

}

function parseHeader(headerReport) {
  // parse URL being tested
  let htmlString = ""
  console.log(headerReport.url)
  htmlString += addLiElement()
  htmlString += `\n<span class="input-group-text" id="basic-addon1">Tested URL</span>`
  htmlString += `\n<a href="${headerReport.url}">${headerReport.url}</a>`
  htmlString += `\n</li>`

  // parse timestamp of test run
  console.log(headerReport.timestamp)
  htmlString += addLiElement()
  htmlString += addSpanElement("Test Run", headerReport.timestamp)
  htmlString += `\n</li>`

  // parse test engine name
  console.log(headerReport.testEngine.name)
  htmlString += addLiElement()
  htmlString += addSpanElement("Test Engine", headerReport.testEngine.name)
  htmlString += `\n</li>`

  // parse test engine version
  console.log(headerReport.testEngine.version)
  htmlString += addLiElement()
  htmlString += addSpanElement("Version", headerReport.testEngine.version)
  htmlString += `\n</li>`

  // parse test reporter
  console.log(headerReport.toolOptions.reporter);
  htmlString += addLiElement()
  htmlString += addSpanElement("Reporter",headerReport.toolOptions.reporter)
  htmlString += `\n</li>`

  // enclose first column of header
  htmlString += `\n</ul>`
  htmlString += `\n</div>`

  // second collumn of header
  htmlString += `\n<div class="col">`
  htmlString += `\n<ul class="list-group">`

  // parse User-Agent
  console.log(headerReport.testEnvironment.userAgent);
  htmlString += addLiElement()
  htmlString += addSpanElement("User Agent", headerReport.testEnvironment.userAgent)
  htmlString += `\n</li>`

  //parse window Width
  console.log(headerReport.testEnvironment.windowWidth);
  htmlString += addLiElement()
  htmlString += addSpanElement("Window Width", headerReport.testEnvironment.windowWidth)
  htmlString += `\n</li>`

  //parse window Heigth
  console.log(headerReport.testEnvironment.windowHeight);
  htmlString += addLiElement()
  htmlString += addSpanElement("Window Heigth", headerReport.testEnvironment.windowHeight)
  htmlString += `\n</li>`

  //parse orientation Angle
  console.log(headerReport.testEnvironment.orientationAngle);
  htmlString += addLiElement()
  htmlString += addSpanElement("Orientation Angle", headerReport.testEnvironment.orientationAngle)
  htmlString += `\n</li>`

  //parse orientation type
  console.log(headerReport.testEnvironment.orientationType);
  htmlString += addLiElement()
  htmlString += addSpanElement("Orientation Type", headerReport.testEnvironment.orientationType)
  htmlString += `\n</li>`

    // enclose second column of header
    htmlString += `\n</ul>`
    htmlString += `\n</div>`

  return htmlString
}

function parseTestResults(report, category){
  let numberOfItems = report.length
  let htmlString = ""
  console.log(numberOfItems


    // parse Inaplicable Array and generate html elements for each of them
    // then return the html string
    // let htmlString = ""
    // htmlString += `\n<h3>Inapplicable</h3>`
    // inpplicableReport.forEach(element => {
    //     htmlString += `\n<div class="individual_test">`
    //     for (const property in element) {
    //         htmlString += `\n<div id="test-property">${property}: ${element[property]}</div>`
    //     }
    //     htmlString += `\n</div>`

    // });
    return htmlString    
}

export { traverseJsonReport, addLiElement, addSpanElement, parseHeader, parseTestResults }
