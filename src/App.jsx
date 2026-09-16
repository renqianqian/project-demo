import { useState } from 'react';
import { projects } from './data/projects.js';
import { users } from './data/users.js';

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
        <p className="page__subtitle">readonly 只读 mock 演示</p>
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

      {tab === 'users' && (
        <section aria-label="用户列表">
          <p className="section__count">共 {users.length} 个用户</p>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">用户 ID</th>
                  <th scope="col">姓名</th>
                  <th scope="col">角色</th>
                  <th scope="col">部门</th>
                  <th scope="col">状态</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="table__id">{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.role}</td>
                    <td>{u.department}</td>
                    <td>
                      <span
                        className={`badge${
                          u.status === '在职' ? ' badge--ok' : ' badge--off'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}