import React, { Component } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Constants';
import PropTypes from 'prop-types';
import { PlaceholderFrame, RootFrame } from './Frame';

/// Simulator transforms all child nodes into an AST which supports drag-and-drop
///
/// The AST facillitates re-writing parent-child relationships between elements in
/// the simulator since props are strictly read-only.  This allows for the initial
/// state of the simulator to be written with elements like normal:
///
/// ```
/// function App(props) {
///   render (
///     <Simulator>
///       <Dimmer><Barcode/></Dimmer>
///     </Simulator>
///   )
/// }
/// ```
///
/// but allows the simulator to still change which elements are the parents of
/// which.
export default class Simulator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ast: React.Children.map(props.children, c => { return {
                id: Math.random(), nodes: constructAst(c, 0)
            }})
        };
        while (this.state.ast.length < (props.length? props.length : 4)) {
            this.state.ast.push({id: Math.random()})
        }
        this.updateAst = this.updateAst.bind(this);
    }

    render() {
        const sims = this.state.ast.map(a => this.renderChildren(a))
        return (<div>{sims}</div>);
    }

    /// Render an individual AST by converting the AST back into the original nodes
    renderChildren({ nodes, id }) {
        // Put a placeholder at the end of the tree which can register a callback to
        // append nodes to the AST
        const leaf = <Placeholder onDrop={node => this.updateAst(nodes, node, id)}/>;
        return (
            <RootFrame key={id}>
                {renderAst(nodes, leaf)}
            </RootFrame>
        );
    }

    updateAst(ast, node, astId) {
        // TODO: consider making this a higher-order method which handles matching the
        // ast to a particular id so we can define callbacks more easily without messing
        // with ids.
        //
        // const update = (a, n) => {return { nodes: appendAST(a,n) } };
        // this.setState(id, update)(ast, node)
        this.setState((state, props) => {
            return {
                ast: state.ast.map(({id, nodes}) => {
                    // update only the tree which triggered the change
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
///
/// The children are separated from the type and the props in order to allow the simulator
/// to manipulate each part separately when it updates as a result of drag-and-drop events.
function constructAst(Child, depth) {
    return {
        type: Child.type,
        props: {...Child.props, children: undefined, depth: depth },
        children: Child.props.children? constructAst(Child.props.children, depth + 1) : undefined
    }
}

/// Place a new ast node at the depest spot in the tree
function appendAst(ast, node) {
    // convert payload to AST node
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
///
/// Reconstruct the AST with an optional Leaf node at the deepest spot in the tree
/// this allows the Simulator to place a component at the leaves of the tree which can
/// react to drag-and-drop events by appending new nodes to the tree.
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

// TODO: function to split nodes off the AST by their depth (deleting nodes)

/// The Leaf-node of the ast which allows the simulator to react to drop events
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
