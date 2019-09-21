// models view of pits as a whole

const PubSub = require('../helpers/pub_sub');

class NoteNamesView {

  constructor(divId) {
    this.element = document.querySelector(divId);
  }

  render(message) {
    this.element.innerHTML = '';
    this.element.class="notenames";
    console.dir('notenames',message.notenames);
    for (let notename of message.notenames) {
      let notenamediv = document.createElement("div");
      notenamediv.innerHTML = notename;
      notenamediv.className="notenames--note";
      this.element.appendChild(notenamediv);
    }
  }

  bindEvents() {
    PubSub.subscribe("message", (event) => {
      this.render(event.detail.message);
    })
  }

}

module.exports = NoteNamesView;
