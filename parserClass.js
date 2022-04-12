class Parser {
  constructor(name) {
    this.name = name
    this.hello()
  }
  hello() {
    console.log(`Hello method from class parser, ${this.name}`)
  }
}

export default Parser
