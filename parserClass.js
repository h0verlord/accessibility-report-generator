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
    this.html.encloseHtmlDocument()
    return this.html.htmlString
  }

  parseHostReport(jsonObject, index) {
    // prepare divs for Host section
    this.html.addElement('div', 'container-fluid mt-3')
    this.html.addElement('div', 'row')
    // write header for current host
    this.generateHeaderForHost(jsonObject)
    // Generate Rules
    this.generateCategoriesForHost(jsonObject, index)
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

  generateCategoriesForHost(jsonObject, index) {
    // traverses given object in a specific order
    // given by the filter const
    // filter can later be passed in parameter
    this.html.addElement('div', 'col-md-6 col-xxl-9 pt-3 border')
    const filter = ['violations', 'passes', 'incomplete', 'inapplicable']
    // and this made a very generic method
    // Generate button group for collapsing categories
    this.writeTestReportCategoriesButtons(jsonObject, filter, index)
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
      this.html.writeInnerHtml(jsonObject)
      this.html.encloseElement('li')
    }
    this.html.encloseElement('div')
    this.html.encloseElement('ul')
  }

  writeTestReportCategoriesButtons(jsonObject, categories, index) {
    this.html.addElement('div', 'row')
    this.html.addElement('div', 'btn-group', undefined, undefined, [
      'role="group"',
      'aria-label="Categories Toggle Button"',
    ])
    categories.forEach((category) => {
      // let checked = ''
      // // Generate button
      // if (category == 'violations') {
      //   checked = ' checked'
      // }
      const categoryItems = jsonObject[category].length
      this.html.addEnclosedElement(
        'input',
        'btn-check',
        undefined,
        `${category}-${index}`,
        [
          'data-bs-toggle="collapse"',
          `data-bs-target="#collapse-${category}-${index}"`,
          'autocomplete="off"',
          // 'aria-expanded="true"',
          // checked,
        ],
      )
      this.html.addEnclosedElement(
        'label',
        'btn btn-outline-primary',
        `${category} (${categoryItems})`,
        undefined,
        [`for="${category}-${index}"`],
      )
    })
    this.html.encloseElement('div', 2)
  }

  writeTestReportCategory(jsonObject, category, index) {
    // Write the collapse wrapper div
    if (category == 'violations') {
      this.html.addElement(
        'div',
        'collapse',
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
      this.writeTestReportRuleDetail(object[field], category, field, index)
    })
    // generate modal for nodes
    // TBD
    this.html.encloseElement('ul')
    this.html.encloseElement('div')
  }

  writeTestReportRuleDetail(object, category, field, index) {
    // write Li elements based on some rules.
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
      } else if (field == 'nodes') {
        // call modal gen method
      } else {
        this.html.addElement(
          'li',
          ['list-group-item'],
          // `${field}: ${this.html.escapehtml(object)}`,
        )
        this.html.addEnclosedElement('span', undefined, `${field}: `)
        this.html.writeInnerHtml(object)
      }
      this.html.encloseElement('li')
    }
  }

  writeRuleDetailModal(object, category, field, index) {
    // TBD
  }

  writeRuleDetailImpactStyle() {
    // TBD
  }

  writeRuleDetailTagStyle() {
    // TBD
  }
}
export default Parser
