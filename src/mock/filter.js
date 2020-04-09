const filterNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `archive`];
export const generateFilters = () => filterNames.map((it) => {
  return {title: it, count: Math.floor(Math.random() * 10),};
});
