export default class Node {
	public value: number | string;
	public left: Node;
	public right: Node;
	public count: number;
	constructor(value: number | string) {
		this.value = value;
		this.left = null;
		this.right = null;
		this.count = 0;
	}
}
