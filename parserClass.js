import HtmlHelper from './htmlHelper.js'
class Parser {
  constructor(jsonObject, htmlString) {
    this.htmlString = htmlString
    this.jsonObject = jsonObject
    this.html = new HtmlHelper(htmlString)
  }
  traverseJsonReport(jsonObject, htmlString) {
    for (let index = 0; index < jsonObject.length; index++) {
      this.parseHostReport(jsonObject[index], htmlString, index)
    }
  }
  parseHostReport(jsonObject, htmlString, index) {
    // console.log(index)
    // console.log(jsonObject)
    
  }
}
export default Parser
