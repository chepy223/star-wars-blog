import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import Card from "../component/Card";

export default function CardList(props) {
	const { store, actions } = useContext(Context);

	return (
		<>
			<h1 className="text-warning mt-5">{props.title}</h1>
			<div className="overflow-auto row flex-row flex-nowrap p-3">
				{props.array.map(element => {
					return (
						<Card
							title={element.name}
							uid={element.uid}
							key={element.uid}
							type={props.type}
							favourite={actions.isAdded(element.uid, props.type, store.favourites)}
						/>
					);
				})}
			</div>
		</>
	);
}

CardList.propTypes = {
	title: PropTypes.string,
	type: PropTypes.string,
	array: PropTypes.array
};
