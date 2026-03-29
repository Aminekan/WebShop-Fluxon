import type { Category } from "../types";

type CategoryPillProps = {
  category: Category | { id: number; name: string };
  active: boolean;
  onClick: () => void;
};

export function CategoryPill({ category, active, onClick }: CategoryPillProps) {
  return (
    <button className={`category-pill ${active ? "active" : ""}`} onClick={onClick}>
      {category.name}
    </button>
  );
}
