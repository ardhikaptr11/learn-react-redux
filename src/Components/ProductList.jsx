// ProductList.jsx
import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "./CartSlice";
import ShoppingCart from "./ShoppingCart";
import { cartItems } from "./ShoppingCart";

const ProductList = () => {
	const products = [
		{ id: 1, name: "T-shirt", price: 60 },
		{ id: 2, name: "Blazer", price: 75 },
		{ id: 3, name: "Short Pants", price: 30 }
	];

	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.cartItems);
	const [isCartVisible, setIsCartVisible] = useState(false);

	useEffect(() => {
		if (cartItems.length === 0) {
			setIsCartVisible(false);
		} else {
			setIsCartVisible(true);
		}
	}, [cartItems]);

	const handleAddToCart = (product) => {
		dispatch(addItemToCart(product));
	};

	const listOfProduct = products.map((product) => {
		return (
			<li key={product.id} className="product-list-item">
				<span>
					{product.name} - ${product.price}
				</span>
				<button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
					Add to Cart
				</button>
			</li>
		);
	});

	return (
		<div className="product-list">
			<h2 className="product-list-title">Products</h2>
			<ul className="product-list-items">{listOfProduct}</ul>
			{isCartVisible && <ShoppingCart />}
		</div>
	);
};

export default ProductList;
