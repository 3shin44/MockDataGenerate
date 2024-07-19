import React, { useState } from "react";

function EntryPage() {
  let [count, setCount] = useState(0);

  const addCount = () => {
    setCount(++count);
  };

  return (
    <div>
      <div>THIS IS ENTRY PAGE</div>
      <button onClick={addCount}>CLICK ME: {count}</button>
    </div>
  );
}

export default EntryPage;
