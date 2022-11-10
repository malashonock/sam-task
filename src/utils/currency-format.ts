const getCurrencyString = (num: number): string =>
  `${num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}`;

export default getCurrencyString;
