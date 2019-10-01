import React, { Component } from 'react';

class Bits extends Component {

    render() {
        return (
          <ul className="Bits" style={{display: 'flex', listStyleType: 'none'}}>
            {this.props.bits.map((bit) => (<li key={Math.random()}> {bit} </li>))}
          </ul>
        );
    }
}

export default Bits;
