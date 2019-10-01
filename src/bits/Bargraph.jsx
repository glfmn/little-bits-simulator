import React from 'react';
import PropTypes from 'prop-types';
import Frame, {GREEN, ORANGE} from "../Frame";

/// Inspect the voltage and display as a bargraph
///
/// Display 5 bars from left to right depending on the magnitude of the voltage prop, 0.0
/// bars at 0 and 5 bars at 1.0.  Do not modify the voltage passed to the child.
export default function Bargraph(props) {
    const { voltage, hideInterlock } = props;
    let Child = props.children;
    const dragPayload = {props: {...props, children: null}, astType: Bargraph};

    // multiplying by 6 instead of 5 is more visually pleasing
    let barCount = Math.floor(6 * voltage);

    return (
        <Frame hideInterlock={hideInterlock}
               widget={<Bars color={ORANGE} barCount={barCount}/>}
               dragPayload={dragPayload}
               color={GREEN}>
            {Child && <Child.type {...Child.props} voltage={voltage} hideInterlock={true}/>}
        </Frame>
    );
}

Bargraph.propTypes = {
    voltage: PropTypes.number,
    hideInterlock: PropTypes.bool,
    children: PropTypes.element,
}

function Bars(props) {
    const unlitStyle = { fill: 'none', stroke: '#000000', strokeMiterlimit:10 };
    const litStyle = {
        fill: props.color? props.color: '#FF0000',
        stroke: '#000000',
        strokeMiterlimit: 10
    };
    const barCount = props.barCount;
    const barStyle = (count) => {
        return barCount > count? litStyle : unlitStyle;
    }
    return (<g>
        <rect x="23.0" y="21.7" style={barStyle(0)} width="5.4" height="13.8"/>
        <rect x="35.9" y="21.7" style={barStyle(1)} width="5.4" height="13.8"/>
        <rect x="48.7" y="21.7" style={barStyle(2)} width="5.4" height="13.8"/>
        <rect x="61.5" y="21.7" style={barStyle(3)} width="5.4" height="13.8"/>
        <rect x="74.4" y="21.7" style={barStyle(4)} width="5.4" height="13.8"/>
        <rect x="34.7" y="13.5" style={unlitStyle} width="7.9" height="2.9"/>
        <rect x="61.3" y="13.5" style={unlitStyle} width="7.9" height="2.9"/>
        <rect x="75.9" y="44.4" style={unlitStyle} width="2.3" height="8.4"/>
        <rect x="63.1" y="44.4" style={unlitStyle} width="2.3" height="8.4"/>
        <rect x="50.3" y="44.4" style={unlitStyle} width="2.3" height="8.4"/>
        <rect x="37.4" y="44.4" style={unlitStyle} width="2.3" height="8.4"/>
        <rect x="24.6" y="44.4" style={unlitStyle} width="2.3" height="8.4"/>
    </g>)
}
