// models view of pits as a whole

const PubSub = require('../helpers/pub_sub');

class RomanView {

  constructor(divId) {
    this.element = document.querySelector(divId);
    // change the following to expand/contract the chord list
    this.showchords = ['major','minor','dim','aug'];
  }

  render(message) {
    this.element.innerHTML = '';
    let table = document.createElement("div");
    table.className = "romanTable"
    for (let chordinfo of message.chords) {
      if (this.showchords.indexOf(chordinfo.chord) !== -1){
          let row = document.createElement("div");
          row.className = "romanCard";
          let c1 = document.createElement("div");
          c1.className =`romanStep ${chordinfo.roman}`;
          c1.innerHTML = chordinfo.roman;
          let c2 = document.createElement("div");
          c2.className = "romanDigit"
          c2.innerHTML = chordinfo.step;
          let c3 = document.createElement("div");
          c3.className = "chordName";
          c3.innerHTML = chordinfo.name;
          let c4 = document.createElement("div");
          c4.className = "chordTones";
          c4.innerHTML = chordinfo.pitchnames;

          row.appendChild(c1);
          row.appendChild(c2);
          row.appendChild(c3);
          row.appendChild(c4);
          table.appendChild(row);

      }
    }
    this.element.appendChild(table);
  }

  bindEvents() {
    PubSub.subscribe("message", (event) => {
      this.render(event.detail.message);
    });
    PubSub.subscribe("filterchordtypes", (event)=> {
      this.showchords = event.detail.filterchords;
      this.render(event.detail.message);
    })
  }

}

module.exports = RomanView;
