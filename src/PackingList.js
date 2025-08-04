import { useState } from "react";
import Item from "./Item";
export default function PackingList({
  items,
  onDeleteItem,
  onUpdateItem,
  onClearItems,
}) {
  const [sortBy, setSortBy] = useState("input");
  const [searchTerm, setSearchTerm] = useState("");
  // Filter items based on search term
  const filteredItems = items.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered items
  let sortedItems;
  if (sortBy === "description") {
    sortedItems = [...filteredItems].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  } else if (sortBy === "packed") {
    sortedItems = [...filteredItems].sort((a, b) => a.packed - b.packed);
  } else {
    sortedItems = filteredItems;
  }

  return (
    <div className="list">
      {items.length > 0 && (
        <div className="search-container">
          <span className="search-label">🔍</span>
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      )}
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearItems}>Clear list</button>
      </div>
    </div>
  );
}
