import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Category, Product } from "../types";

export function useCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [nextProducts, nextCategories] = await Promise.all([api.getProducts(), api.getCategories()]);
        if (!active) {
          return;
        }

        console.debug("useCatalog: fetched products", nextProducts.length, "categories", nextCategories.length);

        setProducts(nextProducts);
        setCategories(nextCategories);
      } catch (loadError) {
        if (!active) {
          return;
        }

        const message = loadError instanceof Error ? loadError.message : "Unable to load catalog";
        console.error("useCatalog: failed to load catalog", message, loadError);
        setError(message);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  return { products, categories, loading, error };
}
