import React, { Component } from 'react';
import Bits from './component/Bits';
import Bargraph from './component/Bargraph'
import Simulator from './Simulator'

class App extends Component {
  render() {
    return (
        <div className="app">
            Little Bits Simulator
            <main>
                <Simulator root={<Bargraph />}/>
            </main>
            <footer>
                <Bits bits={[<Bargraph />]}/>
            </footer>
        </div>
    );
  }
}

export default App;
