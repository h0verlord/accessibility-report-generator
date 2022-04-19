class HtmlHelper {
  htmlString: string

  constructor(htmlString: string) {
    this.htmlString = htmlString
  }
  escapehtml(unsafeHtml: string) {
    if (typeof unsafeHtml === null) {
      //  Do nothing
    } else if (typeof unsafeHtml == 'string') {
      return (
        unsafeHtml
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;')
          // eslint-disable-next-line quotes
          .replaceAll("'", '&#039;')
      )
    } else {
      return unsafeHtml
    }
  }
  encloseElement(type: string, numberOfElements = 1) {
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
        case 'h3':
          this.htmlString += `</h3>`
          break
        case 'h5':
          this.htmlString += `</h5>`
          break
        case 'a':
          this.htmlString += `</a>`
          break
        case 'input':
          break
        case 'label':
          this.htmlString += `</label>`
          break
        case 'button':
          this.htmlString += `</button>`
          break
        case 'code':
          this.htmlString += `</code>`
          break
        default:
          return
      }
    }
  }
  addElement(type: string, classes?: string | any[], innerHtml?: string, id?: string, otherAttr?: string[]) {
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
      case 'h3':
        this.htmlString += `\n<h3`
        break
      case 'h5':
        this.htmlString += `\n<h5`
        break
      case 'p':
        this.htmlString += `\n<p`
        break
      case 'input':
        this.htmlString += `\n<input type="checkbox"`
        break
      case 'button':
        this.htmlString += `\n<button`
        break
      case 'label':
        this.htmlString += `\n<label`
        break
      case 'a':
        this.htmlString += `\n<a`
        break
      case 'code':
        this.htmlString += `\n<code`
        break
      default:
        break
    }
    if (classes) {
      this.htmlString += ` class="`
      if (typeof classes === 'string') {
        this.htmlString += `${classes}`
      } else {
        this.htmlString += `${classes.join(' ')}`
      }
      this.htmlString += `"`
    }
    if (id) {
      this.htmlString += ` id="${id}"`
    }
    if (otherAttr && otherAttr.length > 0) {
      // TBD: Traverse Array of other attributes one
      // by one like aria stuff etc
      this.htmlString += ` ${otherAttr.join(' ')}`
    }
    if (innerHtml) {
      this.htmlString += `>${innerHtml}`
    } else {
      this.htmlString += `>`
    }
  }

  writeInnerHtml(innerHtml: string) {
    // check if link, if yes, put in <a> tag
    const safeHtml = this.escapehtml(innerHtml)
    if (typeof safeHtml == 'string') {
      if (safeHtml.includes('://')) {
        const splitUrl = safeHtml.split('/')
        const domain = splitUrl[2]
        this.addEnclosedElement('a', undefined, domain, undefined, [
          `href="${safeHtml}"`,
          'target="_blank"',
        ])
      } else {
        this.htmlString += `${safeHtml}`
      }
    } else {
      this.htmlString += `${safeHtml}`
    }
  }

  addEnclosedElement(type: string, classes?: string, innerHtml?: string, id?: string, otherAttr?: string[]) {
    this.addElement(type, classes, innerHtml, id, otherAttr)
    this.encloseElement(type)
  }

  encloseHtmlDocument() {
    this.htmlString += `\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"`
    // eslint-disable-next-line max-len
    this.htmlString += `integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"`
    this.htmlString += `crossorigin="anonymous"></script>`
    this.htmlString += '\n</body>\n</html>'
  }
}

export default HtmlHelper
