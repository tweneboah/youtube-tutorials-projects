const currencyFormatter = (symbol, amount) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: symbol,
  }).format(amount);
};

export default currencyFormatter;
