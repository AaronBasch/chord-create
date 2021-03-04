export const chordDegrees = {
  // # I (IV, iv, vi, Idom, ii, iid, II,III)
  // # index 0
  "I MAJ": {
    I: [0, 4, 7],
    Imaj7: [0, 4, 7, 11],
    Imaj79: [0, 4, 7, 11, 14],
    I9: [0, 4, 7, 14]
  },
  // # I dom (to ii or IV)
  // # index 1
  "I DOM": {
    I7: [0, 4, 7, 10]
  },

  "#I DIM": {
    "#ib5": [1, 4, 7],
    "#i7b5": [1, 4, 7, 10]
  },
  // # ii (any chord with weight to V, IV, iid, negative weight to III and iv)
  // # index 2
  "II MIN": {
    ii: [2, 5, 9],
    ii7: [2, 5, 9, 0],
    ii9: [2, 5, 9, 4],
    ii97: [2, 5, 9, 0, 4]
  },
  // # ii dim (to I, possible another diminished or vi)
  // # index 3
  "II DIM": {
    iib5: [2, 5, 8],
    ii7b5: [2, 5, 8, 0]
  },
  // # II (to ii, IV, V)
  // # index 4
  "II DOM": {
    II: [2, 6, 9],
    II7: [2, 6, 9, 0],
    II97: [2, 6, 9, 0, 4],
    II9: [2, 6, 9, 4]
  },
  // # iii (to III, ii, IV, vi, VI)
  // # index 5
  "III MIN": {
    iii: [4, 7, 11],
    iii7: [4, 7, 11, 2]
  },
  // # III (to IV, vi, VI, viidim, #Vdim)
  // # index 6
  "III DOM": {
    III: [4, 8, 11],
    III7: [4, 8, 11, 2]
  },
  // # iv (iii, I)
  // # index 7
  "IV MIN": {
    iv: [5, 8, 0],
    "iv#7": [5, 8, 0, 4]
  },
  // # IV (to iv, iii, I, ii, II, any diminished, V, really any chord)
  // # index 8
  "IV MAJ": {
    IV: [5, 9, 0],
    "IV#7": [5, 9, 0, 4]
  },
  // # V (I, #Vd, vi, viid, IV, some weight to I dom)
  // # index 9
  "V DOM": {
    V: [7, 11, 2],
    V6: [7, 11, 2, 4],
    V7: [7, 11, 2, 5]
  },
  // # v (to IV, possibly iii)
  // # index 10
  "V MIN": {
    v: [7, 10, 2],
    v6: [7, 10, 2, 4],
    v7: [7, 10, 2, 5]
  },
  // # #V dim (to vi or another diminished)
  // # index 11
  "#V DIM": {
    "#vb5": [8, 11, 2],
    "#v7b5": [8, 11, 2, 5]
  },
  // # vi (to any normal chord, vii d)
  // # index 12
  "VI MIN": {
    vi: [9, 0, 4],
    vi7: [9, 0, 4, 7],
    vi97: [9, 0, 4, 7, 11],
    vi9: [9, 0, 4, 11]
  },
  // # VI (to ii or II or modulate so it's the  new I)
  // # index 13
  "VI DOM": {
    VI: [9, 1, 4]
  },
  // # vii dim (to I or vi or another diminished)
  // # index 14
  "VII DIM": {
    viid: [11, 2, 5],
    viid7: [11, 2, 5, 8],
    viid7c: [11, 2, 5, 8, 0]
  }

  // # bill evans
  // # fred hurst

  // #modal interchange
  // #flat 6

  // # any time maj 7, go min 3 step up and keep maj 7

  // # think about 2 5 1
  // # tritone substitions, can be differemt chord quality (maj 7 instead of dom).

  // #V chord substititions
  // #ii to flat 2 dominant (has a 9 and 13)

  // # flat vii dominant
  // # go in from 2 or 4 goes to 1

  // # surprise instead of 1 (go from 4) flat 5 half diminished
  // # into minor 4 to 1
};
export const notes = [
  "a",
  "a#",
  "b",
  "c",
  "c#",
  "d",
  "d#",
  "e",
  "f",
  "f#",
  "g",
  "g#"
];
export const chordDictionary = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  "major 7": [0, 4, 7, 11],
  "minor 7": [0, 3, 7, 10],
  "dominant 7": [0, 4, 7, 10],
  "minor 7 b5": [0, 3, 6, 10],
  "fully diminished": [0, 3, 6, 9],
  diminished: [0, 3, 6],
  augmented: [0, 4, 8],
  "augmented 7": [0, 4, 8, 10],
  "sus 4": [0, 5, 7],
  "sus 2": [0, 2, 7],
  "sus 4 7": [0, 5, 7, 11],
  "sus 2 7": [0, 4, 8, 11],
  "sus 4 b7": [0, 5, 7, 10],
  "sus 2 b7": [0, 4, 8, 10]
};
export const extensionMap = {
  none: [],
  9: [14],
  b9: [13],
  "#9": [15],
  6: [9],
  b6: [8],
  sus: [5],
  sus6: [5, 9],
  11: [16],
  69: [9, 14],
  911: [14, 16]
};
export const noteDegree = [
  "I",
  "#I",
  "II",
  "#II",
  "III",
  "IV",
  "#IV",
  "V",
  "#V",
  "VI",
  "#VI",
  "VII"
];
