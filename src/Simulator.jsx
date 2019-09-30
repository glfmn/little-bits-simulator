import React, { Component } from 'react';

class Simulator extends Component {
    constructor(props) {
        super(props);
        this.state = { time: 0.0 };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            10
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState((state, props) => {
            return { time: state.time + 0.05 }
        });
    }

    render() {
        const Root = this.props.root;
        return (
            <RootFrame>
                {<Root.type {...Root.props} voltage={Math.sin(this.state.time)*0.5 + 0.5}/>}
            </RootFrame>
        )
    }
}

function RootFrame(props) {
    const frameColor = props.color;
    const frameStyle = {
        fill: frameColor? frameColor : '#00F',
        stroke: '#000000',
        strokeMiterlimit: 10
    };

    // Took the right edge from the frame of the Little Bit and translated it to be at the edge
    return (<div style={{display: 'flex'}}>
        <svg version="1.1" x="0px" y="0px" width="24.2px" height="60.5px" viewBox="0 0 24.2 60.5">
            <g transform="translate(-80 0)">
                <path style={frameStyle} d="M90.1,60h9V41.7c0.3-0.2,0.5-0.7,0.5-1.2V20.3c0-0.6-0.2-1-0.5-1.2V0.5h-9c-2.3,0-4.2,1.9-4.2,4.2v51.1 C85.9,58.1,87.8,60,90.1,60z"/>
                {!props.children && <path style={frameStyle} d="M99.6,39.9l2.7-0.3c0.8-0.1,1.4-0.8,1.4-1.6v-5.1c0-0.8-0.6-1.5-1.4-1.5l-2.7-0.2V39.9z"/>}
            </g>
        </svg>
        <span style={{ zIndex: -1, transform: 'translateX(-8px)' }}>
            {props.children}
        </span>
    </div>);
}

export default Simulator;
