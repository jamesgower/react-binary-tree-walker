import React from "react";
import "./App.css";
import Tree from "./components/BinaryTree";

const App: React.FC = () => {
	return (
		<div>
			<h1>Tree Walker</h1>
			<Tree />
		</div>
	);
};

export default App;
