import React, { Component } from 'react';
import { ItemTypes } from './Constants';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

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

export const BLUE = '#00F';
export const GREEN = '#96CA4F';
export const MAGENTA = '#CB0D96';
export const GRAY = '#e0e0e0';
export const ORANGE = '#FC913A';

export default function Frame({ dragPayload, children, color, widget, hideInterlock, label }) {

    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.FRAME, ...dragPayload, children: children },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    const frameStyle = {
        fill: color? color : GREEN,
        stroke: '#000000',
        strokeMiterlimit: 10
    };

    // If we render a connected child, do not render the right interlock and translate the child over
    // a bit to the right so they line up.
    return (<div style={{display: 'relative'}}>
        <div style={{position: "relative"}}>
            <span ref={drag}>
                <svg version="1.1" x="0px" y="0px" width="104.2px" height="60.5px" viewBox="0 0 104.2 60.5">
                    <g>
                        <rect x="18.3" y="1.6" style={backgroundStyle} width="67.6" height="57.4"/>
                        {widget}
                    </g>
                    <g>
                        <path style={frameStyle} d="M90.1,60h9V41.7c0.3-0.2,0.5-0.7,0.5-1.2V20.3c0-0.6-0.2-1-0.5-1.2V0.5h-9c-2.3,0-4.2,1.9-4.2,4.2v51.1 C85.9,58.1,87.8,60,90.1,60z"/>
                        {!children && <path style={frameStyle} d="M99.6,39.9l2.7-0.3c0.8-0.1,1.4-0.8,1.4-1.6v-5.1c0-0.8-0.6-1.5-1.4-1.5l-2.7-0.2V39.9z"/>}
                    </g>
                    <g>
                        <path style={frameStyle} d="M14.1,0.5h-9v18.3C4.8,19,4.6,19.5,4.6,20v20.2c0,0.6,0.2,1,0.5,1.2V60h9c2.3,0,4.2-1.9,4.2-4.2V4.7 C18.3,2.4,16.4,0.5,14.1,0.5z"/>
                        {!hideInterlock && <path style={frameStyle} d="M4.6,20.7L1.9,21c-0.8,0.1-1.4,0.8-1.4,1.6v5.1c0,0.8,0.6,1.5,1.4,1.5l2.7,0.2V20.7z"/>}
                        <path style={pinStyle} d="M4,21.4c-0.5,0.1-0.8,0.5-0.8,1v1.2c0,0.5,0.4,0.9,0.8,1V21.4z"/>
                        <path style={pinStyle} d="M4,28.5c-0.5,0.1-0.8,0.5-0.8,1v1.2c0,0.5,0.4,0.9,0.8,1V28.5z"/>
                        <path style={pinStyle} d="M4,35.7c-0.5,0.1-0.8,0.5-0.8,1v1.2c0,0.5,0.4,0.9,0.8,1V35.7z"/>
                    </g>
                </svg>
            </span>
            <div style={{ position: 'absolute', width: '70px', marginLeft: '15px', marginTop: '-10px'}}>
                {label}
            </div>
        </div>
        <span style={{ transform: 'translateX(-8px)', position: 'absolute', left: '100%', top: 0 }}>
            {children}
        </span>
    </div>);
}

Frame.propTypes = {
    dragPayload: PropTypes.shape({
        astType: PropTypes.elementType,
        props: PropTypes.object,
    }),
    children: PropTypes.element,
    color: PropTypes.string,
    widget: PropTypes.element,
    label: PropTypes.node,
    hideInterlock: PropTypes.bool,
};

export function PlaceholderFrame(props) {
    const frameStyle = {
        fill: GRAY,
        stroke: '#000000',
        strokeMiterlimit: 10
    };
    return <svg version="1.1" x="0px" y="0px" width="104.2px" height="60.5px" viewBox="0 0 104.2 60.5">
        <g>
            <title>Layer 1</title>
            <g>
                <rect style={backgroundStyle} height="57.4" width="67.6" y="1.6" x="18.81483"/>
                <path style={frameStyle} d="m15.08944,0.5l-9,0l0,18.3c-0.3,0.2 -0.5,0.7 -0.5,1.2l0,20.2c0,0.6 0.2,1 0.5,1.2l0,18.6l9,0c2.3,0 4.2,-1.9 4.2,-4.2l0,-51.1c0,-2.3 -1.9,-4.2 -4.2,-4.2z"/>
                <text textAnchor="middle" fontFamily="monospace" fontSize="24" y="25.62157" x="51.89375">DROP</text>
                <text textAnchor="middle" fontFamily="monospace" fontSize="24" y="50.75" x="53.60001">HERE</text>
            </g>
        </g>
    </svg>
}

export function RootFrame(props) {
    const frameColor = props.color;
    const frameStyle = {
        fill: frameColor? frameColor : BLUE,
        stroke: '#000000',
        strokeMiterlimit: 10
    };

    const Root = props.children;

    // Took the right edge from the frame of the Little Bit and translated it to be at the edge
    return (<div className='root-connector' style={{display: 'flex'}}>
        <svg version="1.1" x="0px" y="0px" width="24.2px" height="60.5px" viewBox="0 0 24.2 60.5">
            <g transform="translate(-80 0)">
                <path style={frameStyle} d="M90.1,60h9V41.7c0.3-0.2,0.5-0.7,0.5-1.2V20.3c0-0.6-0.2-1-0.5-1.2V0.5h-9c-2.3,0-4.2,1.9-4.2,4.2v51.1 C85.9,58.1,87.8,60,90.1,60z"/>
                {!props.children && <path style={frameStyle} d="M99.6,39.9l2.7-0.3c0.8-0.1,1.4-0.8,1.4-1.6v-5.1c0-0.8-0.6-1.5-1.4-1.5l-2.7-0.2V39.9z"/>}
            </g>
        </svg>
        <span style={{ transform: 'translateX(-8px)' }}>
            {<Root.type {...Root.props} voltage={1} hideInterlock={true}/>}
        </span>
    </div>);
}