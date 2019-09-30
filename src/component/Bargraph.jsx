import React, { Component } from 'react';

class Bargraph extends Component {
    state = {
        img: 'o9-Bargraph-01.svg'
    }

    render() {
        return (
          <div>
            <img alt={`${this.state.img}`} src={`img/bit/${this.state.img}`}/>
          </div>
        );
    }
}

export default Bargraph;
