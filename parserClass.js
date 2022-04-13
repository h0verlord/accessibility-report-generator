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
    // prepare divs for Host section
    this.html.addElement('div', 'container-fluid mt-3')
    this.html.addElement('div', 'row')
    // Generate Header
    this.html.addElement('div', 'col-md-6 col-xxl-3 pt-3 border')
    this.html.addElement('div', 'row row-cols-1')

    this.generateHeaderForHost(jsonObject)
    // Generate Rules

    // Close all divs For Christ's Sake
    this.html.encloseElement('div', 4)
    // this.filterObjectData(jsonObject)
  }

  generateHeaderForHost(jsonObject) {
    // traverses given object in a specific order
    // given by the filter const
    // filter can later be passed in parameter
    // and this made a very generic method
    const filter = [
      'url',
      'timestamp',
      'testEnvironment',
      'testEngine',
      'testRunner',
      'toolOptions',
    ]
    filter.forEach((property) => {
      this.writeTestReportHeader(jsonObject[property], property)
    })
  }

  generateCategoriesReport(jsonObject) {
    // traverses given object in a specific order
    // given by the filter const
    // filter can later be passed in parameter
    const filter = ['violations', 'passes', 'incomplete', 'inapplicable']
    // and this made a very generic method
    filter.forEach((category) => {
      this.writeTestReportCategory(jsonObject[category], category)
    })
  }

  writeTestReportHeader(jsonObject, property) {
    // Preapre Col and Ul for one header section
    this.html.addElement('div', 'col')
    this.html.addElement('ul', 'list-group mb-3')
    // section heading
    this.html.addElement('li', [
      'list-group-item',
      'list-group-item-primary',
      'd-flex',
      'justify-content-between',
    ])
    this.html.addEnclosedElement('span', undefined, property)
    this.html.encloseElement('li')
    // If field exists
    if (typeof jsonObject == 'object') {
      for (const key in jsonObject) {
        if (Object.hasOwnProperty.call(jsonObject, key)) {
          const element = jsonObject[key]
          // generate Li elements for each key:value pairs
          this.html.addElement('li', [
            'list-group-item',
            'd-flex',
            'justify-content-between',
          ])
          this.html.addEnclosedElement('span', undefined, key)
          this.html.writeInnerHtml(element)
          this.html.encloseElement('li')
        }
      }
    } else {
      this.html.addElement('li', [
        'list-group-item',
        'd-flex',
        'justify-content-between',
      ])
      this.html.addEnclosedElement('span', undefined, property)
      if (typeof jsonObject == 'string') {
        if (jsonObject.includes('https://')) {
          this.html.addEnclosedElement('a', undefined, jsonObject)
        } else {
          this.html.writeInnerHtml(jsonObject)
        }
      } else {
        this.html.writeInnerHtml(jsonObject)
      }
      this.html.encloseElement('li')
    }
    this.html.encloseElement('div')
    this.html.encloseElement('ul')
  }

  writeTestReportCategory(jsonObject, category) {}
}
export default Parser
