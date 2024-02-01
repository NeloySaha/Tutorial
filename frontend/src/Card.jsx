export default function Card({ id, name, age, category, salary }) {
  return (
    <div className="card">
      <p>{id}</p>
      <p>{name}</p>
      <p>{age}</p>
      <p>{category}</p>
      <p>{salary}</p>
    </div>
  );
}
