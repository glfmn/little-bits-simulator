import React, { Component } from 'react';
import Bits from './component/Bits';
import Bargraph from './component/Bargraph';
import Dimmer from './component/Dimmer';
import Simulator from './Simulator'

class App extends Component {
    render() {
    return (
        <div className="app">
            Little Bits Simulator
            <main className="simulator">
                <Simulator>
                    <Dimmer>
                        <Bargraph>
                            <Dimmer>
                                <Bargraph/>
                            </Dimmer>
                        </Bargraph>
                    </Dimmer>
                </Simulator>
            </main>
            <footer className="bit-bar">
                <Bits bits={[<Bargraph />, <Dimmer />]}/>
            </footer>
        </div>
    );
    }
}

export default App;
