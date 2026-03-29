import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";
import type { Product } from "../types";
import { StatusView } from "../ui/StatusView";
import { QuantityControl } from "../ui/QuantityControl";
import { useCart } from "../state/CartContext";
import { visualStyle } from "../ui/visuals";

export function ProductDetailsPage() {
  const { productId } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadProduct() {
      if (!productId) {
        setError("Missing product id");
        setLoading(false);
        return;
      }

      try {
        const nextProduct = await api.getProductById(Number(productId));
        if (active) {
          setProduct(nextProduct);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load product");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadProduct();

    return () => {
      active = false;
    };
  }, [productId]);

  if (loading) {
    return <StatusView title="Loading product" message="Fetching product details and stock information." />;
  }

  if (error || !product) {
    return (
      <StatusView
        title="Product unavailable"
        message={error ?? "The requested product could not be found."}
        action={
          <Link to="/products" className="ghost-button">
            Back to shop
          </Link>
        }
      />
    );
  }

  return (
    <section className="product-detail-layout">
      <div className="detail-visual" style={visualStyle(product.image)} />
      <div className="detail-copy panel">
        <span className="eyebrow">{product.category?.name ?? "Product details"}</span>
        <h1>{product.name}</h1>
        <p className="lead">{product.description}</p>
        <div className="rating-row">
          <span>{product.rating ? `${product.rating.toFixed(1)} / 5` : "New item"}</span>
          <span>{product.reviewCount ? `${product.reviewCount} verified reviews` : "Fresh listing"}</span>
        </div>
        <div className="detail-meta">
          <div>
            <span>Price</span>
            <div className="price-stack">
              <strong>EUR {product.price.toFixed(2)}</strong>
              {product.oldPrice ? <span>EUR {product.oldPrice.toFixed(2)}</span> : null}
            </div>
          </div>
          <div>
            <span>Availability</span>
            <strong>{product.stock > 0 ? `${product.stock} ready to ship` : "Sold out"}</strong>
          </div>
        </div>
        <QuantityControl value={quantity} max={product.stock} onChange={setQuantity} />
        <div className="inline-actions">
          <button onClick={() => addItem(product, quantity)} disabled={product.stock === 0}>
            Add {quantity} to cart
          </button>
          <Link to="/cart" className="ghost-button">
            Go to cart
          </Link>
        </div>
      </div>
    </section>
  );
}
