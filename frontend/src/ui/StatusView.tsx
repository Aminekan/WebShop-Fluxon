import type { ReactNode } from "react";

export function StatusView({
  title,
  message,
  action
}: {
  title: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <section className="status-view">
      <h2>{title}</h2>
      <p>{message}</p>
      {action}
    </section>
  );
}
