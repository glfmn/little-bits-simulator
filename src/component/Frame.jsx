import React, { Component } from 'react';

class Frame extends Component {
    render() {
        const frameColor = this.props.color;
        const frameStyle = {
            fill: frameColor? frameColor : '#96CA4F',
            stroke: '#000000',
            strokeMiterlimit: 10
        };

        return <svg version="1.1" x="0px" y="0px" width="104.2px" height="60.5px" viewBox="0 0 104.2 60.5">
            <g>
                <rect x="18.3" y="1.6" style={backgroundStyle} width="67.6" height="57.4"/>
                <path style={frameStyle} d="M90.1,60h9V41.7c0.3-0.2,0.5-0.7,0.5-1.2V20.3c0-0.6-0.2-1-0.5-1.2V0.5h-9c-2.3,0-4.2,1.9-4.2,4.2v51.1
                C85.9,58.1,87.8,60,90.1,60z"/>
                <path style={frameStyle} d="M99.6,39.9l2.7-0.3c0.8-0.1,1.4-0.8,1.4-1.6v-5.1c0-0.8-0.6-1.5-1.4-1.5l-2.7-0.2V39.9z"/>
                {this.props.children}
                <path style={frameStyle} d="M14.1,0.5h-9v18.3C4.8,19,4.6,19.5,4.6,20v20.2c0,0.6,0.2,1,0.5,1.2V60h9c2.3,0,4.2-1.9,4.2-4.2V4.7
                C18.3,2.4,16.4,0.5,14.1,0.5z"/>
                <path style={frameStyle} d="M4.6,20.7L1.9,21c-0.8,0.1-1.4,0.8-1.4,1.6v5.1c0,0.8,0.6,1.5,1.4,1.5l2.7,0.2V20.7z"/>
                <path style={pinStyle} d="M4,21.4c-0.5,0.1-0.8,0.5-0.8,1v1.2c0,0.5,0.4,0.9,0.8,1V21.4z"/>
                <path style={pinStyle} d="M4,28.5c-0.5,0.1-0.8,0.5-0.8,1v1.2c0,0.5,0.4,0.9,0.8,1V28.5z"/>
                <path style={pinStyle} d="M4,35.7c-0.5,0.1-0.8,0.5-0.8,1v1.2c0,0.5,0.4,0.9,0.8,1V35.7z"/>
            </g>
        </svg>
    }
}

const backgroundStyle = {
    fill: '#FFFFFF',
    stroke: '#000000',
    strokeMidth: 0.9997,
    strokeMiterlimit: 10
};

const pinStyle = {
    stroke: '#000000',
    strokeMiterlimit: 10
};

export default Frame;
