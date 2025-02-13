import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import pageList from "./pages/pageList";

// 需依據部屬環境設定 URL
const getPublicURL = process.env.PUBLIC_URL
const basename = process.env.DEPLOY_TARGET === "github" ? "/mock-data-generate" : getPublicURL;

function App() {
  return (
    <div className="App">
      <Router basename={basename}>
        <Routes>
          {pageList.map((pageItem, index) => (
            <Route
              key={index}
              path={pageItem.path}
              element={<pageItem.componentName />}
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
