import "./chords.js";
export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
export function progressionLogic(index, indeces) {
  let newIndex = "";
  let options = [];
  //   let currIndex = indeces[index];
  let prevIndex = indeces[index - 1];
  switch (index) {
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
      newIndex = options[getRandomInt(options.length - 1)];
      if (newIndex === prevIndex)
        newIndex = options[getRandomInt(options.length - 1)];
      break;
    case "I DOM":
      newIndex = "IV MAJ";
      break;
    case "#I DIM":
      newIndex = "II MIN";
      break;
    case "II MIN":
      options = ["I MAJ", "II DIM", "III MIN", "IV MAJ", "V DOM", "VI MIN"];
      newIndex = options[getRandomInt(options.length - 1)];
      if (newIndex === prevIndex)
        newIndex = options[getRandomInt(options.length - 1)];
      break;
    case "II DIM":
      options = ["I MAJ", "VI MIN", "#V DIM"];
      newIndex = options[getRandomInt(options.length - 1)];
      if (newIndex === prevIndex)
        newIndex = options[getRandomInt(options.length - 1)];
      break;
    case "II DOM":
      options = ["II MIN", "IV MAJ", "V DOM"];
      newIndex = options[getRandomInt(options.length - 1)];
      if (newIndex === prevIndex)
        newIndex = options[getRandomInt(options.length - 1)];
      break;
    case "III MIN":
      options = ["III DOM", "II MIN", "IV MAJ", "VI MIN"];
      newIndex = options[getRandomInt(options.length - 1)];
      if (newIndex === prevIndex)
        newIndex = options[getRandomInt(options.length - 1)];
      break;
    case "III DOM":
      options = ["IV MAJ", "IV MAJ", "VI MIN", "VI MIN", "VI MAJ"];
      newIndex = options[getRandomInt(options.length - 1)];
      if (newIndex === prevIndex)
        newIndex = options[getRandomInt(options.length - 1)];
      break;
    case "IV MIN":
      options = ["I MAJ", "I MAJ", "III MIN"];
      newIndex = options[getRandomInt(options.length - 1)];
      if (newIndex === prevIndex)
        newIndex = options[getRandomInt(options.length - 1)];
      break;
    case "IV MAJ":
      options = ["I MAJ", "III MIN", "II DOM", "II MIN", "IV MIN", "V DOM"];
      newIndex = options[getRandomInt(options.length - 1)];
      if (newIndex === prevIndex)
        newIndex = options[getRandomInt(options.length - 1)];
      break;
    case "V DOM":
      options = ["I MAJ", "II MIN", "IV MAJ", "#V DIM", "VI MIN", "VII DIM"];
      newIndex = options[getRandomInt(options.length - 1)];
      if (newIndex === prevIndex)
        newIndex = options[getRandomInt(options.length - 1)];
      break;
    case "V MIN":
      options = ["IV MAJ", "IV MAJ", "III MIN"];
      newIndex = options[getRandomInt(options.length - 1)];
      if (newIndex === prevIndex)
        newIndex = options[getRandomInt(options.length - 1)];
      break;
    case "#V DIM":
      options = ["VI MIN"];
      newIndex = options[getRandomInt(options.length - 1)];
      if (newIndex === prevIndex)
        newIndex = options[getRandomInt(options.length - 1)];
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
      newIndex = options[getRandomInt(options.length - 1)];
      if (newIndex === prevIndex)
        newIndex = options[getRandomInt(options.length - 1)];
      break;
    case "VI DOM":
      options = ["II MIN", "II DOM"];
      newIndex = options[getRandomInt(options.length - 1)];
      if (newIndex === prevIndex)
        newIndex = options[getRandomInt(options.length - 1)];
      break;
    case "VII DIM":
      options = ["I MAJ", "VI MIN", "#V DIM"];
      newIndex = options[getRandomInt(options.length - 1)];
      if (newIndex === prevIndex)
        newIndex = options[getRandomInt(options.length - 1)];
      break;
    default:
      newIndex = index;
      break;
  }
  return newIndex;
}
