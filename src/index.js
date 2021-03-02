import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faPlus,
  faMinus
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from "react-bootstrap/dropdownbutton";
import Dropdown from "react-bootstrap/dropdown";
import Button from "react-bootstrap/button";
import {
  notes,
  chordDictionary,
  extensionMap,
  noteDegree
} from './chords.js';
import { 
  progressionLogic,
  getRandomInt
 } from './logic.js';

const c1 = new AudioContext();
const c2 = new AudioContext();
const c3 = new AudioContext();
const c4 = new AudioContext();
const c5 = new AudioContext();
const o1 = c1.createOscillator();
const o2 = c2.createOscillator();
const o3 = c3.createOscillator();
const o4 = c4.createOscillator();
const o5 = c5.createOscillator();
const contextList = [c1, c2, c3, c4, c5];
const oscillatorList = [o1, o2, o3, o4, o5];
const g1 = c1.createGain();
const g2 = c2.createGain();
const g3 = c3.createGain();
const g4 = c4.createGain();
const g5 = c5.createGain();
const gainList = [g1, g2, g3, g4, g5];


class Chord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      isShuffling: false,
      chordProgression: [],
      chordDegreeList: [],
      chordNames: [],
      chordNameParseList: [],
      chordType: "major",
      rootNote: "c",
      extension: "none",
      currentIndex: 0,
      songKey: "c",
      volume: .1,
      spice: 2//0,1,2
      // a: new AudioContext(),
      // b: new AudioContext(),
      // c: new AudioContext(),
      // d: new AudioContext(),
      // e: new AudioContext(),
      // oscillatorList: [
      //   this.state.a,
      //   this.state.b,
      //   this.state.c,
      //   this.state.d,
      //   this.state.e
      // ],
      // c1: new AudioContext(),
      // c2: new AudioContext(),
      // c3: new AudioContext(),
      // c4: new AudioContext(),
      // c5: new AudioContext(),
      // o1: c1.createOscillator(),
      // o2: c2.createOscillator(),
      // o3: c3.createOscillator(),
      // o4: c4.createOscillator(),
      // o5: c5.createOscillator(),
      // contextList: [this.c1, this.c2, this.c3, this.c4, this.c5],
      // oscillatorList: [this.o1, this.o2, this.o3, this.o4, this.o5]
      // context: new AudioContext()
    };
  }

  chordChoiceAlgorithm() {
    if(this.state.chordDegreeList.length>0){
      const currentChord = this.state.chordDegreeList[this.state.currentIndex-1];
    console.log(currentChord);
    const nextChordDegreeChoice = progressionLogic(currentChord, this.state.chordDegreeList.slice(0,this.state.currentIndex));
    this.selectChordFromChoice(nextChordDegreeChoice);
    }else{
      this.chordType("major");
    this.rootNote("c");
    this.extensionType("none");
    }
    
  }
  selectChordFromChoice(chordChoice){
    const parsedChord = chordChoice.split(" ");
    let rootNote = notes[noteDegree.indexOf(parsedChord[0])];
    rootNote = notes[(notes.indexOf(this.state.songKey)+notes.indexOf(rootNote))%12];
    let chordType = '';
    let extension = '';
    let chordTypeOptions = [];
    let extensionOptions = [];
    

    switch(parsedChord[1]){
      case 'MAJ':
        if(this.state.spice === 0){
          chordTypeOptions = ['major', 'major 7'];
        } else {
          chordTypeOptions = ['major', 'major 7', 'sus 2', 'sus 2 7'];
          if(this.state.spice === 3){
            extensionOptions = ['none', '9','6','b6'];
          } else{
            extensionOptions = ['none', '9', '6'];
          }
        }
        break;
      case 'MIN':
        if(this.state.spice === 0){
          chordTypeOptions = ['minor', 'minor 7'];
        } else {
          chordTypeOptions = ['minor', 'minor 7', 'sus 2', 'sus 2 b7'];
          if(this.state.spice === 3){
            extensionOptions = ['none', '9','6','b6'];
          } else{
            extensionOptions = ['none', '9', '6'];
          }
        }
        break;
      case 'DIM': 
        if(this.state.spice === 0){ //choose different chord
          chordTypeOptions = ['diminished'];
        } else {
          chordTypeOptions = ['minor 7 b5', 'fully diminished', 'dimished'];
          if(this.state.spice === 3){
            extensionOptions = ['none', '9','b9','#9','b6'];
          } else{
            extensionOptions = ['none', '9'];
          }
        }
        break;
      case 'DOM':
        if(this.state.spice === 0){
          chordTypeOptions = ['major', 'dominant 7'];
        } else {
          chordTypeOptions = ['major', 'dominant 7', 'sus 2', 'sus 2 b7', 'sus 4', 'sus 4 b7', ];
          if(this.state.spice === 3){
            extensionOptions = ['none', '9','b9','#9','6','b6'];
          } else{
            extensionOptions = ['none', '9', '6'];
          }
        }
        break;
      default:
        break;
    }
    chordType = chordTypeOptions[getRandomInt(chordTypeOptions.length-1)];
    extension = extensionOptions[getRandomInt(extensionOptions.length-1)];

    this.setState({rootNote : rootNote});
    this.setState({chordType : chordType})
    this.setState({extension : extension})
  }

  refreshApp() {
    this.setState({
      isPlaying: false,
      isShuffling: false,
      chordProgression: [],
      chordNames: [],
      chordNameParseList: [],
      chordType: "major",
      rootNote: "c",
      extension: "none",
      currentIndex: 0
    });
  }

  chordToList() {
    
    const noteIndex = notes.indexOf(this.state.rootNote);
    const chord = chordDictionary[this.state.chordType];
    
    const extendedChord = chord.concat(extensionMap[this.state.extension]);
    return extendedChord.map(x => x + noteIndex);
  }

  chordToDegree() {
    const noteIndex = notes.indexOf(this.state.rootNote);
    const keyIndex = notes.indexOf(this.state.songKey);
    const numDifference = (noteIndex-keyIndex)%12;
    let chordDegree = ''
    switch(numDifference){
      case 0:
        chordDegree = 'I ';
        break;
      case 1:
        chordDegree = '#I ';
        break;
      case 2:
        chordDegree = 'II ';
        break;
      case 3:
        chordDegree = '#II ';
        break;
      case 4:
        chordDegree = 'III ';
        break;
      case 5:
        chordDegree = 'IV ';
        break;
      case 6:
        chordDegree = '#IV ';
        break;
      case 7:
        chordDegree = 'V ';
        break;
      case 8:
        chordDegree = '#V ';
        break;
      case 9:
        chordDegree = 'VI ';
        break;
      case 10:
        chordDegree = '#VI ';
        break;
      case 11:
        chordDegree = 'VII ';
        break;
      default:
        break;
    }
    switch(this.state.chordType){
      case "major":
        chordDegree += 'MAJ';
        break;
      case "minor":
        chordDegree += 'MIN';
        break;
      case 'major 7':
        chordDegree += 'MAJ';
        break;
      case "minor7":
        chordDegree += 'MIN';
        break;
      case 'dominant 7':
        chordDegree += 'DOM';
        break;
      case "minor 7 b5":
        chordDegree += 'DIM';
        break;
      case 'fully diminished':
        chordDegree += 'DIM';
        break;
      case 'diminished':
        chordDegree += 'DIM';
        break;
      case 'augmented':
        chordDegree += 'AUG';
        break;
      case "augmented 7":
        chordDegree += 'AUG';
        break;
      case "sus 4":
        chordDegree += 'MAJ';
        break;
      case "sus 2":
        chordDegree += 'MAJ';
        break;
      case "sus 4 7":
        chordDegree += 'MAJ';
        break;
      case "sus 2 7":
        chordDegree += 'MAJ';
        break;
      case "sus 4 b7":
        chordDegree += 'DOM';
        break;
      case "sus 2 b7":
        chordDegree += 'DOM';
        break;
      default:
        break;
    }
    return chordDegree;
  }

  newChord() {
    // set parsed list to include new chord

    const chordNameParsed = [
      this.state.rootNote,
      this.state.chordType,
      this.state.extension
    ];
    const chordNameParseList = this.state.chordNameParseList.slice();
    chordNameParseList[this.state.currentIndex] = chordNameParsed;
    this.setState({ chordNameParseList: chordNameParseList });

    // set chord name list to include new chord
    const newExtension =
      this.state.extension === "none" ? "" : this.state.extension;
    const newChord = [
      this.state.rootNote + " " + this.state.chordType + " " + newExtension
    ];
    const chordNames = this.state.chordNames.slice();
    chordNames[this.state.currentIndex] = newChord;
    this.setState({ chordNames: chordNames });

    // set chord note-number value list to include new chord
    const chordProgression = this.state.chordProgression.slice();
    const chordDegreeList = this.state.chordDegreeList.slice();
    chordDegreeList[this.state.currentIndex] = this.chordToDegree();

    chordProgression[this.state.currentIndex] = this.chordToList();
    this.setState({ chordProgression: chordProgression });
    this.setState({ chordDegreeList: chordDegreeList });

    // increment index
    this.incrementIndex();

    //set current parameters to
    this.resetChord();
    if (this.state.isPlaying === true) {
      this.playPauseBoolean();
      this.playChord();
    }
  }

  chordType(type) {
    this.setState({ chordType: type });
  }
  rootNote(note) {
    this.setState({ rootNote: note });
  }
  extensionType(type) {
    this.setState({ extension: type });
  }
  incrementIndex() {
    const newIndex = this.state.currentIndex + 1;
    this.setState({ currentIndex: newIndex });
  }

  resetChord() {
    if (this.state.currentIndex + 1 >= this.state.chordNames.length) {
      this.shuffleChord();
    } else {
      this.chordType(
        this.state.chordNameParseList[this.state.currentIndex + 1][1]
      );
      this.rootNote(
        this.state.chordNameParseList[this.state.currentIndex + 1][0]
      );
      this.extensionType(
        this.state.chordNameParseList[this.state.currentIndex + 1][2]
      );
    }

    // this.incrementIndex();
  }

  //implement me
  shuffleChord() {
    // this.chordType("major");
    // this.rootNote("c");
    // this.extensionType("none");
    this.chordChoiceAlgorithm();
    console.log(this.state.rootNote, this.state.chordType, this.state.extension)
    //
  }

  goToChord(index) {
    this.setState({ currentIndex: index });
    this.setChordToIndex(index);
    
  }

  setChordToIndex(index) {
    this.setState({
      rootNote: this.state.chordNameParseList[index][0]
    });
    this.setState({
      chordType: this.state.chordNameParseList[index][1]
    });
    this.setState({
      extension: this.state.chordNameParseList[index][2]
    });
  }

  renderChordList() {
    const listItems = this.state.chordNames.map((number, index) =>
      <Button
        className="button-box-3"
        onClick={() => this.goToChord(index)}
        variant={index === this.state.currentIndex ? "warning" : "secondary"}
      >
        {number}
      </Button>
    );
    return listItems;
  }

  chordValuesToFrequencyList() {
    const chordValues = this.chordToList();
    const freqList = [];
    if (chordValues === undefined) {
      return freqList;
    }
    // if (this.state.currentIndex > chordValues.length) {
    //   return freqList;
    // }

    for (let i = 0; i < chordValues.length; i++) {
      freqList[i] = this.noteValueToFrequency(chordValues[i] + 57);
    }
    return freqList;
  }

  noteValueToFrequency(noteValue) {
    const midi = noteValue;
    const freq = Math.pow(2, (midi - 69) / 12) * 440;
    return freq;
  }
