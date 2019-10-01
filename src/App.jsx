import React, { Component } from 'react';
import BitList from './BitList';
import Bargraph from './bits/Bargraph';
import Dimmer from './bits/Dimmer';
import Simulator from './Simulator'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

export default function App(props) {
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
                    <p className="bit-bar__desc">Drag and Drop these components into the simulator</p>
                    <BitList bits={[<Bargraph />, <Dimmer />]}/>
                </footer>
            </DndProvider>
        </div>
    );
}
