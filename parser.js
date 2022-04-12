import {
  escapeHtml,
  addLiElement,
  addSpanElement,
  encloseElement,
  generateTagBadge,
  addHtmlElement,
  addEnclosedHtmlElement
} from "./htmlHelpers.js";

function traverseJsonReport(report) {
  // Take the whole json collection and parse individual tests from it
  // call parseHeader, parseInaplicable, parsePasses, parseIncomplete and parseViolations
}

function createRuleReport(property, element) {
  let htmlString = ""
  // console.log(property, element);
  if (element == null) {
    // skip if null, we dont want undefined in the list displayed.
    // htmlString += `\n<li class="list-group-item">${property}: ${element}`
  } else if (property == 'id') {
    htmlString += `\n<li class="list-group-item list-group-item-primary 
    text-md-center fw-bolder">${element}`
  } else if (property == 'helpUrl') {
    htmlString += `\n<li class="list-group-item">${property}: `
    htmlString += `\n<a href="${element}" target="_blank">Read More</a>`
  } else if (property == 'tags') {
    htmlString += `\n<li class="list-group-item">${property}: `
    element.forEach(element => {
      htmlString += generateTagBadge(element)
    });
  } else {
    htmlString += `\n<li class="list-group-item">${property}: ${element}`
  }
  htmlString += encloseElement('li')
  return htmlString
}

function createModalWindow(element, index, category) {
  let htmlString = ""
  // Create Outer modal Div
  htmlString += `\n<div class="modal fade" id="modal-${category}-${element.id}-${index}" tabindex="-1"
  aria-labelledby="exampleModalLabel" aria-hidden="true">`
  // create Modal dialog
  htmlString += `\n<div class="modal-dialog modal-lg">`
  // htmlString += addHtmlElement('div', 'modal-dialog modal-lg')
  // Create Modal Content div
  htmlString += `\n<div class="modal-content">`
  // Create Modal header with title and Close Btn  
  htmlString += `\n<div class="modal-header">`
  htmlString += addEnclosedHtmlElement('h5', 'modal-title', element.id, [], element.id)
  // htmlString += `\n<h5 class="modal-title" id="${element.id}-modal-label">${element.id}</h5>`
  htmlString += `\n<button type="button" class="btn-close" data-bs-dismiss="modal"
  aria-label="Close"></button>`
  htmlString += encloseElement('div')
  // Create Modal Body
  htmlString += `\n<div class="modal-body">`
  // Traverse and fill in the content from array into list
  // parse the inner nodes array and list all  html it tested, 
  // targets and impact if the rule failed (null = passed)
  element.nodes.forEach(innerElement => {
    htmlString += `\n<ul class="list-group mb-3">`
    // TBD:Switch to a method generating LI element foreach
    // of the element in the inner part.
    htmlString += generateMoreInfoNodes(innerElement)
    htmlString += encloseElement('ul')
  });
  htmlString += encloseElement('div')
  // Create Modal Footer with Close Button
  htmlString += `\n<div class="modal-footer">`
  htmlString += `\n<button type="button" class="btn btn-secondary"
  data-bs-dismiss="modal">Close</button>`
  htmlString += encloseElement('div')
  return htmlString
}

