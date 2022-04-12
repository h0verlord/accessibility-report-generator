class HtmlHelper {
  constructor(htmlString) {
    this.htmlString = htmlString
  }
  escapehtml(unsafeHtml) {
    if (typeof unsafe === null) {
     this.htmlString +=
    } else if (typeof unsafe === 'string') {
     this.htmlString += (
        unsafe
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;')
          // eslint-disable-next-line quotes
          .replaceAll("'", '&#039;')
      )
    } else {
      // console.log(`${unsafe} is not a string`);
     this.htmlString +=
    }
  }
  addElement(type, classes, id = undefined, otherAttr = []) {
    switch (type) {
      case 'div':
        this.htmlString += `\n<div`
        break
      case 'ul':
        this.htmlString += `\n<ul`
        break
      case 'li':
        this.htmlString += `\n<li`
        break
      case 'span':
        this.htmlString += `\n<ul`
        break
      case 'h5':
        this.htmlString += `\n<h5`
        break
      default:
        break
    }
    if (classes !== undefined) {
      this.htmlString += ` class="${classes}"`
    }
    if (id !== undefined) {
      this.htmlString += ` id="${id}"`
    }
    if (otherAttr !== undefined) {
      // TBD: Traverse Array of other attributes one
      // by one like aria stuff etc
    }
    if (innerHtml !== undefined) {
      this.htmlString += `>${innerHtml}`
    } else {
      this.htmlString += `>`
    }
   this.htmlString += this.htmlString
  }
  addEnclosedElement(type, classes, id = undefined, otherAttr = []) {
    this.addElement(type, classes, id, otherAttr)
    this.encloseElement()
  }
  encloseElement(type, numberOfElements = 1) {
    for (let element = 0; element < numberOfElements; element++) {
      switch (type) {
        case 'div':
         this.htmlString += `\n</div>`
        case 'li':
         this.htmlString += `\n</li>`
        case 'ul':
         this.htmlString += `\n</ul>`
        case 'span':
         this.htmlString += `\n</span>`
        case 'h5':
         this.htmlString += `\n</h5>`

        default:
          return
      }
    }
  }
}

export default HtmlHelper
