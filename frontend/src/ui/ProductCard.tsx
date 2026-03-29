import { Link } from "react-router-dom";
import type { Product } from "../types";
import { visualStyle } from "./visuals";

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-visual" style={visualStyle(product.image)}>
        {product.badge ? <span className="product-badge">{product.badge}</span> : null}
      </div>
      <div className="product-copy">
        <div className="meta-row">
          <span className="chip">{product.category?.name ?? "Category"}</span>
          <span className={product.stock > 0 ? "stock available" : "stock sold-out"}>
            {product.stock > 0 ? `${product.stock} in stock` : "Sold out"}
          </span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="rating-row">
          <span>{product.rating ? `${product.rating.toFixed(1)} / 5` : "New item"}</span>
          <span>{product.reviewCount ? `${product.reviewCount} reviews` : "No reviews yet"}</span>
        </div>
        <div className="product-actions">
          <div className="price-stack">
            <strong>EUR {product.price.toFixed(2)}</strong>
            {product.oldPrice ? <span>EUR {product.oldPrice.toFixed(2)}</span> : null}
          </div>
          <div className="inline-actions">
            <Link to={`/products/${product.id}`} className="ghost-button">
              Details
            </Link>
            <button onClick={() => onAdd(product)} disabled={product.stock === 0}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
