import { useState } from "react";

export default function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();
    
    if (!description.trim()) {
      alert("Please enter an item description.");
      return;
    }
    
    if (description.trim().length < 2) {
      alert("Item description must be at least 2 characters long.");
      return;
    }
    const newItem = {
      description: description.trim(),
      quantity,
      packed: false,
      id: Date.now(),
    };
    console.log("New item added:", newItem);
    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip 😍? </h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={50}
        autoFocus
      />
      <button>Add</button>
    </form>
  );
}
