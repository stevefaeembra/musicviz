// models view of pits as a whole

const PubSub = require('../helpers/pub_sub');

class KeyboardView {

  constructor(divId, musicObject) {
    this.music = musicObject;
    this.element = document.querySelector(divId);
  }

  render(message) {
    let isactive=true;
    let info=[
      {'name':'c',offset:0,color:'w'},
      {'name':'csharp',offset:1,color:'bk'},
      {'name':'d',offset:2,color:'w'},
      {'name':'dsharp',offset:3,color:'bk'},
      {'name':'e',offset:4,color:'w'},
      {'name':'f',offset:5,color:'w'},
      {'name':'fsharp',offset:6,color:'bk'},
      {'name':'g',offset:7,color:'w'},
      {'name':'gsharp',offset:8,color:'bk'},
      {'name':'a',offset:9,color:'w'},
      {'name':'asharp',offset:10,color:'bk'},
      {'name':'b',offset:11,color:'w'}
    ]
    this.element.innerHTML = '';
    let keyboard = document.createElement("div");
    keyboard.id = "keyboard";

    // set orientation of keyboard according to pull down
    let newOrientation;
    if (!document.getElementById("orientation")) {
      newOrientation="horizontal";
    } else {
      newOrientation = document.getElementById("orientation").selectedOptions[0].value;
    }
    keyboard.className = `keyboard ${newOrientation}`;

    for (var keyinfo of info) {
      let keydiv = document.createElement("div");
      let isactive = (message.pitches.indexOf(keyinfo.offset) !== -1) ? 'active' : '';
      let isroot = (keyinfo.offset===message.root) ? 'root' : '';
      keydiv.className = `key_${keyinfo.name} key_${keyinfo.color} ${isactive} ${isroot}`;
      keyboard.appendChild(keydiv);
    }

    this.element.appendChild(keyboard);
  }

  bindEvents() {
    PubSub.subscribe("message", (event) => {
      this.render(event.detail.message);
    })
  }

}

module.exports = KeyboardView;
