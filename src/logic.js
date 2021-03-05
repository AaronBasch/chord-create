import { notes, noteDegree } from "./chords.js";
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
const mod = (n, m) => {
  return ((n % m) + m) % m;
};
const progressionLogic = (curr, prev) => {
  let newChord = "";
  let options = [];

  switch (curr) {
    case "I MAJ":
      options = [
        "#I DIM",
        "I DOM",
        "II MIN",
        "II DIM",
        "II DOM",
        "III MIN",
        "III DOM",
        "IV MAJ",
        "V DOM",
        "IV MIN",
        "VI MIN"
      ];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    case "I DOM":
      newChord = "IV MAJ";
      break;
    case "#I DIM":
      newChord = "II MIN";
      break;
    case "II MIN":
      options = ["I MAJ", "II DIM", "III MIN", "IV MAJ", "V DOM", "VI MIN"];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    case "II DIM":
      options = ["I MAJ", "VI MIN", "#V DIM"];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    case "II DOM":
      options = ["II MIN", "IV MAJ", "V DOM"];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    case "II MAJ":
      options = ["II MIN", "IV MAJ", "V DOM"];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    case "III MIN":
      options = ["III DOM", "II MIN", "IV MAJ", "VI MIN"];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    case "III DOM":
      options = ["IV MAJ", "IV MAJ", "VI MIN", "VI MIN", "VI MAJ"];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    case "III MAJ":
      options = ["IV MAJ", "IV MAJ", "VI MIN", "VI MIN", "VI MAJ"];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    case "IV MIN":
      options = ["I MAJ", "I MAJ", "III MIN"];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    case "IV MAJ":
      options = ["I MAJ", "III MIN", "II DOM", "II MIN", "IV MIN", "V DOM"];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    case "V DOM":
      options = ["I MAJ", "II MIN", "IV MAJ", "#V DIM", "VI MIN", "VII DIM"];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    case "V MAJ":
      options = ["I MAJ", "II MIN", "IV MAJ", "#V DIM", "VI MIN", "VII DIM"];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    case "V MIN":
      options = ["IV MAJ", "IV MAJ", "III MIN"];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    case "#V DIM":
      options = ["VI MIN"];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    case "VI MIN":
      options = [
        "I MAJ",
        "I DOM",
        "#I DIM",
        "II MIN",
        "II DIM",
        "II DOM",
        "III MIN",
        "III DOM",
        "IV MAJ",
        "V DOM",
        "V MIN",
        "VII DIM"
      ];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    case "VI DOM":
      options = ["II MIN", "II DOM"];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    case "VI MAJ":
      options = ["II MIN", "II DOM"];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    case "VII DIM":
      options = ["I MAJ", "VI MIN", "#V DIM"];
      newChord = options[getRandomInt(options.length - 1)];
      if (newChord === prev)
        newChord = options[getRandomInt(options.length - 1)];
      break;
    default:
      newChord = prev;
      console.log("fail");
      break;
  }
  console.log(newChord);
  return newChord;
};

