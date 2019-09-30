import React, { Component } from 'react';

class Bits extends Component {

    render() {
        return (
          <ul className="Bits">
            {this.props.bits.map((bit) => (<li> {bit} </li>))}
          </ul>
        );
    }
}

export default Bits;
