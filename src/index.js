import React from "react";
import reactDom from "react-dom";

import "./index.css";
import ChordSelectButtons from "./ChordSelectButtons";

function App() {
  return <ChordSelectButtons />;
}

reactDom.render(<App />, document.getElementById("root"));
