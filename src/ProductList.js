import Header from './Header';
import React,{ useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';

function ProducList() {
	const [data, setData] = useState([]);

	useEffect(()=>{
		getData();
	},[]);



	async function deleteOperation(id) 
	{

		if(window.confirm("Apakah anda yakin hapus data ini ?")){

			let result = await fetch("http://localhost:8000/api/delete/"+id,{
				method : 'get',
			});
			result = await result.json();
			getData();
			console.warn(result);
		}else{
			getData();
		}
	}

	async function getData() {
		fetch("http://localhost:8000/api/listProduct",{
			method : 'post'
		})
		.then(res => res.json())
		.then(
			(result) => {
				setData(result)
			}
		)
	}

	async function search(key) {
		if(!key){
			getData();
		}else{
			let result = await fetch("http://localhost:8000/api/search/"+ key,{
				method : 'get'
			});
			result = await result.json();
			setData(result);
		}
		
	}

	return(
		<div>
		<Header />
		<h1>Product List</h1>
		<div className='container'>
			<div className="col-sm-12">
			<input type="text" 
				      onChange={(e)=>search(e.target.value)}
					  className="form-control" placeholder="Pencarian" /> <br />

				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Image</th>
							<th>Name</th>
							<th>price</th>
							<th>Description</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>

					{  
						data.map(item=>(
							<tr>
								<td>{item.id}</td>
								<td><img style={{width:100}} src={'http://localhost:8000/'+ item.file_path} /></td>
								<td>{item.name}</td>
								<td>{item.price}</td>
								<td>{item.description}</td>
								<td>

								<span className="btnDelete" 
										onClick={()=>deleteOperation(item.id)}
								>Delete</span>

								<Link to={"update/"+item.id}>
									<span className="btnUpdate">Update</span>
								</Link>
								</td>
							</tr>
						))
					}
					</tbody>
				</Table>
			</div>
			</div>
		</div>
		)
	}


	export default ProducList;