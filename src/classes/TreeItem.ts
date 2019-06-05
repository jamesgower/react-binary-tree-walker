export default class TreeItem {
	public name: string;
	public children: TreeItem[];
	constructor(name: string) {
		this.name = name;
		this.children = [];
	}

	public addChild? = (value: string, larger?: boolean) => {
		if (larger) {
			if (!this.children[0]) this.children[0] = new TreeItem("");
			return (this.children[1] = new TreeItem(value));
		}
		if (!this.children[1]) this.children[1] = new TreeItem("");
		this.children[0] = new TreeItem(value);
	};
}
