import React, { Component } from "react";

import NavBar from "./components/navigation/navbar";
import ErrorBoundary from "./components/Error/ErrorBoundary";
import Error from "./components/Error/error";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <NavBar />
        </ErrorBoundary>
        {/* <ErrorBoundary>
          <Error />
        </ErrorBoundary> */}
      </div>
    );
  }
}

export default App;
