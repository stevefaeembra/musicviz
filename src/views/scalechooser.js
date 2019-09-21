// models view of pits as a whole

const PubSub = require('../helpers/pub_sub');

class ScaleChooserView {

  constructor(divId, musicObject) {
    this.element = document.querySelector(divId);
    this.music = musicObject;
  }

  render() {
    this.element.innerHTML = '';
    let fieldset = document.createElement("fieldset");

    // choose the root note/tonic
    let div1 = document.createElement("div");
      div1.className = "row";
      let label1 = document.createElement("label");
      label1.innerHTML = "Root note";
      div1.appendChild(label1);
      let select1 = document.createElement("select");
      select1.id = "root";
      for (let note of this.music.getNoteNames()) {
        let noteOption = document.createElement("option");
        noteOption.innerHTML = note;
        select1.appendChild(noteOption);
      }
      select1.addEventListener('change', (event) => {
        let rootNote = document.getElementById("root").selectedOptions[0].value;
        let scaleName = document.getElementById("scale").selectedOptions[0].value;
        PubSub.publish("message",{
          message: this.music.getScale(rootNote,scaleName)
        });
      });
      div1.appendChild(select1);

    // choose the scale
    let div2 = document.createElement("div");
      div2.className = "row";
      let label2 = document.createElement("label");
      label2.innerHTML = "Scale / Mode";
      div2.appendChild(label2);
      let select2 = document.createElement("select");
      select2.id = "scale";
      for (let scale of this.music.getScaleNames()) {
        let scaleOption = document.createElement("option");
        scaleOption.innerHTML = scale;
        select2.appendChild(scaleOption);
      }
      select2.addEventListener('change', (event) => {
        let rootNote = document.getElementById("root").selectedOptions[0].value;
        let scaleName = document.getElementById("scale").selectedOptions[0].value;
        //alert(`You chose ${rootNote} ${scaleName}`);
        PubSub.publish("message",{
          message: this.music.getScale(rootNote,scaleName)
        });
      });
      div2.appendChild(select2);

    // choose a chord filter

    let div3 = document.createElement("div");
      div3.className = "row";
      let label3 = document.createElement("label");
      label3.innerHTML = "Show chord types";
      div3.appendChild(label3);
      let select3 = document.createElement("select");
      select3.id = "filter";
      for (let filtername of this.music.getChordFilterNames()) {
        let filterOption = document.createElement("option");
        filterOption.innerHTML = filtername;
        select3.appendChild(filterOption);
      }
      select3.addEventListener('change', (event) => {
        let rootNote = document.getElementById("root").selectedOptions[0].value;
        let scaleName = document.getElementById("scale").selectedOptions[0].value;
        let filterName = document.getElementById("filter").selectedOptions[0].value;
        //alert(`You chose ${rootNote} ${scaleName}`);
        PubSub.publish("filterchordtypes", {
          message: this.music.getScale(rootNote,scaleName),
          filterchords: this.music.getChordFilterTypes(filterName)
        });
      });
      div3.appendChild(select3);

    // choose keyboard orientation
    let div4 = document.createElement("div");
      div4.className = "row";
      let label4 = document.createElement("label");
      label4.innerHTML = "Keyboard Orientation";
      div4.appendChild(label4);
      let select4 = document.createElement("select");
      select4.id = "orientation";
      let optionH = document.createElement("option");
      optionH.innerHTML = "horizontal";
      let optionV = document.createElement("option");
      optionV.innerHTML = "vertical";
      select4.appendChild(optionH);
      select4.appendChild(optionV);
      select4.addEventListener('change', (event) => {
        let newOrientation = document.getElementById("orientation").selectedOptions[0].value;
        let keyboard = document.getElementById("keyboard");
        keyboard.className = `keyboard ${newOrientation}`;
      });
      div4.appendChild(select4)

    fieldset.appendChild(div1);
    fieldset.appendChild(div2);
    fieldset.appendChild(div3);
    fieldset.appendChild(div4);

    this.element.appendChild(fieldset);
  }

  bindEvents() {
    PubSub.subscribe("render", (event) => {
      this.render();
    })
  }

}

module.exports = ScaleChooserView;