setVolume(){
  const input = document.getElementById("volume");
  const volume = input.value;
  const volumePercent = volume/100;
  if(this.state.volume !== volumePercent && this.isPlaying===true){
    this.setState({volume:volumePercent});
    this.playChord();
  }
  console.log(volumePercent);
}
  //implement me
  playChord() {
  
    const frequencyList = this.chordValuesToFrequencyList();
    for (let i = 0; i < oscillatorList.length; i++) {
      if (i >= frequencyList.length) {
        
      } 
      else {
        oscillatorList[i].connect(gainList[i]);
        // gainList[i].connect(contextList[i].destination);
        // gainList[i].gain.value = this.state.volume;
        oscillatorList[i].type = 'sine';
        oscillatorList[i].frequency.value = frequencyList[i];
        
        try{
          // gainList[i].gain.cancelScheduledValues(contextList[i].currentTime);
          gainList[i].gain.setValueAtTime(contextList[i].currentTime, 0);
          // set our attack
          gainList[i].gain.linearRampToValueAtTime(this.state.volume, .5);
          // set our release
          // gainList[i].gain.linearRampToValueAtTime(0, time + sweepLength - releaseTime);

          oscillatorList[i].connect(gainList[i]).connect(contextList[i].destination);
          
          // oscillatorList[i].stop(1);
          // oscillatorList[i].stop();
          // oscillatorList[i].start();
        }catch{
          // oscillatorList[i].start();
        }
        try{oscillatorList[i].start();}catch{}
      }
      // oscillatorList[i] = contextList[i].createOscillator();
    }
    
    this.playPauseBoolean();
  }

  playOrPause(){
    if(this.state.isPlaying===true){
      this.pauseChord();
    }else{
      this.playChord();
    }
  }

  

  pauseChord() {

    for (let i = 0; i < oscillatorList.length; i++) {

        oscillatorList[i].connect(gainList[i]);
        gainList[i].connect(contextList[i].destination);
        gainList[i].gain.value = this.state.volume;
        try{gainList[i].gain.exponentialRampToValueAtTime(
          0.00001, contextList[i].currentTime + .5
        );
      }
        catch{
        }
          
  }
this.playPauseBoolean();
}

  playPauseBoolean() {
    const bool = this.state.isPlaying;
    this.setState({ isPlaying: !bool });
  }

  deleteChord() {
    const index = this.state.currentIndex;
    this.state.chordNameParseList.splice(index, 1);
    this.state.chordProgression.splice(index, 1);
    this.state.chordNames.splice(index, 1);
    this.resetChord();
  }

  render() {
    return (
      <div className="center">
        <div className="button-box">
          <DropdownButton
            id="dropdown-basic-button"
            title={this.state.rootNote}
          >
            <Dropdown.Item onClick={() => this.rootNote("a")}>A</Dropdown.Item>
            <Dropdown.Item onClick={() => this.rootNote("a#")}>
              A#
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.rootNote("b")}>B</Dropdown.Item>
            <Dropdown.Item onClick={() => this.rootNote("c")}>C</Dropdown.Item>
            <Dropdown.Item onClick={() => this.rootNote("c#")}>
              C#
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.rootNote("d")}>D</Dropdown.Item>
            <Dropdown.Item onClick={() => this.rootNote("d#")}>
              D#
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.rootNote("e")}>E</Dropdown.Item>
            <Dropdown.Item onClick={() => this.rootNote("f")}>F</Dropdown.Item>
            <Dropdown.Item onClick={() => this.rootNote("f#")}>
              F#
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.rootNote("g")}>G</Dropdown.Item>
            <Dropdown.Item onClick={() => this.rootNote("g#")}>
              G#
            </Dropdown.Item>
          </DropdownButton>

          <DropdownButton
            id="dropdown-basic-button"
            title={this.state.chordType}
          >
            <Dropdown.Item onClick={() => this.chordType("major")}>
              major
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.chordType("minor")}>
              minor
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.chordType("major 7")}>
              major 7
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.chordType("minor 7")}>
              minor 7
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.chordType("dominant 7")}>
              dominant 7
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.chordType("sus 4")}>
              sus(4)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.chordType("sus 4 7")}>
              sus(4) maj7
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.chordType("sus 4 b7")}>
              sus(4) dom7
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.chordType("sus 2")}>
              sus(2)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.chordType("sus 2 7")}>
              sus(2) maj7
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.chordType("sus 2 b7")}>
              sus(2) min7
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.chordType("diminished")}>
              diminished
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.chordType("minor 7 b5")}>
              minor 7 b5
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.chordType("fully diminished")}>
              fully diminished
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.chordType("augmented")}>
              augmented
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.chordType("augmented 7")}>
              augmented 7
            </Dropdown.Item>
          </DropdownButton>

          <DropdownButton
            id="dropdown-basic-button"
            title={this.state.extension === "none" ? "" : this.state.extension}
            // variant="info"
          >
            <Dropdown.Item onClick={() => this.extensionType("none")}>
              none
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.extensionType("9")}>
              9
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.extensionType("b9")}>
              b9
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.extensionType("#9")}>
              #9
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.extensionType("6")}>
              6
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.extensionType("b6")}>
              b6
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.extensionType("9")}>
              9
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.extensionType("b9")}>
              b9
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.extensionType("#9")}>
              #9
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="slider-wrapper">
        <input 
          type="range" 
          // className="custom-range"
          id="volume"
          min="0" max="20" 
          step="2"
          defaultValue="2"
          // value="5"
          onInput={this.setVolume.bind(this)}
         />
        </div>
        <div className="new-line" />
        {/* <div className="button-box-2">
          <Button variant="white">
            <FontAwesomeIcon
              icon={this.rollDice()}
              onClick={() => this.shuffleChord()}
              onClick={() =>
                this.setState({ isShuffling: !this.state.isShuffling })}
            />
          </Button>
        </div> */}
        <div className="button-box-2">
          <Button variant="#white" onClick={() => this.deleteChord()}>
            <FontAwesomeIcon icon={faMinus} />
          </Button>
          <Button variant="white" onClick={() => this.newChord()}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
        <div className="button-box-2">
          <Button variant="white">
            <FontAwesomeIcon
              icon={this.state.isPlaying !== true ? faPlay : faPause}
              onClick={() => this.playOrPause()}
            />
          </Button>
        </div>
        

        {/* <div className="button-box-2">
          <Button variant="brown">
            <FontAwesomeIcon
              icon={faToilet}
              onMouseDown={() => this.refreshApp()}
            />
          </Button>
        </div> */}
        <div className="item-list">
          {this.renderChordList()}
        </div>
      </div>
    );
  }
}
//add new row with plus (which then turns into minus)
//render row list from historical record that keeps track of all chords
ReactDOM.render(<Chord />, document.getElementById("root"));
