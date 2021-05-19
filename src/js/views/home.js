import React, { useContext } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import CardList from "../component/CardList";
import SearchBar from "../component/SearchBar";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container mb-5">
			{store.characters.length > 0 && store.planets.length > 0 && store.starships.length > 0 ? (
				<>
					<SearchBar />
					<CardList title="Characters" array={store.characters} type="people" />
					<CardList title="Planets" array={store.planets} type="planets" />
					<CardList title="Starships" array={store.starships} type="starships" />
				</>
			) : (
				<div className="alert alert-info" role="alert">
					Cargando ...
				</div>
			)}
		</div>
	);
};
