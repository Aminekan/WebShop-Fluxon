import { Link } from "react-router-dom";
import { useCart } from "../state/CartContext";
import { QuantityControl } from "../ui/QuantityControl";
import { StatusView } from "../ui/StatusView";
import { visualStyle } from "../ui/visuals";

export function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <StatusView
        title="Your cart is empty"
        message="Add a few products to continue the shopping flow."
        action={
          <Link to="/products" className="cta-button">
            Browse products
          </Link>
        }
      />
    );
  }

  return (
    <div className="checkout-layout">
      <section className="panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Cart</span>
            <h1>Review selected items</h1>
          </div>
        </div>

        <div className="cart-list">
          {items.map((item) => (
            <article key={item.product.id} className="cart-row">
              <div className="cart-visual" style={visualStyle(item.product.image)} />
              <div className="cart-copy">
                <h3>{item.product.name}</h3>
                <p>{item.product.description}</p>
              </div>
              <QuantityControl
                value={item.quantity}
                max={item.product.stock}
                onChange={(quantity) => updateQuantity(item.product.id, quantity)}
              />
              <strong>EUR {(item.unitPrice * item.quantity).toFixed(2)}</strong>
              <button className="text-button" onClick={() => removeItem(item.product.id)}>
                Remove
              </button>
            </article>
          ))}
        </div>
      </section>

      <aside className="panel order-summary">
        <span className="eyebrow">Summary</span>
        <h2>Checkout snapshot</h2>
        <div className="summary-row">
          <span>Subtotal</span>
          <strong>EUR {subtotal.toFixed(2)}</strong>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <strong>Free</strong>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <strong>EUR {subtotal.toFixed(2)}</strong>
        </div>
        <Link to="/checkout" className="cta-button">
          Continue to checkout
        </Link>
      </aside>
    </div>
  );
}
