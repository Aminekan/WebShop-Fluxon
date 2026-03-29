import { Link } from "react-router-dom";
import { StatusView } from "../ui/StatusView";

export function NotFoundPage() {
  return (
    <StatusView
      title="Page not found"
      message="This route is not part of the current storefront flow."
      action={
        <Link to="/" className="cta-button">
          Return home
        </Link>
      }
    />
  );
}
