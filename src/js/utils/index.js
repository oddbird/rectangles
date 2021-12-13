import { isNaN, isNull } from "lodash";

const USDFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export const formatCurrency = (input) => {
  if (isNull(input)) {
    return null;
  }
  const output = Number(input);
  return isNaN(output) ? null : USDFormatter.format(output);
};
