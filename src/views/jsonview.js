// models view of pits as a whole

const PubSub = require('../helpers/pub_sub');

class JSONView {

  constructor(divId) {
    this.element = document.querySelector(divId);
  }

  render(message) {
    this.element.innerHTML = '';
    let codeblock = document.createElement("pre");
    codeblock.innerHTML = JSON.stringify(message,null,2);
    this.element.appendChild(codeblock);
  }

  bindEvents() {
    PubSub.subscribe("message", (event) => {
      const message = event.detail.message;
      this.render(message);
    })
  }

}

module.exports = JSONView;
