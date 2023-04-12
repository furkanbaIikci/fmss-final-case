import { useNavigate } from 'react-router-dom';



function StarshipCard({ props }) {
    const navigateTo = useNavigate();

    const handleClick = () => {
        const id = props.url.split('/')[5];
        navigateTo(`/starship/${id}`);
    };

	return (
		<button onClick={handleClick} className='w-1/6 hover:scale-105 duration-150'>
			<div className='bg-gray-900 p-3 rounded-md h-36 overflow-auto'>
				<h1 className='text-white text-xl text-center mb-2'>{props.name}</h1>
				<p className='text-white'>Model: {props.model}</p>
				<p className='text-white'>Hyperdrive Rating: {props.hyperdrive_rating}</p>
			</div>
		</button>
	);
}

export default StarshipCard;
