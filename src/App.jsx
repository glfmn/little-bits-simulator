import React, { Component } from 'react';
import Bits from './component/Bits';
import Bargraph from './component/Bargraph';
import Dimmer from './component/Dimmer';
import Simulator from './Simulator'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class App extends Component {
    render() {
    return (
        <div className="app">
            Little Bits Simulator
            <DndProvider backend={HTML5Backend}>
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
                    <p>Drag and Drop these components into the simulator</p>
                    <Bits bits={[<Bargraph />, <Dimmer />]}/>
                </footer>
            </DndProvider>
        </div>
    );
    }
}

export default App;
