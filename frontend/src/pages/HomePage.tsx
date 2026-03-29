import { Link } from "react-router-dom";
import { useCatalog } from "../hooks/useCatalog";
import { ProductCard } from "../ui/ProductCard";
import { StatusView } from "../ui/StatusView";
import { useCart } from "../state/CartContext";

export function HomePage() {
  const { products, categories, loading, error } = useCatalog();
  const { addItem } = useCart();

  if (loading) {
    return <StatusView title="Loading storefront" message="Preparing products, categories, and hero content." />;
  }

  if (error) {
    return <StatusView title="Catalog unavailable" message={error} />;
  }

  const featuredProducts = products.filter((product) => product.featured).slice(0, 4);
  const bestSellers = products.filter((product) => product.bestSeller).slice(0, 4);
  const newArrivals = products.filter((product) => product.newArrival).slice(0, 4);

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Next-Gen Everyday Tech</span>
          <h1>Smart products built for modern daily life.</h1>
          <p>
            Discover a curated storefront across Audio, Smart Devices, Accessories, Home Tech, and Personal Care with
            a presentation-ready shopping flow.
          </p>
          <div className="inline-actions">
            <Link to="/products" className="cta-button">
              Shop Now
            </Link>
            <Link to="/products" className="ghost-button">
              Explore Categories
            </Link>
          </div>
        </div>
        <div className="hero-card-grid">
          <div className="hero-stat">
            <strong>{products.length}</strong>
            <span>Store-ready products</span>
          </div>
          <div className="hero-stat">
            <strong>{categories.length}</strong>
            <span>Core categories</span>
          </div>
          <div className="hero-stat accent">
            <strong>Deep Navy + Orange</strong>
            <span>Clean tech-commerce direction</span>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Categories</span>
            <h2>Shop the five storefront pillars of Fluxon</h2>
          </div>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <article key={category.id} className="category-card">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <Link to={`/products`} className="category-link">
                Explore
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Featured</span>
            <h2>Featured picks for the homepage hero flow</h2>
          </div>
          <Link to="/products" className="ghost-button">
            View All
          </Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addItem} />
          ))}
        </div>
      </section>

      <section className="promo-band">
        <article className="promo-card">
          <span className="eyebrow">Promo</span>
          <h3>Up to 30% off selected Audio and Accessories</h3>
          <p>Use this section for discounts, launches, or your strongest weekly campaign.</p>
          <Link to="/products" className="ghost-button">
            See Offers
          </Link>
        </article>
        <article className="promo-card promo-card-dark">
          <span className="eyebrow">New Drop</span>
          <h3>Fresh Smart Devices and Personal Care arrivals</h3>
          <p>Keep the homepage feeling alive with fast-moving campaign blocks like this one.</p>
          <Link to="/products" className="cta-button">
            Browse New Arrivals
          </Link>
        </article>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Best Sellers</span>
            <h2>Products that add social proof to your storefront</h2>
          </div>
        </div>
        <div className="product-grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addItem} />
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">New Arrivals</span>
            <h2>Fresh additions to keep the shop feeling current</h2>
          </div>
        </div>
        <div className="product-grid">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addItem} />
          ))}
        </div>
      </section>

      <section className="trust-grid">
        <article className="trust-card">
          <h3>Secure Checkout</h3>
          <p>Use this block to reassure users that payments and account actions are protected.</p>
        </article>
        <article className="trust-card">
          <h3>Fast Delivery</h3>
          <p>Highlight delivery expectations and shipping confidence early in the homepage flow.</p>
        </article>
        <article className="trust-card">
          <h3>Curated Products</h3>
          <p>Show that Fluxon is not random inventory, but a selected modern tech catalog.</p>
        </article>
        <article className="trust-card">
          <h3>Helpful Support</h3>
          <p>Good support messaging makes a student project feel more like a real commerce brand.</p>
        </article>
      </section>
    </div>
  );
}
