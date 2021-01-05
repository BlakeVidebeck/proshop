import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'

const HomeScreen = () => {
	const [products, setProducts] = useState([])

	// componentDidMount
	useEffect(() => {
		// make a request to the backend to get the products from db everytime the page loads
		// make a function async so we can use await
		const fetchProducts = async () => {
			// destructure data from res directly instead of res.data
			const { data } = await axios.get('/api/products')
			// set the state
			setProducts(data)
		}
		fetchProducts()
		// componentDidUpdate
	}, [])

	return (
		<>
			<h1>Latest Products</h1>
			<Row>
				{products.map(product => (
					<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</>
	)
}

export default HomeScreen
