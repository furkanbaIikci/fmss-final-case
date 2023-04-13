import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

function StarshipDetail() {
	const { id } = useParams();
	const [starship, setStarship] = useState({});
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get(`https://swapi.dev/api/starships/${id}`)
			.then(res => {
				setStarship(res.data);
				setLoading(false);
			})
			.catch(err => {
				alert("No result found");
				navigate("/");
			});
	}, [id]);

	/* Anasayfaya giden buton */
	const backToMainPage = () => {
		navigate("/");
	};

	return (
		<div className='h-screen bg-gray-900 '>
			{/* Loading spinner */}
			{loading && <Spinner />}
			<div className='bg-gray-900 flex flex-col justify-center text-center '>
				{/* Starship Details */}

				{!loading && (
					<>
						<h1 className='text-4xl text-white mt-3'>{starship.name}</h1>
						<div className='sm:w-1/3 w-full h-[2px] bg-white rounded-md mx-auto my-3'></div>

						<div className='w-1/6 text-left flex flex-col mx-auto leading-10 min-w-[250px]'>
							<div className='text-white my-1'>
								<span className='font-bold text-xl'>Passangers: </span> <span className='font-thin text-lg'>{starship.passengers}</span>
							</div>
							<div className='text-white my-1'>
								<span className='font-bold text-xl'>Max Atmospering Speed: </span>{" "}
								<span className='font-thin text-lg'>{starship.max_atmosphering_speed}</span>
							</div>
							<div className='text-white text-xl'>
								<span className='font-bold'>Manufacturer: </span> <span className='font-thin text-lg'>{starship.manufacturer}</span>
							</div>
							<div className='text-white my-1'>
								<span className='font-bold text-xl'>Crew: </span> <span className='font-thin text-lg'>{starship.crew}</span>
							</div>
							<div className='text-white my-1'>
								<span className='font-bold text-xl'>Cargo Capacity: </span>{" "}
								<span className='font-thin text-lg'>{starship.cargo_capacity}</span>
							</div>
						</div>
					</>
				)}
				{/* <table className='text-white table-fixed w-2/3 mx-auto text-xl leading-10'>
					<tbody>
						<tr>
							<td>Passangers</td>
							<td>{starship.passengers}</td>
						</tr>
						<tr>
							<td>Max Atmospering Speed</td>
							<td>{starship.max_atmosphering_speed}</td>
						</tr>
						<tr>
							<td>Manufacturer</td>
							<td>{starship.manufacturer}</td>
						</tr>
						<tr>
							<td>Crew</td>
							<td>{starship.crew}</td>
						</tr>
						<tr>
							<td>Cargo Capacity</td>
							<td>{starship.cargo_capacity}</td>
						</tr>
					</tbody>
				</table> */}
			</div>

			<div>
				<button
					onClick={backToMainPage}
					className='bg-white text-gray-900 hover:bg-slate-200 duration-300 p-2 rounded-md w-64 block mx-auto my-5'>
					Back to Main Page
				</button>
			</div>
		</div>
	);
}

export default StarshipDetail;
