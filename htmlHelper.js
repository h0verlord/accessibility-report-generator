class HtmlHelper {
  constructor(htmlString) {
    this.htmlString = htmlString
  }
  escapehtml(unsafeHtml) {
    if (typeof unsafe === null) {
      //  Do nothing
    } else if (typeof unsafe === 'string') {
      this.htmlString += unsafe
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        // eslint-disable-next-line quotes
        .replaceAll("'", '&#039;')
    } else {
      // console.log(`${unsafe} is not a string`);
    }
  }
  encloseElement(type, numberOfElements = 1) {
    for (let element = 0; element < numberOfElements; element++) {
      switch (type) {
        case 'div':
          this.htmlString += `\n</div>`
          break
        case 'li':
          this.htmlString += `\n</li>`
          break
        case 'ul':
          this.htmlString += `\n</ul>`
          break
        case 'span':
          this.htmlString += `</span>`
          break
        case 'h5':
          this.htmlString += `</h5>`
          break
        case 'a':
          this.htmlString += `</a>`
          break
        default:
          return
      }
    }
  }
  addElement(type, classes, innerHtml, id, otherAttr = []) {
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
        this.htmlString += `\n<span`
        break
      case 'h5':
        this.htmlString += `\n<h5`
        break
      case 'a':
        this.htmlString += `\n<a href="${innerHtml}" target="_blank"`
        break
      default:
        break
    }
    if (classes) {
      this.htmlString += ` class="${classes}"`
    }
    if (id) {
      this.htmlString += ` id="${id}"`
    }
    if (otherAttr.length > 0) {
      // TBD: Traverse Array of other attributes one
      // by one like aria stuff etc
    }
    if (innerHtml) {
      this.htmlString += `>${innerHtml}`
    } else {
      this.htmlString += `>`
    }
  }
  addEnclosedElement(type, classes, innerHtml, id, otherAttr = []) {
    this.addElement(type, classes, innerHtml, id, otherAttr)
    this.encloseElement(type)
  }
  encloseHtmlDocument() {
    this.htmlContent += `\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"`
    // eslint-disable-next-line max-len
    this.htmlContent += `integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"`
    this.htmlContent += `crossorigin="anonymous"></script>`
    this.htmlContent += '\n</body>\n</html>'
  }
}

export default HtmlHelper
