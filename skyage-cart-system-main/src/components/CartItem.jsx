function CartItem({ item, increaseQty, decreaseQty, removeItem }) {
  return (
    <div className="cart-item">

      <div>
        <h4>{item.name}</h4>
        <p>₹{item.price}</p>
      </div>

      <div className="qty-controls">
        <button onClick={() => decreaseQty(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => increaseQty(item.id)}>+</button>
      </div>

      <button
        className="remove-btn"
        onClick={() => removeItem(item.id)}
      >
        Remove
      </button>

    </div>
  );
}

export default CartItem;