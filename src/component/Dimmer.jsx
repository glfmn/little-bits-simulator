import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Frame} from "../Simulator";

class Dimmer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dimmer: 0.5,
        };
        this.setDimmer = this.setDimmer.bind(this);
    }

    setDimmer(dimmer) {
        this.setState({ dimmer: parseFloat(dimmer) });
    }

    render() {
        const dragPayload = {props: {...this.props, children: null}, astType: Dimmer};
        let Child = this.props.children;
        const { voltage, hideInterlock } = this.props;
        const { dimmer } = this.state;
        const label = <Range className='dimmer-range' min={0} max={1} value={dimmer} update={this.setDimmer}/>;
        return (<Frame hideInterlock={hideInterlock}
                       widget={<Dial dial={10 + 350 * dimmer}/>}
                       label={label}
                       dragPayload={dragPayload}
                       color={'#CB0D96'}>
            {Child && <Child.type {...Child.props} voltage={voltage * dimmer} hideInterlock={true}/>}
        </Frame>);
    }
}

Dimmer.propTypes = {
    voltage: PropTypes.number,
    hideInterlock: PropTypes.bool,
    children: PropTypes.element,
}

class Range extends Component {
    constructor(props) {
        super(props);
        this.updateRange = this.updateRange.bind(this)
    }

    updateRange(e) {
        this.props.update(e.target.value);
    }

    render() {
        const { value, min, max, className } = this.props;
        return (
            <input type='range'
                   className={className}
                   name='range'
                   style={{width: '100%'}}
                   min={min}
                   max={max}
                   step='any'
                   value={value}
                   onChange={this.updateRange}/>
        );
    }
}

Range.propTypes = {
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    update: PropTypes.func,
}

function Dial(props) {
    const background = {
        fill: '#FFF',
        stroke: '#000',
    };
    const greeble = {
        fill: '#000',
        stroke: 'none',
    }
    const notch = {
        fill: '#f0f0f0',
        stroke: 'none',
    }
    return (<g>
        <g transform="rotate(90, 73.3329, 30.8021)" id="svg_22">
            <rect style={greeble} height="8.4" width="2.3" y="26.602148" x="80.39823"/>
            <rect style={greeble} height="8.4" width="2.3" y="26.602148" x="74.954675"/>
            <rect style={greeble} height="8.4" width="2.3" y="26.602148" x="69.511121"/>
            <rect style={greeble} height="8.4" width="2.3" y="26.602148" x="63.967566"/>
        </g>
        <rect style={background} height="37.494141" width="42.002931" y="11.383537" x="29.308191"/>
        <ellipse style={greeble} ry="1.661133" rx="1.661133" cy="15.25457" cx="67.859081"/>
        <ellipse style={greeble} ry="1.661133" rx="1.661133" cy="45.219238" cx="32.593735"/>
        <g transform={`rotate(${props.dial}, 51.1981, 30.9031)`}>
            <ellipse style={greeble} ry="11.012421" rx="11.012421" id="svg_27" cy="30.903092" cx="51.064577"/>
            <rect style={notch} id="svg_30" height="1.70192" width="11.123825" y="30.335785" x="40.552721"/>
        </g>
    </g>)
}

export default Dimmer;
