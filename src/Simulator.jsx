import React, { Component } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Constants';

/// Simulator transforms all child nodes into an AST which supports drag-and-drop
///
/// The AST's sole purpose is to facillitate re-writing parent-child relationships between
/// elements in the simulator
export default class Simulator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ast: React.Children.map(props.children, (c) => constructAst(c))
        };
        console.log(this.state.ast);
    }

    render() {
        const sims =
            this.state.ast.map((ast) => <RootFrame key={Math.random()}>
                {renderAst(ast, (i) => console.log(`Adding a ${i.type} to `, ast))}
            </RootFrame>);
        return (<div>{sims}</div>);
    }
}


/// Construct an AST node from the props of a React element
function constructAst(Child) {
    return {
        type: Child.type,
        props: {...Child.props, children: null},
        children: Child.props.children? constructAst(Child.props.children) : null
    }
}


function renderAst(node, onDrop) {
    const Parent = node.type;
    const props = node.props;
    return <Parent {...props}>
        {node.children? renderAst(node.children, onDrop) : <Placeholder onDrop={onDrop}/>}
    </Parent>;
}

export function RootFrame(props) {
    const frameColor = props.color;
    const frameStyle = {
        fill: frameColor? frameColor : '#00F',
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
            {<Root.type {...Root.props} hideInterlock={true}/>}
        </span>
    </div>);
}

function Placeholder({onDrop}) {
    const [, drop] = useDrop({
        accept: ItemTypes.FRAME,
        drop: (i) => onDrop(i),
        collect: mon => ({
            isOver: !!mon.isOver(),
            canDrop: !!mon.canDrop(),
        }),
    })
    return (<div ref={drop} className='.bit-placeholder'>DROP HERE</div>)
}
