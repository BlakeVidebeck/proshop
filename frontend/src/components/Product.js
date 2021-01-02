import React from 'react'
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			{/* Product image */}
			<a href={`/product/${product._id}`}>
				<Card.Img src={product.image} variant='top'></Card.Img>
			</a>

			{/* Product name */}
			<Card.Body>
				<a href={`/product/${product._id}`}>
					<Card.Title as='div'>
						<strong>{product.name}</strong>
					</Card.Title>
				</a>

				{/* Product reviews */}
				<Card.Text as='div'>
					<div className='my-3'>
						{product.rating} from {product.numReviews} reviews
					</div>
				</Card.Text>

				{/* Product price */}
				<Card.Text as='h3'>${product.price}</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Product
