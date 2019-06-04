import React from "react";
import "./App.css";
import TreeVisualiser from "./components/TreeVisualiser";

const App: React.FC = () => {
	return (
		<div>
			<h1>Tree Walker</h1>
			<TreeVisualiser />
		</div>
	);
};

export default App;
