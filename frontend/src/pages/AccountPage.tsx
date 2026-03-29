import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../state/AuthContext";
import type { Order } from "../types";
import { StatusView } from "../ui/StatusView";

export function AccountPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadOrders() {
      try {
        const nextOrders = await api.getOrders();
        if (active) {
          setOrders(nextOrders);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load orders");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadOrders();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <StatusView title="Loading account" message="Fetching customer profile and recent orders." />;
  }

  if (error) {
    return <StatusView title="Unable to load account" message={error} />;
  }

  return (
    <div className="page-stack">
      <section className="panel compact">
        <span className="eyebrow">Account</span>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Orders</span>
            <h2>Recent order history</h2>
          </div>
        </div>

        {orders.length === 0 ? (
          <StatusView title="No orders yet" message="Orders created during checkout will appear here." />
        ) : (
          <div className="order-list">
            {orders.map((order) => (
              <article key={order.id} className="order-card">
                <div>
                  <strong>{order.id}</strong>
                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{order.status}</strong>
                </div>
                <div>
                  <span>Payment</span>
                  <strong>{order.payment?.status ?? "Pending"}</strong>
              </div>
              <div>
                  <span>Total</span>
                  <strong>EUR {order.total?.toFixed(2) ?? "0.00"}</strong>
              </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