const selectChordFromChoice = (chordChoice, songKey, spice) => {
  const parsedChord = chordChoice.split(" ");
  let rootNote =
    notes[(notes.indexOf(songKey) + noteDegree.indexOf(parsedChord[0])) % 12];
  let chordType = "";
  let extension = "";
  let chordTypeOptions = [];
  let extensionOptions = [];
  switch (parsedChord[1]) {
    case "MAJ":
      if (spice === 0) {
        chordTypeOptions = ["major", "major 7"];
        extensionOptions = ["none"];
      } else {
        chordTypeOptions = ["major", "major 7", "sus 2", "sus 2 7"];
        if (spice === 3) {
          extensionOptions = ["none", "9", "6", "b6"];
        } else {
          extensionOptions = ["none", "9", "6"];
        }
      }
      break;
    case "MIN":
      if (spice === 0) {
        chordTypeOptions = ["minor", "minor 7"];
        extensionOptions = ["none"];
      } else {
        chordTypeOptions = ["minor", "minor 7", "sus 2", "sus 2 b7"];
        if (spice === 3) {
          extensionOptions = ["none", "9", "6", "b6"];
        } else {
          extensionOptions = ["none", "9", "6"];
        }
      }
      break;
    case "DIM":
      if (spice === 0) {
        //choose different chord
        chordTypeOptions = ["diminished"];
        extensionOptions = ["none"];
      } else {
        chordTypeOptions = ["minor 7 b5", "fully diminished", "diminished"];
        if (spice === 3) {
          extensionOptions = ["none", "9", "b9", "#9", "b6"];
        } else {
          extensionOptions = ["none", "9"];
        }
      }
      break;
    case "DOM":
      if (spice === 0) {
        chordTypeOptions = ["major", "dominant 7"];
        extensionOptions = ["none"];
      } else {
        chordTypeOptions = [
          "major",
          "dominant 7",
          "sus 2",
          "sus 2 b7",
          "sus 4",
          "sus 4 b7"
        ];
        if (spice === 3) {
          extensionOptions = ["none", "9", "b9", "#9", "6", "b6"];
        } else {
          extensionOptions = ["none", "9", "6"];
        }
      }
      break;
    default:
      break;
  }
  chordType = chordTypeOptions[getRandomInt(chordTypeOptions.length - 1)];
  extension = extensionOptions[getRandomInt(extensionOptions.length - 1)];

  return [rootNote, chordType, extension];
};

const chordToDegree = (chord, songKey) => {
  const noteIndex = notes.indexOf(chord[0]);
  const keyIndex = notes.indexOf(songKey);
  const numDifference = mod(noteIndex - keyIndex, 12);
  let chordDegree = "";
  switch (numDifference) {
    case 0:
      chordDegree = "I ";
      break;
    case 1:
      chordDegree = "#I ";
      break;
    case 2:
      chordDegree = "II ";
      break;
    case 3:
      chordDegree = "#II ";
      break;
    case 4:
      chordDegree = "III ";
      break;
    case 5:
      chordDegree = "IV ";
      break;
    case 6:
      chordDegree = "#IV ";
      break;
    case 7:
      chordDegree = "V ";
      break;
    case 8:
      chordDegree = "#V ";
      break;
    case 9:
      chordDegree = "VI ";
      break;
    case 10:
      chordDegree = "#VI ";
      break;
    case 11:
      chordDegree = "VII ";
      break;
    default:
      chordDegree = "I ";
      console.log("fail");
      break;
  }

  switch (chord[1]) {
    case "major":
      chordDegree += "MAJ";
      break;
    case "minor":
      chordDegree += "MIN";
      break;
    case "major 7":
      chordDegree += "MAJ";
      break;
    case "minor 7":
      chordDegree += "MIN";
      break;
    case "dominant 7":
      chordDegree += "DOM";
      break;
    case "minor 7 b5":
      chordDegree += "DIM";
      break;
    case "fully diminished":
      chordDegree += "DIM";
      break;
    case "diminished":
      chordDegree += "DIM";
      break;
    case "augmented":
      chordDegree += "AUG";
      break;
    case "augmented 7":
      chordDegree += "AUG";
      break;
    case "sus 4":
      chordDegree += "MAJ";
      break;
    case "sus 2":
      chordDegree += "MAJ";
      break;
    case "sus 4 maj7":
      chordDegree += "MAJ";
      break;
    case "sus 2 maj":
      chordDegree += "MAJ";
      break;
    case "sus 4 b7":
      chordDegree += "DOM";
      break;
    case "sus 2 b7":
      chordDegree += "DOM";
      break;
    default:
      break;
  }
  console.log(chordDegree);
  return chordDegree;
};

const PredictNextChord = (curr, prev, songKey) => {
  let prevDegree = chordToDegree(prev, songKey);
  let currDegree = chordToDegree(curr, songKey);

  let next = progressionLogic(currDegree, prevDegree);
  next = selectChordFromChoice(next, songKey);
  //
  return next;
};

export default PredictNextChord;
