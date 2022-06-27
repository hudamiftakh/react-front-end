import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Header from './Header';
function Login() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useNavigate();
	const MySwal = withReactContent(Swal)


	useEffect(()=>{
		if(localStorage.getItem('user-info')){
			history("/add");
		}
	},[]);

	async function login() {
		console.warn(email,password);
		let item = {email,password};

		let result  = await fetch("http://localhost:8000/api/login",{
			method :'post',
			body : JSON.stringify(item),
			headers : {
				"content-type" : 'application/json',
				"Accept" : 'application/json'
			}
		});
		result = await result.json();
		
		if(result.status=='error'){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Sorry email or password doesn\'t match'
			})
		}else{
			localStorage.setItem("user-info", JSON.stringify(result));
			history("/add");
		}
	} 	

	return (
		<div>
			<Header />
			<h1>Login</h1><br />
			<div className="col-sm-6 offset-sm-3">
				<input type="text" 
					  value = {email}
				      onChange={(e)=>setEmail(e.target.value)}
					  placeholder="Email" 
					  className="form-control"/><br />
				<input type="password" 
					  value = {password}
					  onChange={(e)=>setPassword(e.target.value)}
					  placeholder="Password" 
					  className="form-control"/><br />
				<button className="btn btn-primary" onClick={login}>Login Aplikasi</button>
			</div>
		</div>
	)
}

export default Login;