function parseHeader(headerReport, index) {
  let htmlString = ""
  // start the html tags for header elements for current test
  htmlString += `\n<div class="container-fluid mt-3">`
  htmlString += `\n<div class="row row-cols-1 row-cols-sm-2 mb-3">`

  // create elements for first UL
  htmlString += `<div class="col">`
  htmlString += `<ul class="list-group">`

  // parse URL being tested
  // console.log(headerReport.url)
  htmlString += addLiElement()
  htmlString += `\n<span class="input-group-text list-group-item-primary" id="basic-addon1">Tested URL</span>`
  htmlString += `\n<a href="${headerReport.url}" target="_blank">${headerReport.url}</a>`
  htmlString += encloseElement('li')

  // parse timestamp of test run
  // console.log(headerReport.timestamp)
  htmlString += addLiElement()
  htmlString += addSpanElement("Test Run", headerReport.timestamp)
  htmlString += encloseElement('li')
  // parse test engine name
  // console.log(headerReport.testEngine.name)
  htmlString += addLiElement()
  htmlString += addSpanElement("Test Engine", headerReport.testEngine.name)
  htmlString += encloseElement('li')
  // parse test engine version
  // console.log(headerReport.testEngine.version)
  htmlString += addLiElement()
  htmlString += addSpanElement("Version", headerReport.testEngine.version)
  htmlString += encloseElement('li')
  // parse test reporter
  // console.log(headerReport.toolOptions.reporter);
  htmlString += addLiElement()
  htmlString += addSpanElement("Reporter", headerReport.toolOptions.reporter)
  htmlString += encloseElement('li')

  // enclose first column of header
  htmlString += encloseElement('ul')
  htmlString += encloseElement('div')

  // second collumn of header
  htmlString += `\n<div class="col">`
  htmlString += `\n<ul class="list-group">`

  // parse User-Agent
  // console.log(headerReport.testEnvironment.userAgent);
  htmlString += addLiElement()
  htmlString += addSpanElement("User Agent", headerReport.testEnvironment.userAgent)
  htmlString += encloseElement('li')

  //parse window Width
  // console.log(headerReport.testEnvironment.windowWidth);
  htmlString += addLiElement()
  htmlString += addSpanElement("Window Width", headerReport.testEnvironment.windowWidth)
  htmlString += encloseElement('li')

  //parse window Heigth
  // console.log(headerReport.testEnvironment.windowHeight);
  htmlString += addLiElement()
  htmlString += addSpanElement("Window Heigth", headerReport.testEnvironment.windowHeight)
  htmlString += encloseElement('li')

  //parse orientation Angle
  // console.log(headerReport.testEnvironment.orientationAngle);
  htmlString += addLiElement()
  htmlString += addSpanElement("Orientation Angle", headerReport.testEnvironment.orientationAngle)
  htmlString += encloseElement('li')

  //parse orientation type
  // console.log(headerReport.testEnvironment.orientationType);
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

function parseTestResults(report, index) {
  // Prepare html string
  let htmlString = ""
  let categories = ['violations', 'passes', 'incomplete', 'inapplicable']
  let numberOfItems

  htmlString += `\n<div class="container-fluid">`
  // create Button group for types
  htmlString += `<div class="btn-group mb-3" role="group" aria-label="Basic checkbox toggle button group">`
  categories.forEach(category => {
    numberOfItems = report[category].length
    htmlString += `\n<input type="checkbox" class="btn-check" data-bs-toggle="collapse" 
    data-bs-target="#collapse-${category}-${index}" id="${index}-${category}" autocomplete="off">`
    htmlString += `\n<label class="btn btn-outline-primary" for="${index}-${category}">${category} (${numberOfItems})</label>`
  })
  htmlString += encloseElement('div')

  categories.forEach(category => {
    numberOfItems = report[category].length
    // start with container tag
    htmlString += `\n<div class="collapse" id="collapse-${category}-${index}">`
    htmlString += `\n<div class="container-fluid">`
    htmlString += `\n<div class="row mb-3 align-items-start">`

    htmlString += `\n<h3>${category} (${numberOfItems})</h3>`
    // start div container for results
    htmlString += `\n<div class="container-fluid">`
    htmlString += `\n<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">`

    report[category].forEach(element => {
      htmlString += `\n<div class="col mb-3">`
      htmlString += `\n<ul class="list-group">`
      for (const property in element) {
        if (property == 'nodes') {
          // console.log(element.nodes);
          htmlString += `\n<button class="btn btn-primary" type="button" 
            data-bs-toggle="modal" data-bs-target="#modal-${category}-${element.id}-${index}"
            aria-expanded="false" aria-controls="modal-${category}-${element.id}-${index}">More Info
            </button>`
          // Create a Modal Window with Target and HTML list
          htmlString += createModalWindow(element, index, category)
        } else {
          // create Rule Report Method
          let escapedValue = escapeDataRecursion(element[property])
          htmlString += createRuleReport(property, escapedValue)
        }
      }
      htmlString += encloseElement('ul')
      htmlString += encloseElement('div')
    })
    htmlString += encloseElement('div')
    htmlString += encloseElement('div')
    htmlString += encloseElement('div')
    htmlString += encloseElement('div')
    htmlString += encloseElement('div')
    // htmlString += encloseElement('div')
  });
  return htmlString
}

function generateMoreInfoNodes(innerElement) {
  let htmlString = ""
  // if innerElement is a string or
  // array of strings, generate li
  // else leave them be.

  for (const key in innerElement) {
    if (innerElement[key] == null) {
      // do nothing, skip this element.
    } else if (typeof (innerElement[key]) === 'string') {
      htmlString += `\n<li class="list-group-item">`
      htmlString += `${key}: <code>${escapeHtml(innerElement[key])}</code>`
      htmlString += encloseElement('li')
    } else if (innerElement[key].length > 0) {
      if (innerElement[key].every(i => (typeof i === "string"))) {
        htmlString += `\n<li class="list-group-item">`
        let unsafeHtml = innerElement[key].join()
        htmlString += `${key}: <code>${escapeHtml(unsafeHtml)}</code>`
        htmlString += encloseElement('li')
      } // console.log(`following Element ${key} is a type: ${typeof(innerElement[key])}`);
      // console.log(innerElement[key]);
    }
  }
  // if (innerElement == null){
  //   // do nothing
  // }
  // else {
  //   htmlString += `\n<li class="list-group-item">`

  // }
  // // html
  // htmlString += `\n<li class="list-group-item">`
  // htmlString += `HTML: <code>${escapeHtml(innerElement.html)}</code>`
  // htmlString += encloseElement('li')
  // // target

  // // Message
  // htmlString += `\n<li class="list-group-item">`
  // htmlString += `Message: ${escapeHtml(innerElement.failureSummary)}`
  // htmlString += encloseElement('li')
  return htmlString
}

function escapeDataRecursion(data) {
  if (data == null) {
    return
  } else if (data.isArray) {
    // is array, more traversing needed
    // console.log(`Data ${data} is an Array`);
    return data
  } else if (typeof (data) === "object") {
    // is Object, more traversing needed
    // console.log(`Data ${data} is an Object`);
    return data
  } else if (typeof (data) === "string") {
    // escape string
    return escapeHtml(data)
  } else {
    // unexpexted format
    // console.log(`Data ${data} is in an unexpected format`);
  }

}

export {
  traverseJsonReport,
  parseHeader,
  parseTestResults
}