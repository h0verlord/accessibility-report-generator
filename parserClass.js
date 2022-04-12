class Parser {
  constructor(jsonObject, htmlString) {
    this.htmlString = htmlString
    this.jsonObject = jsonObject
  }
  traverseJsonReport(jsonObject, htmlString) {
    console.log(jsonObject)
  }
}

export default Parser
