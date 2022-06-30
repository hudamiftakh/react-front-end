import Header from './Header'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import {useState,useEffect} from 'react';

function UpdateProducts() {
	let {id} = useParams();
	const [data,setData] = useState([]);
	const [name,setName] = useState("");
	const [file,setFile] = useState("");
	const [price,setPrice] = useState("");
	const [description,setDescription] = useState("");

	useEffect(()=>{
		getData();
	},[]);

	const getData=()=>{
		fetch('http://localhost:8000/api/getProduct/'+id
			,{
				method : 'get',
				headers : { 
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			}
			)
		.then(function(response){
			return response.json();
		})
		.then(function(result) {
			setData(result);
			setName(result.name);
			setPrice(result.price);
			setDescription(result.description);
			setFile(result.setFile);
		});
	}

	async function editProduct(id) {
		const formData = new FormData();
		console.log(formData);
		formData.append('file', file);
		formData.append('price', price);
		formData.append('name', name);
		formData.append('description', description);

		let result = await fetch("http://localhost:8000/api/updateProduct/"+id,{
			method : "POST",
			body : formData,
		});

		getData();
		alert("Update Products Berhasil");
	}

	return (
		<div>
			<Header />
			<h1>Update Products</h1>
				<div className="col-sm-6 offset-sm-3">
				<input type="text"  
						onChange ={(e)=>setName(e.target.value)}
						className="form-control" 
						defaultValue={data.name} /> <br />
				<input type="text"  
					  onChange ={(e)=>setPrice(e.target.value)}
					  className="form-control" 
					  defaultValue={data.price} /> <br />
				<textarea 
					onChange ={(e)=>setDescription(e.target.value)}
					className="form-control" 
					defaultValue={data.description}>{data.description}</textarea><br />
				<input type="file" 
					onChange ={(e)=>setFile(e.target.files[0])}
					className="form-control" 
					defaultValue={data.file_path} /><br />
				<img style={{width:200}}  src={"http://localhost:8000/"+data.file_path}  />
				<br />
				<br />
				<div className="d-grid gap-2">
					<button onClick={()=>editProduct(data.id)}  className="btn btn-primary btn-block">Update</button>
				</div>
			</div>
		</div>
	)
}

export default UpdateProducts;

