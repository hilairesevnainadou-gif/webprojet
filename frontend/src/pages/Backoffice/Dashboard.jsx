export default function Dashboard({ stats }) {
  return <section><h1>Dashboard</h1><div className="grid">{Object.entries(stats).map(([k,v]) => <div key={k} className="card"><h3>{k}</h3><p>{v}</p></div>)}</div></section>;
}
