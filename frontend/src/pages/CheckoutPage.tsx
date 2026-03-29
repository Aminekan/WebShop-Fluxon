import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../state/AuthContext";
import { useCart } from "../state/CartContext";
import type { CheckoutForm } from "../types";
import { StatusView } from "../ui/StatusView";

export function CheckoutPage() {
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<CheckoutForm>({
    fullName: user?.name ?? "",
    email: user?.email ?? "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "CreditCard"
  });

  if (items.length === 0) {
    return <StatusView title="Nothing to checkout" message="Your cart is empty. Add products before opening checkout." />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const order = await api.createOrder(form, items);
      clearCart();
      navigate("/products");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to create order");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="checkout-layout">
      <form className="panel" onSubmit={handleSubmit}>
        <span className="eyebrow">Checkout</span>
        <h1>Collect shipping and payment details</h1>
        <div className="form-grid">
          <label>
            Full name
            <input
              value={form.fullName}
              onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </label>
          <label>
            Address
            <input
              value={form.address}
              onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
              required
            />
          </label>
          <label>
            City
            <input
              value={form.city}
              onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))}
              required
            />
          </label>
          <label>
            Postal code
            <input
              value={form.postalCode}
              onChange={(event) => setForm((current) => ({ ...current, postalCode: event.target.value }))}
              required
            />
          </label>
          <label>
            Payment method
            <select
              value={form.paymentMethod}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  paymentMethod: event.target.value as CheckoutForm["paymentMethod"]
                }))
              }
            >
              <option value="CreditCard">Credit card</option>
              <option value="PayPal">PayPal</option>
              <option value="CashOnDelivery">Cash on delivery</option>
            </select>
          </label>
        </div>
        {error ? <p className="error-text">{error}</p> : null}
        <button type="submit" disabled={submitting}>
          {submitting ? "Placing order..." : "Place order"}
        </button>
      </form>

      <aside className="panel order-summary">
        <span className="eyebrow">Order summary</span>
        <h2>Ready for API handoff</h2>
        {items.map((item) => (
          <div className="summary-row" key={item.product.id}>
            <span>
              {item.product.name} x {item.quantity}
            </span>
            <strong>EUR {(item.quantity * item.unitPrice).toFixed(2)}</strong>
          </div>
        ))}
        <div className="summary-row total">
          <span>Total</span>
          <strong>EUR {subtotal.toFixed(2)}</strong>
        </div>
      </aside>
    </div>
  );
}
