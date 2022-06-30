
import Header from './Header'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function AddProducts() {
	const [name,setName] = useState("");
	const [file,setFile] = useState("");
	const [price,setPrice] = useState("");
	const [description,setDescription] = useState("");
	const history = useNavigate();

	
async function addProduct() {

		const formData = new FormData();
		formData.append('file', file);
		formData.append('price', price);
		formData.append('name', name);
		formData.append('description', description);

		let result = await fetch("http://localhost:8000/api/addProduct",{
			method : "post",
			body : formData,
		});

		history("/");

	}

	return (
		<div>
			<Header />
			<h1>Add Products</h1>
			<br />
			<div className="col-sm-6 offset-sm-3">
				<input type="text" 
				    onChange ={(e)=>setName(e.target.value)}
					className="form-control" 
					placeholder="Name Products"/> <br />
				<input type="text" 
					  onChange ={(e)=>setPrice(e.target.value)}
					  className="form-control" 
					  placeholder="Price"/> <br />
				<textarea 
					  onChange ={(e)=>setDescription(e.target.value)}
					 className="form-control" 
					 placeholder="Description"></textarea><br />
				<input type="file" 
						onChange ={(e)=>setFile(e.target.files[0])}
						className="form-control" 
						placeholder=""/> <br />
				<button className="btn btn-success" onClick={addProduct}>Add Products</button>
			</div>
		</div>
	)
}

export default AddProducts;