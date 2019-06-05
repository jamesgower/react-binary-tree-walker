import React, { DOMElement } from "react";
import Tree from "react-d3-tree";
import BinarySearchTree from "../classes/BinarySearchTree";
import TreeItem from "../classes/TreeItem";
import { TreeState } from "../interfaces/ITreeVisualiser";

const initialState: TreeState = {
	tree: null,
	treeType: null,
	newNumber: "",
	values: [],
	translate: null
};

const containerStyles: React.CSSProperties = {
	width: "100%",
	height: "100vh"
};

class TreeVisualiser extends React.Component<object, TreeState> {
	readonly state: TreeState = initialState;
	public treeContainer: any;

	componentDidMount() {
		const dimensions = this.treeContainer.getBoundingClientRect();
		this.setState({
			translate: {
				x: dimensions.width / 2,
				y: dimensions.height / 4
			}
		});
	}
	componentWillMount() {
		const values: number[] = Array.from({ length: 5 }, () =>
			Math.floor(Math.random() * 1000)
		);
		console.log(values);
		const BST = new BinarySearchTree(values);
		this.setState({ tree: BST.returnTree(), values });
	}

	render() {
		return (
			<div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
				{this.state.newNumber}
				<Tree
					data={this.state.tree && this.state.tree}
					translate={this.state.translate}
					orientation="vertical"
				/>
				<input
					value={this.state.newNumber}
					onChange={e => this.setState({ newNumber: e.target.value })}
				/>
				<button onClick={this.onAddNumber}>Add</button>
			</div>
		);
	}

	private onAddNumber = () => {
		const values: number[] = this.state.values;
		values.push(parseInt(this.state.newNumber));
		const BST: BinarySearchTree = new BinarySearchTree(values);
		this.setState({ tree: BST.returnTree(), values });
	};
}

export default TreeVisualiser;
