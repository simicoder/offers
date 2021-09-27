export const prepareQueryToSearch = (query: string) => {
  return encodeURIComponent(query.trim());
};

export const addCommasToNumber = (value: number) => {
  return value
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
