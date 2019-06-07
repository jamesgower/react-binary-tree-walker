import TreeItem from "../classes/TreeItem";

export interface TreeState {
	tree: TreeItem;
	treeType: string;
	newNumber: string;
	values: number[];
	translate: {
		x: number;
		y: number;
	};
	maxNodes: number;
	maxAmount: number;
}
