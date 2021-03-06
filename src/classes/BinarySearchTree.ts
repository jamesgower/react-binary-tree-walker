import Node from "./Node";
import TreeItem from "./TreeItem";

class BinarySearchTree {
	public root: Node;
	public tree: TreeItem;
	constructor(data?: string[] | number[]) {
		this.root = null;
		this.tree = null;
		data && data.forEach((item: string | number) => this.insert(item));
	}

	public returnTree = (): TreeItem => {
		return this.tree;
	};

	public insert = (value: number | string): BinarySearchTree => {
		const node: Node = new Node(value);
		if (!this.root) {
			this.root = node;
			this.tree = new TreeItem(value.toString());
			node.count++;
			return this;
		}
		let current: Node = this.root;
		let tree: any = this.tree;
		while (true) {
			if (node.value < current.value) {
				if (current.left) {
					tree = tree.children[0];
					current = current.left;
				} else {
					tree.addChild(value.toString());
					current.left = node;
					node.count++;
					return this;
				}
			} else if (node.value > current.value) {
				if (current.right) {
					current = current.right;
					tree = tree.children[1];
				} else {
					tree.addChild(value.toString(), true);
					current.right = node;
					node.count++;
					return this;
				}
			} else {
				current.count++;
				return this;
			}
		}
	};

	public find = (value: string | number): Node => {
		let current = this.root;
		if (!current) {
			return null;
		}
		while (true) {
			if (current.value === value) return current;
			else if (current.value < value) {
				if (!current.right) {
					return null;
				}
				current = current.right;
			} else {
				if (!current.left) {
					return null;
				}
				current = current.left;
			}
		}
	};

	public contains = (value: number | string): boolean => {
		if (this.find(value)) return true;
		return false;
	};
}

export default BinarySearchTree;
