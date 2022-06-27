import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from './Header'

function Register() {
	const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const [email, setEmail] = useState("");
	const history = useNavigate();

	useEffect(()=>{
		if(localStorage.getItem('user-info')){
			history("/add");
		}
	},[]);

  async	function signUp() {
		let item ={name, password, email}
		let result  = await fetch("http://localhost:8000/api/register",{
			method :'post',
			body : JSON.stringify(item),
			headers : {
				"content-type" : 'application/json',
				"Accept" : 'application/json'
			}
		})

		result = await result.json();
		console.warn("result",result);
		localStorage.setItem("user-info",JSON.stringify(result));
		history("/add");
	}

	return (
	 <>
	 <Header />
		<div className="col-sm-6 offset-sm-3">
			<h1>Halaman Register</h1>
			<input type="text" 
					value={name}
					onChange={(e) => setName(e.target.value)} 
					className="form-control" 
					placeholder="Name" /><br />
			<input type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
			 		className="form-control" 
			 		placeholder="Email" /><br />
			<input type="password"
				   value={password}
				   onChange={(e) => setPassword(e.target.value)}
			 	   className="form-control"
			 	   placeholder="Password" />
			<br />

			<button onClick={signUp} className="btn btn-primary">Daftar</button>
		</div>
	 </>
	)
}

export default Register;