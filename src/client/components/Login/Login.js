import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
	const history = useHistory();
	const [name, setName] = useState('');
	const [keycode, setKeycode] = useState(0);

	const handleChange = (e) => {
		setName(e.target.value);
	};

	const signin = () => {
		history.push(`/#test[${name}]`);
	};

	return (
		<form className='Login'>
			<input type='text' placeholder='Username' onChange={handleChange} />
			<button onClick={signin}>Sign In</button>
		</form>
	);
};

export default Login;
