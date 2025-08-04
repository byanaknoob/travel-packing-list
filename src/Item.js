export default function Item({ item, onDeleteItem, onUpdateItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onClick={() => onUpdateItem(item.id)}
      />
      <span style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
