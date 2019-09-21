// pitch classes
//   1   3      6   8   10
// 0   2   4  5   7   9    11
const scales = {
  'major' : [0,2,4,5,7,9,11],
  'minor' : [0,2,3,5,7,8,10],
  'harmonic minor' : [0,2,3,5,7,8,11],
  'ionian' : [0,2,4,5,7,9,11], // same as major
  'dorian' : [0,2,3,5,7,9,10],
  'phygrian' : [0,1,3,5,7,8,10],
  'lydian': [0,2,4,6,7,9,11],
  'mixolydian' : [0,2,4,5,7,9,10],
  'aeolian' : [0,2,3,5,7,8,10], // same as minor
  'locrian' : [0,1,3,5,6,8,10],
  'pentatonic': [0,2,5,7,9],
  'wholetone': [0,2,4,6,8,10],
  'persian': [0,1,4,5,6,8,11],
  'tritone': [0,1,4,6,7,10],
  'stevescale': [0,3,4,6,8,9,11]
};

module.exports = scales;
