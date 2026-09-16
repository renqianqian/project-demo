import { useMemo, useState } from 'react';
import { users as initialUsers } from './data/users.js';

const STATUSES = ['在职', '停用'];
const EMPTY_FORM = { name: '', role: '', department: '', status: '在职' };

function nextUserId(users) {
  const max = users.reduce((max, u) => {
    const n = Number(u.id.replace(/\D/g, ''));
    return Number.isFinite(n) ? Math.max(max, n) : max;
  }, 1000);
  return `U-${max + 1}`;
}

function StatusBadge({ status }) {
  const cls = status === '在职' ? 'badge--ok' : 'badge--off';
  return <span className={`badge ${cls}`}>{status}</span>;
}

export default function UsersTab() {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState('');

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      [u.id, u.name, u.role, u.department].some((v) =>
        v.toLowerCase().includes(q)
      ),
    );
  }, [users, query]);

  const canSubmit =
    form.name.trim() !== '' &&
    form.role.trim() !== '' &&
    form.department.trim() !== '';

  function handleAdd(e) {
    e.preventDefault();
    if (!canSubmit) return;
    const user = {
      id: nextUserId(users),
      name: form.name.trim(),
      role: form.role.trim(),
      department: form.department.trim(),
      status: form.status,
    };
    setUsers([...users, user]);
    setForm(EMPTY_FORM);
  }

  function startEdit(u) {
    setEditingId(u.id);
    setEditForm({
      name: u.name,
      role: u.role,
      department: u.department,
      status: u.status,
    });
  }

  function saveEdit() {
    if (
      editForm.name.trim() === '' ||
      editForm.role.trim() === '' ||
      editForm.department.trim() === ''
    ) {
      return;
    }
    setUsers(
      users.map((u) =>
        u.id === editingId
          ? {
              ...u,
              name: editForm.name.trim(),
              role: editForm.role.trim(),
              department: editForm.department.trim(),
              status: editForm.status,
            }
          : u,
      ),
    );
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function removeUser(id) {
    if (window.confirm('确定删除该用户吗？')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  }

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  function setFormField(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }

  function setEditField(field) {
    return (e) => setEditForm({ ...editForm, [field]: e.target.value });
  }

  return (
    <section aria-label="用户列表">
      <form className="user-form" onSubmit={handleAdd}>
        <input
          className="input"
          placeholder="姓名"
          value={form.name}
          onChange={setFormField('name')}
        />
        <input
          className="input"
          placeholder="角色"
          value={form.role}
          onChange={setFormField('role')}
        />
        <input
          className="input"
          placeholder="部门"
          value={form.department}
          onChange={setFormField('department')}
        />
        <select
          className="input input--select"
          value={form.status}
          onChange={setFormField('status')}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn--primary" disabled={!canSubmit}>
          新增用户
        </button>
      </form>

      <div className="toolbar">
        <input
          className="input search"
          placeholder="搜索用户 ID / 姓名 / 角色 / 部门"
          value={query}
          onChange={handleQueryChange}
        />
        <span className="toolbar__count">共 {filtered.length} 个用户</span>
      </div>

      <div className="table-wrap">
        {filtered.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">用户 ID</th>
                <th scope="col">姓名</th>
                <th scope="col">角色</th>
                <th scope="col">部门</th>
                <th scope="col">状态</th>
                <th scope="col">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) =>
                editingId === u.id ? (
                  <tr key={u.id}>
                  <td className="table__id">{u.id}</td>
                  <td>
                    <input
                      className="input input--sm"
                      value={editForm.name}
                      onChange={setEditField('name')}
                    />
                  </td>
                  <td>
                    <input
                      className="input input--sm"
                      value={editForm.role}
                      onChange={setEditField('role')}
                    />
                  </td>
                  <td>
                    <input
                      className="input input--sm"
                      value={editForm.department}
                      onChange={setEditField('department')}
                    />
                  </td>
                  <td>
                    <select
                      className="input input--sm input--select"
                      value={editForm.status}
                      onChange={setEditField('status')}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn--link"
                      onClick={saveEdit}
                    >
                      保存
                    </button>
                    <button
                      type="button"
                      className="btn btn--link"
                      onClick={cancelEdit}
                    >
                      取消
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={u.id}>
                  <td className="table__id">{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.role}</td>
                  <td>{u.department}</td>
                  <td>
                    <StatusBadge status={u.status} />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn--link"
                      onClick={() => startEdit(u)}
                    >
                      编辑
                    </button>
                    <button
                      type="button"
                      className="btn btn--link btn--danger"
                      onClick={() => removeUser(u.id)}
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
        ) : (
          <p className="empty">未找到匹配的用户</p>
        )}
      </div>
    </section>
  );
}