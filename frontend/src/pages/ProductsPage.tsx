import { useMemo, useState } from "react";
import { useCatalog } from "../hooks/useCatalog";
import { ProductCard } from "../ui/ProductCard";
import { CategoryPill } from "../ui/CategoryPill";
import { StatusView } from "../ui/StatusView";
import { useCart } from "../state/CartContext";

export function ProductsPage() {
  const { products, categories, loading, error } = useCatalog();
  const { addItem } = useCart();
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<number | "all">("all");
  const [sort, setSort] = useState("featured");

  const filteredProducts = useMemo(() => {
    let next = [...products];

    if (categoryId !== "all") {
      next = next.filter((product) => product.categoryId === categoryId);
    }

    if (query.trim()) {
      const lowered = query.toLowerCase();
      next = next.filter(
        (product) =>
          product.name.toLowerCase().includes(lowered) || product.description.toLowerCase().includes(lowered)
      );
    }

        switch (sort) {
      case "new":
        next.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
        break;
      case "best":
        next.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller));
        break;
      case "price-asc":
        next.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        next.sort((a, b) => b.price - a.price);
        break;
      case "stock":
        next.sort((a, b) => b.stock - a.stock);
        break;
      default:
        next.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
    }

    return next;
  }, [categoryId, products, query, sort]);

  if (loading) {
    return <StatusView title="Loading products" message="Fetching product cards and category filters." />;
  }

  if (error) {
    return <StatusView title="Unable to show products" message={error} />;
  }

  return (
    <div className="page-stack">
      <section className="panel compact">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Shop</span>
            <h1>Browse, filter, and sort products</h1>
          </div>
        </div>

        <div className="toolbar">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="search-input"
            placeholder="Search products"
          />
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="select-input">
            <option value="featured">Featured first</option>
            <option value="best">Best sellers</option>
            <option value="new">New arrivals</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="stock">Most in stock</option>
          </select>
        </div>

        <div className="pill-row">
          <CategoryPill category={{ id: 0, name: "All" }} active={categoryId === "all"} onClick={() => setCategoryId("all")} />
          {categories.map((category) => (
            <CategoryPill
              key={category.id}
              category={category}
              active={category.id === categoryId}
              onClick={() => setCategoryId(category.id)}
            />
          ))}
        </div>
      </section>

      {filteredProducts.length === 0 ? (
        <StatusView title="No matching products" message="Try a different search term or category filter." />
      ) : (
        <section className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addItem} />
          ))}
        </section>
      )}
    </div>
  );
}
