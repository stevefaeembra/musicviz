const NOTENAMES = require('./notenames');
const SCALES = require('./scales');
const NOTENUMBERS = require('./notenumbers');
const CHORDS = require('./chords');
const ROMAN = require('./roman');
const CHORDFILTERS = require('./chordfilters');

class Music {
  constructor() {

  }

  getChordNotes(notename, chordname) {
      let offsets = CHORDS[chordname];
      let rootOffset = NOTENUMBERS[notename];
      let chordNotes = [];
      for (let offset of offsets) {
        chordNotes.push((rootOffset+offset)%12);
      }
      return chordNotes;
  };

  areNotesAllInScale(notenumbers, scalenotenumbers) {
    let valid = true;
    for (let ix of notenumbers) {
      if (scalenotenumbers.indexOf(ix)==-1) {
        valid = false;
        break;
      }
    }
    return valid;
  };

  chordNotesToNames(notenumbers) {
    let result = [];
    for (let offset of notenumbers) {
      result.push(NOTENAMES[offset]);
    }
    return result.join(" ");
  };

  getNoteNames () {
      let result = this.chordNotesToNames([0,1,2,3,4,5,6,7,8,9,10,11]);
      return result.split(" ");
  };

  getNameFromTone(tone) {
    return this.chordNotesToNames([tone]);
  }

  getScale(notename, scalename) {
      const pitchclasses = SCALES[scalename];
      const root = NOTENUMBERS[notename];
      let result = {
        notenames : [],
        pitches : [],
        chords: [],
        root: root
      };
      for (let offset of pitchclasses) {
        let note = (offset+root)%12;
        let notename = NOTENAMES[note];
        result.notenames.push(notename);
        result.pitches.push(note);
      };
      // now find suitable chords on each scale step
      let step = 0;
      for (let root of result.pitches) {
        let noteName = NOTENAMES[root];
        for (let chordtype of Object.keys(CHORDS)) {
          let chordNotes = this.getChordNotes(noteName, chordtype);
          if (this.areNotesAllInScale(chordNotes,result.pitches)) {
            result.chords.push({
              'roman' : ROMAN[step]['major'],
              'step': ROMAN[step][chordtype],
              'name': `${noteName} ${chordtype}`,
              'root': `${noteName}`,
              'chord': `${chordtype}`,
              'pitches': chordNotes,
              'pitchnames': this.chordNotesToNames(chordNotes)
            });
          }
        };
        step += 1;
      }
      result['scale'] = `${notename} ${scalename}`;
      console.dir('Result', result);
      return result;
  };

  getScaleNames () {
      return Object.keys(SCALES);
  };

  getChordFilterNames () {
      return Object.keys(CHORDFILTERS);
  };

  getChordFilterTypes(filterName) {
    return CHORDFILTERS[filterName];
  }

}

module.exports = Music;
