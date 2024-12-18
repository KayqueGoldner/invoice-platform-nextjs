interface formatCurrencyProps {
  amount: number;
  currency: "USD" | "EUR" | string;
}

export const formatCurrency = ({ amount, currency }: formatCurrencyProps) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};
