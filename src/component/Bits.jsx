import React, { Component } from 'react';
import Bargraph from './Bargraph';

class Bits extends Component {
    state = {
        bits: [
            'bar graph',
            'dial',
            'speaker'
        ]
    }

    render() {
        return (
          <ul className="Bits">
            {this.state.bits.map((bit) => (<li> {bit} </li>))}
          </ul>
        );
    }
}

export default Bits;
