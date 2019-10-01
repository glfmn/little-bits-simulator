import React, { Component } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Constants';

/// Simulator transforms all child nodes into an AST which supports drag-and-drop
///
/// The AST's sole purpose is to facillitate re-writing parent-child relationships between
/// elements in the simulator
export default class Simulator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ast: React.Children.map(props.children, c => { return {
                id: Math.random(), nodes: constructAst(c, 0)
            }})
        };
        this.state.ast.push({id: Math.random()})
        this.updateAst = this.updateAst.bind(this);
    }

    render() {
        const sims = this.state.ast.map(a => this.renderChildren(a))
        return (<div>{sims}</div>);
    }

    renderChildren({ nodes, id }) {
        const leaf = <Placeholder onDrop={node => this.updateAst(nodes, node, id)}/>;
        return (
            <RootFrame key={id}>
                {renderAst(nodes, leaf)}
            </RootFrame>
        );
    }

    updateAst(ast, node, astId) {
        this.setState((state, props) => {
            return {
                ast: state.ast.map(({id, nodes}) => {
                    if (astId === id) {
                        return { nodes: appendAst(ast, node), id: id }
                    } else {
                        return { nodes, id }
                    }
                })
            }
        });
    }
}

/// Construct an AST node from the props of a React element
function constructAst(Child, depth) {
    return {
        type: Child.type,
        props: {...Child.props, children: undefined, depth: depth },
        children: Child.props.children? constructAst(Child.props.children, depth + 1) : undefined
    }
}

/// Place a new ast node at the depest spot in the tree
function appendAst(ast, node) {
    const convert = (n, depth) => {
        return {
            type: node.astType,
            props: node.props,
            children: node.children && constructAst(node.children, depth)
        }
    }
    if (!ast) {
        return constructAst(convert(node))
    }
    const newChildren = ast.children? appendAst(ast.children, node) : convert(node, ast.depth + 1)
    const newAst = {...ast, children: newChildren};
    return newAst;
}

/// Convert AST back into renderable components
function renderAst(node, leaf) {
    if (!node) {
        return leaf;
    }
    const Parent = node.type;
    const props = node.props;
    return <Parent {...props}>
        {node.children? renderAst(node.children, leaf) : leaf}
    </Parent>;
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
    return (<div ref={drop}><PlaceholderFrame className='.bit-placeholder'/></div>)
}

function PlaceholderFrame(props) {
    const frameStyle = {
        fill: '#e0e0e0',
        stroke: '#000000',
        strokeMiterlimit: 10
    };
    const backgroundStyle = {
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeMidth: 0.9997,
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
            {<Root.type {...Root.props} voltage={1} hideInterlock={true}/>}
        </span>
    </div>);
}
