import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Description() {
	const params = useParams();

	const [description, setDescription] = useState();

	async function getDescription() {
		try {
			let res = await fetch(`https://www.swapi.tech/api/${params.type}/${params.id}`);
			let data = await res.json();
			setDescription(data.result);
		} catch (error) {}
	}

	useEffect(
		() => {
			if (description) {
				setDescription();
				getDescription();
			} else {
				getDescription();
			}
		},
		[params]
	);

	return (
		<div>
			<div className="container my-5">
				{description ? (
					<div className="card bg-black text-light">
						<div className="card-body">
							<h3 className="card-title text-warning mb-3">{description.properties.name}</h3>
							<h6 className="card-subtitle mb-5 font-italic text-muted">{description.description}</h6>

							{Object.keys(description.properties).map((property, index) => {
								return (
									<p key={index} className="card-text">
										<strong>{property}: </strong>
										{description.properties[property]}
									</p>
								);
							})}
						</div>
					</div>
				) : (
					<div className="alert alert-info" role="alert">
						Cargando ...
					</div>
				)}
			</div>
		</div>
	);
}
