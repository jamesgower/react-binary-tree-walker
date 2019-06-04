import React from "react";
import Tree from "react-d3-tree";
import BinarySearchTree from "./BinarySearchTree";

class TreeVisualiser extends React.Component<any> {
	state: any = {
		tree: null,
		treeType: null,
		newNumber: "",
		values: []
	};

	componentWillMount() {
		const values = Array.from({ length: 5 }, () =>
			Math.floor(Math.random() * 1000)
		);
		console.log(values);
		const BST = new BinarySearchTree(values);
		this.setState({ tree: BST.returnTree(), values });
	}

	onAddNumber = () => {
		const values = this.state.values;
		values.push(parseInt(this.state.newNumber));
		const BST = new BinarySearchTree(values);
		this.setState({ tree: BST.returnTree(), values });
	};

	render() {
		return (
			<div
				style={{
					width: "100vw",
					height: "100vh",
					margin: "20px"
				}}
			>
				{this.state.newNumber}
				<Tree
					data={this.state.tree && this.state.tree}
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
}

export default TreeVisualiser;
