import React, { useState } from "react";

function ChangeStr() {
  // declare State data
  let [tempWord, setTempWord] = useState(0);
  let [resultWord, setResultWord] = useState(0);
  let [realtimeData, setRealtimeData] = useState(0);

  let saveData = "";

  // binding onChange event and update 'resultWord'
  const handleInput = (e) => {
    let { value } = e.target;
    saveData = value;
    setRealtimeData(value);
  };

  const updateAllData = () => {
    setTempWord("Hello");
    setResultWord(saveData);
  };

  const resetAllData = () => {
    setTempWord(0);
    setResultWord(0);
  };

  return (
    <div>
      <h2>Change the word</h2>
      <div>
        <input type="text" onChange={handleInput} />
      </div>

      <div>
        <button onClick={updateAllData}>CLICK ME</button>
        <button onClick={resetAllData}>RESET</button>
      </div>

      <div>{tempWord}</div>
      <div>{resultWord}</div>
      <div>{realtimeData}</div>
    </div>
  );
}

export default ChangeStr;
