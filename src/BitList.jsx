import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function BitList(props) {
    return (
        <ul className="bit-list" style={{display: 'flex', listStyleType: 'none'}}>
            {props.bits.map((bit) => (<li className="bit-list__item" key={Math.random()}> {bit} </li>))}
        </ul>
    );
}

BitList.propTypes = {
    bits: PropTypes.arrayOf(PropTypes.element),
}
