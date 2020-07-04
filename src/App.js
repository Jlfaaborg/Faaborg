import React from "react";
import "./css/App.css";
import "./LoginPage";
import LoginPage from "./LoginPage";
import Header from "./partials/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <LoginPage />
    </div>
  );
}

export default App;
