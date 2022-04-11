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

function createLiGroup(property, element){
  let htmlString = ""
  console.log(property, element);
  if(element == null){
    // just type prop el
    htmlString += `\n<li class="list-group-item">${property}: ${element}`
  }
  else if(property == 'id'){
    htmlString += `\n<li class="list-group-item list-group-item-primary">${property}: ${element}`
  }
  else if (property == 'helpUrl'){
    htmlString += `\n<li class="list-group-item">${property}: `
    htmlString += `\n<a href="${element}" target="_blank">Read More</a>`
  }
  else if (property == 'tags'){
    htmlString += `\n<li class="list-group-item">${property}: `
    element.forEach(element => {
    htmlString += generateTagBadge(element)
    });
  }
  else {
    htmlString += `\n<li class="list-group-item">${property}: ${element}`
  }
  htmlString += encloseElement('li')
  return htmlString
}

function addSpanElement(label, data){
  return `\n<span class="input-group-text list-group-item-primary" id="basic-addon1">${label}</span>${data}`

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

function createModalWindow(element){
  let htmlString = ""
  // Create Outer modal Div
  htmlString += `\n<div class="modal fade" id="modal-${element.id}" tabindex="-1"
  aria-labelledby="exampleModalLabel" aria-hidden="true">`
  // create Modal dialog
  htmlString += `\n<div class="modal-dialog modal-lg">`
  // Create Modal Content div
  htmlString += `\n<div class="modal-content">`
  // Create Modal header with title and Close Btn  
  htmlString += `\n<div class="modal-header">`
  htmlString += `\n<h5 class="modal-title" id="${element.id}-modal-label">${element.id}</h5>`
  htmlString += `\n<button type="button" class="btn-close" data-bs-dismiss="modal"
  aria-label="Close"></button>`
  htmlString += encloseElement('div')
  // Create Modal Body
  htmlString += `\n<div class="modal-body">`
  // Traverse and fill in the content from array into list
  htmlString += `\n<ul class="list-group">`
  // parse the inner nodes array and list all  html it tested, 
  // targets and impact if the rule failed (null = passed)
  element.nodes.forEach(innerElement => {
    // html
    htmlString += `\n<li class="list-group-item">`
    htmlString += `HTML: <code>${escapeHtml(innerElement.html)}</code>`
    htmlString += encloseElement('li')
    // target
    htmlString += `\n<li class="list-group-item">`
    htmlString += `Target: <code>${innerElement.target.join()}</code>`
    htmlString += encloseElement('li')
  });
  htmlString += encloseElement('ul')
  htmlString += encloseElement('div')
  // Create Modal Footer with Close Button
  htmlString += `\n<div class="modal-footer">`
  htmlString += `\n<button type="button" class="btn btn-secondary"
  data-bs-dismiss="modal">Close</button>`
  return htmlString
}

function parseHeader(headerReport) {
  let htmlString = ""
  // start the html tags for header elements for current test
  htmlString += `\n<div class="container-fluid">`
  htmlString += `\n<div class="row row-cols-2 mt-3">`

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
  htmlString += `\n<div class="row row-cols-3  align-items-start">`

  report.forEach(element => {
    htmlString += `\n<div class="col mt-3">`
    htmlString += `\n<ul class="list-group">`
    for (const property in element) {      
        if(property == 'nodes') {
          console.log(element.nodes);
          htmlString += `\n<button class="btn btn-primary" type="button" 
          data-bs-toggle="modal" data-bs-target="#modal-${element.id}" 
          aria-expanded="false" aria-controls="modal-${element.id}">More Info
          </button>`
          // Create a Modal Window with Target and HTML list
          htmlString += createModalWindow(element)
        }
        else {
          let escapedValue = escapeDataRecursion(element[property])
          htmlString += createLiGroup(property, escapedValue)
        }
      }
    htmlString += encloseElement('ul')
    htmlString += encloseElement('div')
  })
  htmlString += encloseElement('div')
  htmlString += encloseElement('div')
  htmlString += encloseElement('div')
  return htmlString
}

function generateTagBadge(tag){
  // generate nice looking tags badges
  // example here
  // <span class="badge bg-primary rounded-pill">14</span>
  return `\n<span class="badge mr-3 bg-primary rounded-pill">${tag}</span>`
}

function escapeDataRecursion(data){
  if (data == null){
    return
  }
  else if (data.isArray){
    // is array, more traversing needed
    // console.log(`Data ${data} is an Array`);
    return data
  }
  else if (typeof(data) === "object"){
    // is Object, more traversing needed
    // console.log(`Data ${data} is an Object`);
    return data
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
