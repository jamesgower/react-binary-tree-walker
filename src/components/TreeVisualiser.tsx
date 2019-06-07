import React, { createRef } from "react";
import Tree from "react-d3-tree";
import BinarySearchTree from "../classes/BinarySearchTree";
import { TreeState } from "../interfaces/ITreeVisualiser";
import {
	Input,
	Button,
	FormGroup,
	Container,
	FormText,
	Col,
	Row
} from "reactstrap";

const initialState: TreeState = {
	tree: null,
	treeType: null,
	newNumber: "",
	values: [],
	maxNodes: null,
	maxAmount: null,
	translate: {
		x: null,
		y: null
	}
};

const treeContainerStyles: React.CSSProperties = {
	width: "100%",
	height: "60vh",
	marginTop: "30px",
	border: "1px solid black"
};

const regex: RegExp = /[0-9]/g;

class TreeVisualiser extends React.Component<object, TreeState> {
	readonly state: TreeState = initialState;
	private treeRef: React.RefObject<HTMLDivElement> = createRef();

	componentDidMount() {
		const dimensions = this.treeRef.current.getBoundingClientRect();
		this.setState({
			translate: {
				x: dimensions.width / 2,
				y: 50
			}
		});
	}

	render() {
		const { newNumber, tree, translate, maxNodes, maxAmount } = this.state;
		return (
			<Container height="100vh">
				<h2 className="text-center" style={{ padding: "10px" }}>
					Tree Walker Visualiser
				</h2>
				<Row>
					<Col md={3}>
						<h4 className="text-center">Set Tree Type</h4>
						<FormText>
							Change the type of tree to change how the tree below is visualised
						</FormText>
						<FormGroup style={{ display: "flex" }}>
							<Input type="select" style={{ marginRight: "10px" }}>
								<option value="binarySearchTree">Binary Search Tree</option>
								<option value="maxBinaryHeap">Max Binary Heap</option>
								<option value="minBinaryHeap">Min Binary Heap</option>
								<option value="priorityQueue">Priority Queue</option>
							</Input>
							<Button color="danger">Select</Button>
						</FormGroup>
					</Col>
					<Col md={6}>
						<h4 className="text-center">Build the Tree</h4>
						<FormText>
							Set the number of nodes you want insert, and the maximum size of
							the nodes randomly inserted into the tree
						</FormText>
						<Row>
							<Col md={5}>
								<Input
									type="number"
									value={maxNodes}
									onChange={e =>
										this.setState({
											maxNodes: parseInt(e.target.value)
										})
									}
									placeholder="Maximum Nodes"
								/>
							</Col>
							<Col md={5}>
								<Input
									type="number"
									value={maxAmount}
									onChange={e =>
										this.setState({
											maxAmount: parseInt(e.target.value)
										})
									}
									placeholder="Maximum Size"
								/>
							</Col>
							<Col md={2}>
								<Button color="warning" onClick={this.createRandomTree}>
									Build
								</Button>
							</Col>
						</Row>
					</Col>
					<Col md={3}>
						<h4 className="text-center">Insert a Node</h4>
						<FormText>
							Input a number to insert a node into the current tree:
						</FormText>
						<FormGroup style={{ display: "flex" }}>
							<Input
								value={newNumber}
								style={{
									marginRight: "10px"
								}}
								onChange={e => this.setState({ newNumber: e.target.value })}
							/>
							<Button
								color="primary"
								onClick={this.onAddNumber}
								disabled={!newNumber.match(regex)}
							>
								Add
							</Button>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col md={{ size: 4, offset: 4 }}>
						<h4 className="text-center">Start Tree Traversal</h4>
						<FormText>Select the technique to traverse the tree with:</FormText>
						<FormGroup style={{ display: "flex" }}>
							<Input type="select" style={{ marginRight: "10px" }}>
								<option value="depthFirstSearch">Breadth-First Search</option>
								<option value="postOrder">
									Post-Order (Depth-First Search)
								</option>
								<option value="preOrder">Pre-Order (Depth-First Search)</option>
								<option value="inOrder">In-Order (Depth-First Search)</option>
							</Input>
							<Button color="success">Start</Button>
						</FormGroup>
					</Col>
				</Row>
				<div style={treeContainerStyles} ref={this.treeRef}>
					{tree && (
						<Tree
							data={tree !== null && tree}
							translate={translate}
							orientation="vertical"
						/>
					)}
				</div>
			</Container>
		);
	}

	private onAddNumber = (): void => {
		const { values, newNumber } = this.state;
		values.push(parseInt(newNumber));
		const BST = new BinarySearchTree(values);
		return this.setState({ tree: BST.returnTree(), values, newNumber: "" });
	};

	private createRandomTree = (): void => {
		const { maxAmount, maxNodes } = this.state;
		const values: number[] = Array.from({ length: maxNodes }, () =>
			Math.floor(Math.random() * maxAmount)
		);
		const BST = new BinarySearchTree(values);
		return this.setState({ tree: BST.returnTree(), values });
	};

	// private onSetTreeType = (e): void => {};
}

export default TreeVisualiser;
