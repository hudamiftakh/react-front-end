
import Header from './Header'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Table} from 'react-bootstrap';


function SearchProducts() {
    const [data, setData]=useState([]);
	async function search(key) {
		let result = await fetch("http://localhost:8000/api/search/"+ key,{
			method : 'get'
		});
		result = await result.json();
		setData(result);
	}
	return (
		<div>
			<Header />
			<h1>Search Products</h1>
			<br />
			<div className="col-sm-6 offset-sm-3">
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
								
							</tr>
						))
					}
					</tbody>
				</Table>
			</div>			
		</div>
	)
}

export default SearchProducts;