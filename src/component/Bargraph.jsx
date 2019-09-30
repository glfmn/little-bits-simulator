import React, { Component } from 'react';

// const img = 'o9-Bargraph-01.svg';


const st0 = { fill: 'none', stroke: '#000000', strokeMiterlimit:10 };
const st1 = { fill: '#96CA4F', stroke: '#000000', strokeMiterlimit:10 };
const st2 = { fill: '#FFFFFF', stroke: '#000000', strokeMidth:0.9997, strokeMiterlimit:10 };
const st3 = { stroke: '#000000', strokeMiterlimit: 10 };

const lit = { fill: '#FF0000', stroke: '#000000', strokeMiterlimit:10 };

const barWidget = (voltage) => {
    let barCount = Math.floor(5.1 * voltage);
    return <g>
        <rect x="23.0" y="21.7" style={barCount > 0? lit : st0} width="5.4" height="13.8"/>
        <rect x="35.9" y="21.7" style={barCount > 1? lit : st0} width="5.4" height="13.8"/>
        <rect x="48.7" y="21.7" style={barCount > 2? lit : st0} width="5.4" height="13.8"/>
        <rect x="61.5" y="21.7" style={barCount > 3? lit : st0} width="5.4" height="13.8"/>
        <rect x="74.4" y="21.7" style={barCount > 4? lit : st0} width="5.4" height="13.8"/>
        <rect x="34.7" y="13.5" style={st0} width="7.9" height="2.9"/>
        <rect x="61.3" y="13.5" style={st0} width="7.9" height="2.9"/>
        <rect x="75.9" y="44.4" style={st0} width="2.3" height="8.4"/>
        <rect x="63.1" y="44.4" style={st0} width="2.3" height="8.4"/>
        <rect x="50.3" y="44.4" style={st0} width="2.3" height="8.4"/>
        <rect x="37.4" y="44.4" style={st0} width="2.3" height="8.4"/>
        <rect x="24.6" y="44.4" style={st0} width="2.3" height="8.4"/>
    </g>
}

const img = (widget) => {
    return <svg version="1.1" x="0px" y="0px" width="104.2px" height="60.5px" viewBox="0 0 104.2 60.5">
        <g>
            <rect x="18.3" y="1.6" style={st2} width="67.6" height="57.4"/>
            <path style={st1} d="M90.1,60h9V41.7c0.3-0.2,0.5-0.7,0.5-1.2V20.3c0-0.6-0.2-1-0.5-1.2V0.5h-9c-2.3,0-4.2,1.9-4.2,4.2v51.1
            C85.9,58.1,87.8,60,90.1,60z"/>
            <path style={st1} d="M99.6,39.9l2.7-0.3c0.8-0.1,1.4-0.8,1.4-1.6v-5.1c0-0.8-0.6-1.5-1.4-1.5l-2.7-0.2V39.9z"/>
            {widget}
            <path style={st1} d="M14.1,0.5h-9v18.3C4.8,19,4.6,19.5,4.6,20v20.2c0,0.6,0.2,1,0.5,1.2V60h9c2.3,0,4.2-1.9,4.2-4.2V4.7
            C18.3,2.4,16.4,0.5,14.1,0.5z"/>
            <path style={st1} d="M4.6,20.7L1.9,21c-0.8,0.1-1.4,0.8-1.4,1.6v5.1c0,0.8,0.6,1.5,1.4,1.5l2.7,0.2V20.7z"/>
            <path style={st3} d="M4,21.4c-0.5,0.1-0.8,0.5-0.8,1v1.2c0,0.5,0.4,0.9,0.8,1V21.4z"/>
            <path style={st3} d="M4,28.5c-0.5,0.1-0.8,0.5-0.8,1v1.2c0,0.5,0.4,0.9,0.8,1V28.5z"/>
            <path style={st3} d="M4,35.7c-0.5,0.1-0.8,0.5-0.8,1v1.2c0,0.5,0.4,0.9,0.8,1V35.7z"/>
        </g>
    </svg>
};

class Bargraph extends Component {

    render() {
        let frame = img(barWidget(this.props.voltage));
        let Child = this.props.children && this.props.children;
        return (
          <div style={{ display: 'flex' }}>
              {frame}
              {Child && <Child.type {...Child.props} voltage={this.props.voltage}/>}
          </div>
        );
    }
}

export default Bargraph;
