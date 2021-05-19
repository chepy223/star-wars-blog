const getState = ({ getStore, getActions, setStore }) => {
	async function getCharacters() {
		try {
			let res = await fetch("https://www.swapi.tech/api/people");
			let data = await res.json();
			setStore({ characters: data.results });
			localStorage.setItem("characters", JSON.stringify(data.results));
		} catch (error) {}
	}

	async function getPlanets() {
		try {
			let res = await fetch("https://www.swapi.tech/api/planets");
			let data = await res.json();
			setStore({ planets: data.results });
			localStorage.setItem("planets", JSON.stringify(data.results));
		} catch (error) {}
	}

	async function getStarships() {
		try {
			let res = await fetch("https://www.swapi.tech/api/starships");
			let data = await res.json();
			setStore({ starships: data.results });
			localStorage.setItem("starships", JSON.stringify(data.results));
		} catch (error) {}
	}

	return {
		store: {
			characters: [],
			planets: [],
			starships: [],
			favourites: []
		},
		actions: {
			loadSomeData: () => {
				if (
					!localStorage.getItem("characters") &&
					!localStorage.getItem("planets") &&
					!localStorage.getItem("starships")
				) {
					getCharacters();
					getPlanets();
					getStarships();
				} else {
					setStore({
						characters: JSON.parse(localStorage.getItem("characters")),
						planets: JSON.parse(localStorage.getItem("planets")),
						starships: JSON.parse(localStorage.getItem("starships"))
					});
				}
			},

			addFavourite: (id, name, type) => {
				let favourites = getStore().favourites;
				if (!getActions().isAdded(id, type, favourites)) {
					let newFavourite = { id, name, type };
					let newFavourites = [...favourites, newFavourite];
					setStore({ favourites: newFavourites });
				} else {
					getActions().removeFavourite(id, type);
				}
			},

			removeFavourite: (id, type) => {
				let favourites = getStore().favourites;
				let newFavourites = favourites.filter(favourite => {
					return favourite.id != id || favourite.type != type;
				});
				setStore({ favourites: newFavourites });
			},

			isAdded: (id, type, arr) => {
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].id === id && arr[i].type === type) {
						return true;
					}
				}
				return false;
			}
		}
	};
};

export default getState;
