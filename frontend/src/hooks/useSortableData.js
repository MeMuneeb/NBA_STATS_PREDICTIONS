import { useState, useMemo } from "react";

const useSortableData = (items, initialConfig = null) => {
  const [sortConfig, setSortConfig] = useState(initialConfig);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "descending") {
      direction = "ascending";
    } else {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortIndicator = (key) => {
    if (sortConfig && sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "↑" : "↓";
    }
    return null;
  };

  return { items: sortedItems, requestSort, sortConfig, sortIndicator };
};

export default useSortableData;
