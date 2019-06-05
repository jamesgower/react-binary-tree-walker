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
						<FormGroup>
							<h4>Insert a node</h4>
							<FormText>Add a node to the current tree:</FormText>
							<Input
								value={newNumber}
								onChange={e =>
									this.setState({
										newNumber: e.target.value
									})
								}
								style={{
									display: "inline-flex",
									width: "100px",
									marginRight: "10px"
								}}
							/>
							<Button
								color="success"
								style={{
									display: "inline-flex",
									marginTop: "-5px"
								}}
								onClick={this.onAddNumber}
								disabled={!newNumber.match(regex)}
							>
								Add
							</Button>
						</FormGroup>
					</Col>
					<Col md={5}>
						<h4>Set tree type</h4>
						<Input type="select">
							<option>Binary Search Tree</option>
						</Input>
					</Col>
					<Col md={4}>
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
}

export default TreeVisualiser;
