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
	translate: {
		x: null,
		y: null
	}
};

const treeContainerStyles: React.CSSProperties = {
	width: "100%",
	height: "75vh",
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
	componentWillMount() {
		this.createRandomTree(10, 1000);
	}

	render() {
		const { newNumber, tree, translate } = this.state;
		return (
			<Container>
				<Row>
					<Col md={3}>
						<h4 className="text-center">Set tree type</h4>
						<FormText>Change the type of tree which the current data:</FormText>
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
					<Col md={3}>
						<h4 className="text-center">Insert a node</h4>
						<FormText>
							Input a number to insert a node into the current tree:
						</FormText>
						<FormGroup style={{ display: "flex" }}>
							<Input
								value={newNumber}
								style={{
									display: "inline-flex",
									marginRight: "10px"
								}}
								onChange={e => this.setState({ newNumber: e.target.value })}
							/>
							<Button
								color="primary"
								style={{
									display: "inline-flex",
									textAlign: "center"
								}}
								onClick={this.onAddNumber}
								disabled={!newNumber.match(regex)}
							>
								Add
							</Button>
						</FormGroup>
					</Col>
					<Col md={3}>
						<h4>Begin tree traversal</h4>
						<Input />
					</Col>
				</Row>
				<div style={treeContainerStyles} ref={this.treeRef}>
					<Tree
						data={tree !== null && tree}
						translate={translate}
						orientation="vertical"
					/>
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

	private createRandomTree = (size: number, max: number): void => {
		const values: number[] = Array.from({ length: size }, () =>
			Math.floor(Math.random() * max)
		);
		const BST = new BinarySearchTree(values);
		return this.setState({ tree: BST.returnTree(), values });
	};

	// private onSetTreeType = (e): void => {};
}

export default TreeVisualiser;
