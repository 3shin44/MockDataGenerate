import React, { useState } from 'react';


function EntryPage() {
    let [count, setCount] = useState(0)

    const addCount = () => {
        setCount(count++)
    }

    return (
        <button
            onClick={addCount}
        >
            CLICK ME: {count}
        </button>
    )
}

export default EntryPage