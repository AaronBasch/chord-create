import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/dropdownbutton";
import Dropdown from "react-bootstrap/dropdown";
import Button from "react-bootstrap/button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PredictNextChord from "./logic.js";

const ChordSelectButtons = () => {
  const notes = [
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
  const chordTypes = [
    "major",
    "minor",
    "major 7",
    "dominant 7",
    "minor 7",
    "minor 7 b5",
    "diminished",
    "fully diminished",
    "augmented",
    "sus 2",
    "sus 4",
    "sus 2 maj7",
    "sus 4 maj7",
    "sus 2 b7",
    "sus 4 b7"
  ];
  const extensions = ["9", "6", "11", "69", "7b5", "b9", "#9", "b6"];

  const [root, setRoot] = useState("c");
  const [type, setType] = useState("major");
  const [ext, setExt] = useState("7");

  const [key, setKey] = useState("c");
  const [spice, setSpice] = useState(2);

  const [currentChord, setCurrentChord] = useState(["c", "major", "7"]);
  const [prevChord, setPrevChord] = useState(["c", "major", "7"]);
  const [currentID, setCurrentID] = useState(0);

  const [chordList, setChordList] = useState([]);

  const [nextChord, setNextChord] = useState(
    PredictNextChord(currentChord, prevChord, key, spice)
  );

  // useEffect -> when chord list is updated, update screen's list of chords & give suggestions for next chord
  useEffect(() => {
    //take current chord
    // nextChord = PredictNextChord(currentChord, prevChord, key, spice);
    setRoot(nextChord[0]);
    setType(nextChord[1]);
    setExt(nextChord[2]);
  }, [nextChord]);

  const removeChord = () => {
    let newChordList = chordList.filter((chord) => chord.id !== currentID);

    return newChordList;
  };

  const addChord = () => {
    setPrevChord(currentChord);
    setCurrentChord([root, type, ext]);
    let beginList = chordList.slice(0, currentID);
    let endList = chordList.slice(currentID + 1, chordList.length);
    let newList = beginList
      .concat({ id: currentID, chord: currentChord, prev: prevChord })
      .concat(endList);
    setChordList(
      newList
      // chordList.concat({ id: id, chord: currentChord, prev: prevChord })
    );
    setNextChord(PredictNextChord(currentChord, prevChord, key, spice));
    setCurrentID(currentID + 1);
    // resetParameters(); //set button parameters based on algorithm
  };

  const handleChordClick = (element) => {
    setCurrentID(element.id);
    setCurrentChord(element.chord);
    setPrevChord(element.prev);
  };
  useEffect(() => {
    console.log("current chord: ", currentChord);
  }, [currentID, currentChord, prevChord]);

  const chordToName = (chordAsArray) => {
    return chordAsArray[0] + " " + chordAsArray[1] + " " + chordAsArray[2];
  };

  const DropdownList = (props) => {
    const listItems = props.elements.map((element, index) => (
      <Dropdown.Item
        type="button"
        onClick={() => props.setter(element)}
        key={index}
      >
        {element}
      </Dropdown.Item>
    ));
    return listItems;
  };

  const ChordButtonsRenderer = (props) => {
    const listChordNames = props.list.map((element, index) => (
      <Button
        type="button"
        onClick={() => handleChordClick(element)}
        key={index}
        variant={element.id === currentID ? "warning" : "success"}
      >
        {chordToName(element.chord)}
      </Button>
    ));
    return listChordNames;
  };

  return (
    <>
      <h1 className="chordSelectButtons">
        <DropdownButton title={currentChord[0]}>
          <DropdownList elements={notes} setter={setRoot} />
        </DropdownButton>
        <DropdownButton title={currentChord[1]}>
          <DropdownList elements={chordTypes} setter={setType} />
        </DropdownButton>
        <DropdownButton title={currentChord[2]}>
          <DropdownList elements={extensions} setter={setExt} />
        </DropdownButton>

        <>{console.log(chordList)}</>
        <Button>
          <FontAwesomeIcon icon={faPlus} onClick={() => addChord()} />
        </Button>
      </h1>
      <h2>
        <ChordButtonsRenderer list={chordList} />
      </h2>
    </>
  );
};

export default ChordSelectButtons;
