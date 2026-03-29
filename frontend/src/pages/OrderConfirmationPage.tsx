import { Link, useLocation, useParams } from "react-router-dom";
import type { Order } from "../types";
import { StatusView } from "../ui/StatusView";

export function OrderConfirmationPage() {
  const { orderId } = useParams();
  const location = useLocation();
  const order = (location.state as { order?: Order } | null)?.order;

  if (!order) {
    return (
      <StatusView
        title="Order recorded"
        message={`Your order ${orderId ?? ""} was created, but the confirmation data is not available in memory anymore.`}
        action={
          <Link to="/account" className="cta-button">
            View account
          </Link>
        }
      />
    );
  }

  return (
    <section className="panel confirmation-card">
      <span className="eyebrow">Order confirmed</span>
      <h1>{order.id}</h1>
      <p>Your order has been submitted successfully and the frontend flow is ready for demo use.</p>
      <div className="summary-row">
        <span>Status</span>
        <strong>{order.status}</strong>
      </div>
      <div className="summary-row">
        <span>Payment</span>
        <strong>
          {order.payment.method} / {order.payment.status}
        </strong>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <strong>EUR {order.total.toFixed(2)}</strong>
      </div>
      <div className="inline-actions">
        <Link to="/products" className="ghost-button">
          Continue shopping
        </Link>
        <Link to="/account" className="cta-button">
          View account
        </Link>
      </div>
    </section>
  );
}
