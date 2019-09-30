import React, { Component } from 'react';
import Bits from './component/Bits';

class App extends Component {
  render() {
    return (
      <div className="app">
        Little Bits Simulator
        <main>
            <Bits/>
        </main>
      </div>
    );
  }
}

export default App;
