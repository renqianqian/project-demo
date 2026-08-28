import { projects } from './data/projects.js';

export default function App() {
  return (
    <div className="page">
      <header className="page__header">
        <h1>项目管理</h1>
        <p className="page__subtitle">共 {projects.length} 个项目(只读 mock)</p>
      </header>

      <section className="grid" aria-label="项目列表">
        {projects.map((p) => (
          <article key={p.id} className="card">
            <div className="card__id">{p.id}</div>
            <div className="card__name">{p.name}</div>
          </article>
        ))}
      </section>
    </div>
  );
}