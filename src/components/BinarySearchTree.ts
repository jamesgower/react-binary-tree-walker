import Node from "./Node";

export default class BinarySearchTree {
	public root: Node;
	constructor(data?: string[] | number[]) {
		this.root = null;
		data && data.forEach((item: string | number) => this.insert(item));
	}

	public insert = (value: number | string): BinarySearchTree => {
		const node: Node = new Node(value);
		if (!this.root) {
			this.root = node;
			node.count++;
			return this;
		}
		let current: Node = this.root;
		while (true) {
			if (node.value < current.value) {
				if (current.left) {
					current = current.left;
				} else {
					current.left = node;
					node.count++;
					return this;
				}
			} else if (node.value > current.value) {
				if (current.right) {
					current = current.right;
				} else {
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

const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(15);
