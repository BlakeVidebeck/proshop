import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			{/* Product image */}
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant='top'></Card.Img>
			</Link>

			{/* Product name */}
			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<Card.Title as='div'>
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>

				{/* Product reviews */}
				<Card.Text as='div'>
					<Rating
						rating={product.rating}
						text={`${product.numReviews} reviews`}
					/>
				</Card.Text>

				{/* Product price */}
				<Card.Text as='h3'>${product.price}</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Product
