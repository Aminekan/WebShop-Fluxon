type QuantityControlProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

export function QuantityControl({ value, min = 1, max = 99, onChange }: QuantityControlProps) {
  const nextDown = Math.max(min, value - 1);
  const nextUp = Math.min(max, value + 1);

  return (
    <div className="quantity-control">
      <button onClick={() => onChange(nextDown)} disabled={value <= min}>
        -
      </button>
      <span>{value}</span>
      <button onClick={() => onChange(nextUp)} disabled={value >= max}>
        +
      </button>
    </div>
  );
}
