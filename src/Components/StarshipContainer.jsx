import axios from "axios";
import Spinner from "./Spinner";

import { useEffect, useState } from "react";
import StarshipCard from "./StarshipCard";

function StarshipContainer() {
	const [starShips, setStarShips] = useState([]);
	const [defaultStarShips, setDefaultStarShips] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [nextPage, setNextPage] = useState(null);
	const [loading, setLoading] = useState(true);

	/* Sayfa yuklendigi durumda ilk degerlerimizi api'dan cekiyoruz */
	useEffect(() => {
		axios.get("https://swapi.dev/api/starships").then(res => {
			setStarShips(res.data.results);
			setDefaultStarShips(res.data.results);
			setNextPage(res.data.next);
			setLoading(false);
		});
	}, []);

	/* Clicked loadmore button */
	const loadMore = () => {
		setLoading(true);
		if (!nextPage) return;
		axios.get(nextPage).then(res => {
			setLoading(true);
			setStarShips(starShips => [...starShips, ...res.data.results]);
			setNextPage(res.data.next);
			setLoading(false);
		});
	};

	/* Kullanici arama yaptigi durumda calisan fonksiyon */
	const searchRequest = () => {
		setLoading(true);
		if (!searchInput) {
			setStarShips(defaultStarShips);
			setLoading(false);
		}
		axios.get(`https://swapi.dev/api/starships/?search=${searchInput}`)
			.then(res => {
				if (res.data.results.length === 0) {
					alert("No result found");
					return;
				}
				setLoading(true);
				setStarShips(res.data.results);
				setLoading(false);
				if(res.data.next){
					setNextPage(res.data.next);
				}else{
					setNextPage(null);
				}

			})
			.catch(err => {
				alert("No result found");
			});
	};

	return (
		<div>
			{/* Header */}
			<header className='flex justify-center flex-col items-center align-middle h-20 bg-gray-900 py-20'>
				<h1 className='text-3xl block text-white '>Star Wars Starships</h1>
				<input
					onChange={e => setSearchInput(e.target.value)}
					type='text'
					placeholder='Name/Model'
					className='my-3 p-2 rounded-md outline-none w-64'
				/>
				<button onClick={searchRequest} className='bg-white text-gray-900 hover:bg-slate-200 duration-300 p-2 rounded-md w-64'>
					Search
				</button>
			</header>

			{/* Loading Spinner */}
			{loading && <Spinner />}
			{/* Body */}
			<div className='my-10 flex  flex-wrap gap-10 w-full justify-center flex-row'>
				{starShips?.map(starShip => {
					return <StarshipCard props={starShip} key={starShip.name} />;
				})}
			</div>
			{/* Load More Button */}
			{nextPage && starShips.length !== 0 && nextPage && (
				<div className='flex justify-center my-5'>
					<button className='bg-gray-900 text-white p-2 rounded-md w-64' onClick={loadMore}>
						Load More
					</button>
				</div>
			)}
		</div>
	);
}

export default StarshipContainer;
