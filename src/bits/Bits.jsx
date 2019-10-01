import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bits extends Component {

    render() {
        return (
            <ul className="bit-list" style={{display: 'flex', listStyleType: 'none'}}>
                {this.props.bits.map((bit) => (<li className="bit-list__item" key={Math.random()}> {bit} </li>))}
            </ul>
        );
    }
}

Bits.propTypes = {
    bits: PropTypes.arrayOf(PropTypes.element),
}

export default Bits;
