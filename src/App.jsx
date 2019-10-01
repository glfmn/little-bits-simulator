//! The Simulation is driven by a voltage prop on each Little Bit
//!
//! Each bit uses it's voltage prop to calculate a new voltage prop
//! based on its internal state (like the Dimmer component) or use the voltage prop to
//! information (like the Bargraph component) or both.  Then, it passes its modified (or
//! unmodified) voltage prop to the child, harnessing React's uni-directional flow to
//! update the state of the simulation.  It ends up looking something like this:
//!
//! ```
//! function HalfVoltage({voltage, children}) {
//!     const v = voltage * 0.5;
//!     const Child = children;
//!     return <Frame>
//!       {Child && <Child.type {...child.props} voltage={v}>{Child.children}</Child.type>}
//!     </Frame>;
//! }
//! ```

import React from 'react';
import BitList from './BitList';
import Bargraph from './bits/Bargraph';
import Dimmer from './bits/Dimmer';
import Simulator from './Simulator'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

/// Simulate the operation of little bits
///
/// Provides a simulation environment and a handy list of bits to drag-and-drop into the sim.
/// The initial state of the simulation can be set simply by nesting Bits; refer to Simulator
/// for more details.
///
/// To understand the building blocks of the bits themselves, refer to Frame and look into
/// the code for the Dimmer and Bargraph bits.
///
/// The DndProvider gives access to hooks for drag-and-drop behaviour.
export default function App(props) {
    return (
        <div className="app">
            <header className="header">
                <h1>Little Bits Simulator</h1>
            </header>
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
