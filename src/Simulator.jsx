import React, { Component } from 'react';

class Simulator extends Component {
    constructor(props) {
        super(props);
        this.state = { voltage: 1.0 };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            100
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            voltage: Math.random()
        });
    }

    render() {
        const Root = this.props.root;
        return (
            <div>{<Root.type {...Root.props} voltage={this.state.voltage}/>}</div>
        )
    }
}

export default Simulator;
