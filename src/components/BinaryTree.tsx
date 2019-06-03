import React from "react";
import Tree from "react-d3-tree";
import BST from "./BinarySearchTree";

const data = new BST([2, 6, 4, 2]);
console.log(data);

const myTreeData = [
	{
		name: data.root,
		attributes: {
			keyA: "val A",
			keyB: "val B",
			keyC: "val C"
		},
		children: [
			{
				name: "Level 2: A",
				attributes: {
					keyA: "val A",
					keyB: "val B",
					keyC: "val C"
				}
			},
			{
				name: "Level 2: B"
			}
		]
	}
];

class BinaryTree extends React.Component {
	render() {
		return (
			<div
				style={{
					border: "2px solid red",
					width: "400px",
					height: "400px",
					margin: "20px"
				}}
			>
				<Tree data={myTreeData} />
			</div>
		);
	}
}

export default BinaryTree;
