import React from "react";
import "./ShoppingCart.css";
import { useDispatch, useSelector } from "react-redux";
import {
	removeItemFromCart,
	clearCart,
	increaseItemQuantity,
	decreaseItemQuantity
} from "./CartSlice.jsx";
import "./ShoppingCart.css";

const ShoppingCart = () => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.cartItems);
	const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

	const handleRemoveItem = (itemId) => {
		dispatch(removeItemFromCart(itemId));
	};

	const handleClearCart = () => {
		dispatch(clearCart());
	};

	const handleIncreaseQuantity = (itemId) => {
		dispatch(increaseItemQuantity(itemId));
	};

	const handleDecreaseQuantity = (itemId) => {
		dispatch(decreaseItemQuantity(itemId));
	};

	const productCartItem = cartItems.map((item) => (
		<li key={item.id} className="cart-item">
			<span>
				{item.name} - ${item.price}
			</span>
			<div className="quantity-controls">
				<button
					className="quantity-control-btn decrease"
					onClick={() => handleDecreaseQuantity(item.id)}>
					-
				</button>
				<span className="item-qty"> {item.quantity}</span>
				<button
					className="quantity-control-btn increase"
					onClick={() => handleIncreaseQuantity(item.id)}>
					+
				</button>
			</div>
			<button className="remove-item-btn" onClick={() => handleRemoveItem(item.id)}>
				Remove
			</button>
		</li>
	));

	return (
		<>
			<div className="shopping-cart">
				<h2 className="shopping-cart-title">Shopping Cart</h2>
				<ul className="cart-items">{productCartItem}</ul>
				<div>{totalAmount ? <div>The total amount is ${totalAmount}</div> : ""}</div>
				<button className="clear-cart-btn" onClick={handleClearCart}>
					Clear Cart
				</button>
			</div>
		</>
	);
};

export default ShoppingCart;
