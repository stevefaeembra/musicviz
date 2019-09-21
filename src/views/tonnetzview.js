// models view of pits as a whole

const PubSub = require('../helpers/pub_sub');

class TonnetzView {

  constructor(divId, musicObject) {
    this.music = musicObject;
    this.element = document.querySelector(divId);
  }

  render(message) {
    this.element.innerHTML='';
    let tonnetz=document.createElement("div");
    tonnetz.className="tonnetz";
    tonnetz.id = "tonnetz";
    let width=13;
    let height=6;
    for (let row=0; row<height; row++) {
      for (let col=0; col<width; col++) {
        let rowstart = [8,4,0][row%3];
        let tone = (rowstart+(col*7))%12;
        let tonename = this.music.getNameFromTone(tone);
        let celldiv = document.createElement("div");
        let isroot = (tone===message.root) ? 'root' : '';
        let isactive = (message.pitches.indexOf(tone) !== -1) ? 'active' : '';
        celldiv.className = `tonnetz-cell ${isactive} ${isroot}`;
        celldiv.innerHTML = `${tonename}`;
        tonnetz.appendChild(celldiv);
      }
    }
    this.element.appendChild(tonnetz);
  }

  bindEvents() {
    PubSub.subscribe("message", (event) => {
      this.render(event.detail.message);
    })
  }

}

module.exports = TonnetzView;
