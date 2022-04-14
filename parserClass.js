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
    // write header for current host
    this.generateHeaderForHost(jsonObject)
    // Generate Rules
    this.generateCategoriesReport(jsonObject, index)
    // Close all divs For Christ's Sake
    this.html.encloseElement('div', 2)
  }

  generateHeaderForHost(jsonObject) {
    // traverses given object in a specific order
    // given by the filter const
    // filter can later be passed in parameter
    // and this made a very generic method
    // Generate Header
    this.html.addElement('div', 'col-md-6 col-xxl-3 pt-3 border')
    this.html.addElement('div', 'row row-cols-1')
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
    this.html.encloseElement('div', 2)
  }

  generateCategoriesReport(jsonObject, index) {
    // traverses given object in a specific order
    // given by the filter const
    // filter can later be passed in parameter
    this.html.addElement('div', 'col-md-6 col-xxl-9 pt-3 border')
    const filter = ['violations', 'passes', 'incomplete', 'inapplicable']
    // and this made a very generic method
    filter.forEach((category) => {
      this.writeTestReportCategory(jsonObject[category], category, index)
    })
    this.html.encloseElement('div', 2)
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

  writeTestReportCategory(jsonObject, category, index) {
    // Write the collapse wrapper div
    if (category == 'violations') {
      this.html.addElement(
        'div',
        'collapse-show',
        undefined,
        `collapse-${category}-${index}`,
      )
    } else {
      this.html.addElement(
        'div',
        'collapse',
        undefined,
        `collapse-${category}-${index}`,
      )
    }
    this.html.addElement('div', 'row')
    this.html.addEnclosedElement(
      'h3',
      undefined,
      `${category} (${jsonObject.length})`,
    )
    this.html.encloseElement('div')
    this.html.addElement('div', 'row row-cols-1 row-cols-xl-2 row-cols-xxl-3')
    for (const key in jsonObject) {
      if (Object.hasOwnProperty.call(jsonObject, key)) {
        const element = jsonObject[key]
        this.writeTestReportCategoryRules(element, category, index)
      }
    }
    this.html.encloseElement('div', 2)
  }

  writeTestReportCategoryRules(object, category, index) {
    const orderedRuleFields = [
      'id',
      'impact',
      'tags',
      'description',
      'help',
      'helpUrl',
      // 'nodes',
    ]
    this.html.addElement('div', 'col mb-3')
    this.html.addElement('ul', 'list-group')
    orderedRuleFields.forEach((field) => {
      this.writeTestReportCategoryRuleDetail(
        object[field],
        category,
        field,
        index,
      )
    })
    // generate modal for nodes
    // TBD
    this.html.encloseElement('ul')
    this.html.encloseElement('div')
  }
  writeTestReportCategoryRuleDetail(object, category, field, index) {
    // write Lis based on some rules.
    if (object) {
      if (field == 'id') {
        this.html.addElement(
          'li',
          [
            'list-group-item',
            'list-group-item-primary',
            'text-md-center',
            'fw-bolder',
          ],
          object,
        )
      } else {
        this.html.addElement(
          'li',
          ['list-group-item'],
          `${field}: ${this.html.escapehtml(object)}`,
        )
      }
      this.html.encloseElement('li')
    }
  }
}
export default Parser
