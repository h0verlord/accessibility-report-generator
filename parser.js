function traverseJsonReport(report) {
  // Take the whole json collection and parse individual tests from it
  // call parseHeader, parseInaplicable, parsePasses, parseIncomplete and parseViolations
}

function escapeHtml(unsafe) {
  if(typeof(unsafe) === null){
    return
  }
  else if (typeof(unsafe) === 'string') {
    return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;')
      
  }
  else{
    console.log(`${unsafe} is not a string`);
    return  
  }
  
}

function addLiElement(){
  // return `\n<li class="list-group-item d-flex justify-content-between align-items-center">`
  return `\n<li class="list-group-item d-flex justify-content-between">`
}

function encloseElement(type) {
  if (type == 'div') {
    return `</div>`
  }
  else if (type == 'li') {
    return `</li>`
  }
  else if (type == 'ul') {
    return `</ul>`
  }
  else{
    return
  }
  
}

function addSpanElement(label, data){
  return `\n<span class="input-group-text list-group-item-primary" id="basic-addon1">${label}</span>${data}`

}

function createLiGroup(property, element){
  let htmlString = ""
  console.log(property, element);
  if(property == 'id'){
    htmlString += `\n<li class="list-group-item list-group-item-primary">${property}: `
  }
  else {
    htmlString += `\n<li class="list-group-item">${property}: `
  }
  if (element !== undefined && element.includes('https://')){
    htmlString += `\n<a href="${element}" target="_blank">Read More</a>`
  }
  else{
    htmlString += element
  }
  htmlString += encloseElement('li')
  return htmlString
}

function parseHeader(headerReport) {
  let htmlString = ""
  // start the html tags for header elements for current test
  htmlString += `\n<div class="container-fluid">`
  htmlString += `\n<div class="row mt-3">`

  // create elements for first UL
  htmlString += `<div class="col">`
  htmlString += `<ul class="list-group">`

  // parse URL being tested
  console.log(headerReport.url)
  htmlString += addLiElement()
  htmlString += `\n<span class="input-group-text list-group-item-primary" id="basic-addon1">Tested URL</span>`
  htmlString += `\n<a href="${headerReport.url}" target="_blank">${headerReport.url}</a>`
  htmlString += encloseElement('li')

  // parse timestamp of test run
  console.log(headerReport.timestamp)
  htmlString += addLiElement()
  htmlString += addSpanElement("Test Run", headerReport.timestamp)
  htmlString += encloseElement('li')
  // parse test engine name
  console.log(headerReport.testEngine.name)
  htmlString += addLiElement()
  htmlString += addSpanElement("Test Engine", headerReport.testEngine.name)
  htmlString += encloseElement('li')
  // parse test engine version
  console.log(headerReport.testEngine.version)
  htmlString += addLiElement()
  htmlString += addSpanElement("Version", headerReport.testEngine.version)
  htmlString += encloseElement('li')
  // parse test reporter
  console.log(headerReport.toolOptions.reporter);
  htmlString += addLiElement()
  htmlString += addSpanElement("Reporter",headerReport.toolOptions.reporter)
  htmlString += encloseElement('li')
  
  // enclose first column of header
  htmlString += encloseElement('ul')
  htmlString += encloseElement('div')

  // second collumn of header
  htmlString += `\n<div class="col">`
  htmlString += `\n<ul class="list-group">`

  // parse User-Agent
  console.log(headerReport.testEnvironment.userAgent);
  htmlString += addLiElement()
  htmlString += addSpanElement("User Agent", headerReport.testEnvironment.userAgent)
  htmlString += encloseElement('li')

  //parse window Width
  console.log(headerReport.testEnvironment.windowWidth);
  htmlString += addLiElement()
  htmlString += addSpanElement("Window Width", headerReport.testEnvironment.windowWidth)
  htmlString += encloseElement('li')

  //parse window Heigth
  console.log(headerReport.testEnvironment.windowHeight);
  htmlString += addLiElement()
  htmlString += addSpanElement("Window Heigth", headerReport.testEnvironment.windowHeight)
  htmlString += encloseElement('li')

  //parse orientation Angle
  console.log(headerReport.testEnvironment.orientationAngle);
  htmlString += addLiElement()
  htmlString += addSpanElement("Orientation Angle", headerReport.testEnvironment.orientationAngle)
  htmlString += encloseElement('li')

  //parse orientation type
  console.log(headerReport.testEnvironment.orientationType);
  htmlString += addLiElement()
  htmlString += addSpanElement("Orientation Type", headerReport.testEnvironment.orientationType)
  htmlString += encloseElement('li')

  // enclose second column of header
  htmlString += encloseElement('ul')
  htmlString += encloseElement('div')
  
  // enclose header
  htmlString += encloseElement('div')
  htmlString += encloseElement('div')

  return htmlString
}

function parseTestResults(report, category) {
  // Prepare html string
  let htmlString = ""
  // start with container tag
  htmlString += `\n<div class="container-fluid">`
  htmlString += `\n<div class="row mt-3 align-items-start">`

  // When col number reaches for, start new row
  let colNumber = 1
  let numberOfItems = report.length
  console.log(numberOfItems)
  htmlString += `\n<h3>${category} - ${numberOfItems}</h3>`
  htmlString += encloseElement('div')
  htmlString += encloseElement('div')

  // start div container for results
  htmlString += `\n<div class="container-fluid">`
  htmlString += `\n<div class="row row-cols-4  align-items-start">`

  report.forEach(element => {
    // when col number reaches 4, encloses row
    // and starts new one, reset col number back to 1
    console.log(colNumber);
    htmlString += `\n<div class="col mt-3">`
    htmlString += `<ul class="list-group">`
    for (const property in element) {      
        let escapedValue = escapeDataRecursion(element[property])
        htmlString += createLiGroup(property, escapedValue)
      }
    htmlString += encloseElement('ul')
    htmlString += encloseElement('div')
  })
  htmlString += encloseElement('div')
  htmlString += encloseElement('div')
  htmlString += encloseElement('div')
  return htmlString
}

function escapeDataRecursion(data){
  if (!data){
    return
  }
  else if (data.isArray){
    // is array, more traversing needed
    // console.log(`Data ${data} is an Array`);
  }
  else if (typeof(data) === "object"){
    // is Object, more traversing needed
    // console.log(`Data ${data} is an Object`);
  }
  else if (typeof(data) === "string"){
    // escape string
    return escapeHtml(data)
  }
  else {
    // unexpexted format
    // console.log(`Data ${data} is in an unexpected format`);
  }

}

export { traverseJsonReport, addLiElement, addSpanElement, parseHeader, parseTestResults, escapeHtml }
