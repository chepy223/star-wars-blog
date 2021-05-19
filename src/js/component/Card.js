import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export default function Card(props) {
	const { store, actions } = useContext(Context);

	return (
		<div className="col-12 col-md-6 col-xl-4 mb-3">
			<div className="card bg-black text-light">
				<div className="card-body">
					<h5 className="card-title">{props.title}</h5>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis officia beatae, deserunt
						aspernatur tenetur quidem.
					</p>
					<div className="row">
						<div className="col">
							<Link to={`/description/${props.type}/${props.uid}`}>
								<button type="button" className="btn btn-outline-warning">
									Go to description
								</button>
							</Link>
						</div>
						<div className="col-3 text-right">
							<button
								className="btn btn-danger"
								onClick={() => {
									actions.addFavourite(props.uid, props.title, props.type);
								}}>
								<i className={`${props.favourite ? "fas" : "far"} fa-heart`} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

Card.propTypes = {
	title: PropTypes.string,
	type: PropTypes.string,
	favourite: PropTypes.bool,
	uid: PropTypes.string
};
