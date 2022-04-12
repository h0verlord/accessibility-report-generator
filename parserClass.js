import HtmlHelper from './htmlHelper.js'
class Parser {
  constructor(jsonObject, htmlString) {
    this.htmlString = htmlString
    this.jsonObject = jsonObject
    this.html = new HtmlHelper(htmlString)
  }
  traverseJsonReport() {
    for (let index = 0; index < this.jsonObject.length; index++) {
      this.parseHostReport(this.jsonObject[index], index)
    }
    return this.html.htmlString
  }
  parseHostReport(jsonObject, index) {
    // console.log(index)
    // console.log(jsonObject)
    // filter fields we wanna use in header
    // console.log(`Host no.${index}`)
    this.createHeaderSection(jsonObject)
    // this.filterObjectData(jsonObject)
  }
  filterObjectDataRecursion(jsonObject) {
    // edit the object to split header from categories a bit better.
    // let categoryFields = ['violations', 'passes', 'incomplete', 'inapplicable']
    // }
    const headerFields = [
      'testEngine',
      'testRunner',
      'testEnvironment',
      'timestamp',
      'url',
      'toolOptions',
      'name',
      'version',
      'userAgent',
      'windowWidth',
      'windowHeight',
      'orientationAngle',
      'orientationType',
      'reporter',
    ]
    for (const property in jsonObject) {
      if (Object.hasOwnProperty.call(jsonObject, property)) {
        const element = jsonObject[property]
        if (headerFields.includes(property)) {
          if (element) {
            this.html.addElement(
              'li',
              'list-group-item d-flex justify-content-between',
            )
            if (typeof element === 'string' || typeof element === 'number') {
              // if text is url, make <a>, else <p>
              if (typeof element === 'string') {
                if (element.includes('https://')) {
                  this.html.addEnclosedElement('a', undefined, element)
                }
              } else {
                this.html.addEnclosedElement('p', undefined, element)
              }
            } else if (Object.keys(element).length > 0) {
              // console.log(`${property}:`)
              this.filterObjectDataRecursion(element)
            }
            this.html.encloseElement('li')
          }
        }
      }
    }
  }
  createHeaderSection(jsonObject) {
    this.html.addElement('div', 'container-fluid mt-3')
    this.html.addElement('div', 'row row-cols-1 row-cols-sm-2 mb-3')
    this.html.addElement('div', 'col')
    this.html.addElement('ul', 'list-group')
    this.filterObjectDataRecursion(jsonObject)
    // this.html.addEnclosedElement(
    //   'span',
    //   'input-group-text list-group-item-primary',
    //   'Tested URL'
    // )
    // this.html.addEnclosedElement('a', undefined, jsonObject.url)
    // this.html.encloseElement('li')
    // this.html.encloseElement('ul')
    // this.html.encloseElement('div', 3)
  }
}
export default Parser
