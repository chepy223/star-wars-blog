import React, { useRef, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export default function SearchBar() {
	const { store, actions } = useContext(Context);

	const [list, setList] = useState([]);

	const autoComplete = event => {
		let search = event.target.value;

		if (search.length > 0) {
			let result = [];

			store.characters.forEach(elem => {
				if (elem.name.toLowerCase().startsWith(search.toLowerCase())) {
					result.push({ id: elem.uid, name: elem.name, type: "people" });
				}
			});

			store.planets.forEach(elem => {
				if (elem.name.toLowerCase().startsWith(search.toLowerCase())) {
					result.push({ id: elem.uid, name: elem.name, type: "planets" });
				}
			});

			store.starships.forEach(elem => {
				if (elem.name.toLowerCase().startsWith(search.toLowerCase())) {
					result.push({ id: elem.uid, name: elem.name, type: "starships" });
				}
			});

			setList(result);
		} else {
			setList([]);
		}
	};

	return (
		<div className="container d-flex justify-content-center mt-3">
			<div className="col-12 col-md-6">
				<div className="input-group">
					<div className="input-group">
						<div className="input-group-prepend">
							<span className="input-group-text">
								<i className="fas fa-search" />
							</span>
						</div>
						<input
							className="form-control"
							type="text"
							placeholder="Type to search.."
							onKeyUp={autoComplete}
						/>
					</div>
					<ul className="list-group autocom-box">
						{list.map((elem, index) => {
							return (
								<Link key={index} to={`/description/${elem.type}/${elem.id}`}>
									<li className="list-group-item list-group-item-action">{elem.name}</li>
								</Link>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}
