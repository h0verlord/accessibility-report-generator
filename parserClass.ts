import HtmlHelper from './htmlHelper.js'
export default class Parser {
  htmlString: string
  jsonObject: []
  html: HtmlHelper

  constructor(jsonObject: [], htmlString: string) {
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

  parseHostReport(jsonObject: object, index: number) {
    // prepare divs for Host section
    this.html.addElement('div', 'container-fluid mt-3')
    this.html.addElement('div', 'row')
    // write header for current host
    this.generateHeaderForHost(jsonObject)
    // Generate Rules
    this.generateCategoriesForHost(jsonObject, index)
    // Close all divs For Christ's Sake
    this.html.encloseElement('div', 1)
  }

  generateHeaderForHost(jsonObject: object) {
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
      'nodes',
    ]
    const id = object.id
    this.html.addElement('div', 'col mb-3')
    this.html.addElement('ul', 'list-group')
    orderedRuleFields.forEach((field) => {
      this.writeTestReportRuleDetail(object[field], category, field, index, id)
    })
    this.html.encloseElement('ul')
    this.html.encloseElement('div')
  }

  writeTestReportRuleDetail(object, category, field, index, id) {
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
        this.writeRuleDetailModal(object, category, index, id)
      } else {
        this.html.addElement('li', ['list-group-item'])
        this.html.addEnclosedElement('span', undefined, `${field}: `)
        this.html.writeInnerHtml(object)
      }
      this.html.encloseElement('li')
    }
  }

  writeRuleDetailModal(object, category, index, id) {
    // TBD
    // If nodes field is not empty, generate button
    // and div modal with info.
    const modalId = `modal-${category}-${id}-${index}`
    if (object.length > 0) {
      this.html.addEnclosedElement(
        'button',
        'btn btn-primary',
        'More Info',
        undefined,
        [
          'type="button"',
          'data-bs-toggle="modal"',
          `data-bs-target="#${modalId}"`,
          'aria-expanded="false"',
          `aria-controls="${modalId}"`,
        ],
      )
      this.html.addElement('div', 'modal fade', undefined, modalId, [
        'tabindex="-1"',
        'aria-labelledby="moreInfoRule"',
        'aria-hidden="true"',
      ])
      this.html.addElement('div', 'modal-dialog modal-lg')
      this.html.addElement('div', 'modal-content')
      // Modal Header
      this.html.addElement('div', 'modal-header')
      this.html.addEnclosedElement('h5', 'modal-title', id, id)
      this.html.addEnclosedElement(
        'button',
        'btn-close',
        undefined,
        undefined,
        ['type="button"', 'data-bs-dismiss="modal"', 'aria-label="Close"'],
      )
      this.html.encloseElement('div')
      // Modal Body
      this.html.addElement('div', 'modal-body')
      for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
          const separateList = object[key]
          this.writeModalInnerFields(separateList)
        }
      }
      this.html.encloseElement('div')
      // Modal Footer
      this.html.addElement('div', 'modal-footer')
      this.html.addEnclosedElement(
        'button',
        'btn btn-secondary',
        'Close',
        undefined,
        ['type="button"', 'data-bs-dismiss="modal"'],
      )
      this.html.encloseElement('div', 4)
    }
  }

  writeModalInnerFields(object) {
    const modalFields = ['impact', 'html', 'target', 'failureSummary']
    this.html.addElement('ul', 'list-group mb-3')
    modalFields.forEach((field) => {
      if (object[field] == null) {
        // do nothing
      } else {
        this.html.addElement('li', 'list-group-item')
        this.html.writeInnerHtml(`${field}: `)
        this.generateCodeStyle(object[field])
        // TBD if Impact, generate colorful style
        this.html.encloseElement('li')
      }
    })
    this.html.encloseElement('ul')
  }

  writeImpactStyle() {
    // TBD
  }

  writeRuleDetailTagStyle() {
    // TBD
  }

  generateCodeStyle(codeText) {
    // TBD
    // If array, first join with comma
    // else just escape and return the string.
    if (Array.isArray(codeText)) {
      codeText = codeText.join(', ')
    }
    const safeHtml = this.html.escapehtml(codeText)
    this.html.addEnclosedElement('code', undefined, safeHtml)
  }
}
