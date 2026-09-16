import { useState } from 'react';
import { projects } from './data/projects.js';
import UsersTab from './UsersTab.jsx';

const TABS = [
  { key: 'projects', label: '项目管理' },
  { key: 'users', label: '用户管理' },
];

export default function App() {
  const [tab, setTab] = useState('projects');

  return (
    <div className="page">
      <header className="page__header">
        <h1>项目管理</h1>
        <p className="page__subtitle">项目只读 · 用户管理支持增删改查(mock)</p>
      </header>

      <nav className="tabs" aria-label="功能导航">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`tab${tab === t.key ? ' tab--active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === 'projects' && (
        <section aria-label="项目列表">
          <p className="section__count">共 {projects.length} 个项目</p>
          <div className="grid">
            {projects.map((p) => (
              <article key={p.id} className="card">
                <div className="card__id">{p.id}</div>
                <div className="card__name">{p.name}</div>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === 'users' && <UsersTab />}
    </div>
  );
}