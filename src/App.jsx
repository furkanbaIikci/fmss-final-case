import StarshipDetail from "./Components/StarshipDetail";
import StarshipContainer from "./Components/StarshipContainer";

import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<div >
			<Routes>
				<Route path='/starship/:id' Component={StarshipDetail} />
				<Route path='/' Component={StarshipContainer} />
			</Routes>
		</div>
	);
}

export default App;
