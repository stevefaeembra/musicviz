// models view of pits as a whole

const PubSub = require('../helpers/pub_sub');

class ScaleNameView {

  constructor(divId) {
    this.element = document.querySelector(divId);
  }

  render(message) {
    this.element.innerHTML = '';
    this.element.innerHTML = message.scale;
  }

  bindEvents() {
    PubSub.subscribe("message", (event) => {
      this.render(event.detail.message);
    })
  }

}

module.exports = ScaleNameView;
