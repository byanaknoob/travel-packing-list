import { useState, useEffect } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import Footer from "./Footer";

export default function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('travelListItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('travelListItems', JSON.stringify(items));
  }, [items]);
  function addItem(newItem) {
    setItems((currentItems) => [...currentItems, newItem]);
  }
  function removeItem(id) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }
  function toggleItemPacked(id) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function clearItems() {
    const confirmed = window.confirm(
      "Are you sure you want to clear all items?"
    );
    if (confirmed) {
      setItems([]);
    }
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addItem} />
      <PackingList
        items={items}
        onDeleteItem={removeItem}
        onUpdateItem={toggleItemPacked}
        onClearItems={clearItems}
      />
      <Stats items={items} />
      <Footer />
    </div>
  );
}
