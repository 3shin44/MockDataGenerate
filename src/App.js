import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import pageList from "./pages/pageList";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        {
          pageList.map((pageItem, index)=>(
            <Route 
            key={index}
            path={pageItem.path}
            element={<pageItem.componentName />}
            />
          ))
        }
      </Routes>
    </Router>
    </div>
  );
}

export default App;
