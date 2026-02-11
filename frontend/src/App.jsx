import { useMemo, useState } from 'react'
import './App.css'

const translations = {
  fr: {
    title: 'Pilotage NovaTech',
    subtitle:
      'Révision de la logique: projets, tâches, rôles/permissions, utilisateurs, devis, profils et sécurité mot de passe.',
    language: 'Langue',
    projects: 'Projets et tâches',
    users: 'Utilisateurs, rôles et permissions',
    quotes: 'Devis',
    profile: 'Vue profil',
    security: 'Sécurité mot de passe',
    id: 'ID',
    name: 'Nom',
    status: 'Statut',
    visibility: 'Visibilité',
    tasks: 'Tâches',
    owner: 'Propriétaire',
    role: 'Rôle',
    permissions: 'Permissions',
    cannotPublishPrivate: 'Un projet privé ne peut pas être rendu public.',
    toggleVisibility: 'Basculer la visibilité',
    development: 'En développement',
    inProgress: 'En cours',
    production: 'En production',
    private: 'Privé',
    public: 'Public',
    resetPassword: 'Réinitialiser le mot de passe',
    resetSent: 'Email de réinitialisation envoyé à',
    changeOwnPasswordOnly: 'Seul l’utilisateur connecté peut changer son mot de passe.',
    changePassword: 'Changer mon mot de passe',
    profileHint: 'Le profil affiche le rôle, les permissions actives et les devis associés.',
    quoteStatus: 'État devis',
    submitted: 'Soumis',
    reviewed: 'Revu',
    approved: 'Approuvé',
    amount: 'Montant',
    project: 'Projet',
    noSecurityEvent: 'Aucun événement pour le moment.',
    passwordChanged: 'a changé son mot de passe.',
  },
  en: {
    title: 'NovaTech Control Panel',
    subtitle:
      'Logic revision: projects, tasks, roles/permissions, users, quotes, profile views and password security.',
    language: 'Language',
    projects: 'Projects and tasks',
    users: 'Users, roles and permissions',
    quotes: 'Quotes',
    profile: 'Profile view',
    security: 'Password security',
    id: 'ID',
    name: 'Name',
    status: 'Status',
    visibility: 'Visibility',
    tasks: 'Tasks',
    owner: 'Owner',
    role: 'Role',
    permissions: 'Permissions',
    cannotPublishPrivate: 'A private project cannot be made public.',
    toggleVisibility: 'Toggle visibility',
    development: 'Development',
    inProgress: 'In progress',
    production: 'Production',
    private: 'Private',
    public: 'Public',
    resetPassword: 'Reset password',
    resetSent: 'Password reset email sent to',
    changeOwnPasswordOnly: 'Only the authenticated user can change their own password.',
    changePassword: 'Change my password',
    profileHint: 'Profile includes role, active permissions and linked quotes.',
    quoteStatus: 'Quote state',
    submitted: 'Submitted',
    reviewed: 'Reviewed',
    approved: 'Approved',
    amount: 'Amount',
    project: 'Project',
    noSecurityEvent: 'No event yet.',
    passwordChanged: 'changed their password.',
  },
}

const rolePermissions = {
  admin: ['users.manage', 'roles.manage', 'projects.manage', 'quotes.manage', 'profiles.view'],
  editor: ['projects.manage', 'quotes.view', 'profiles.view'],
  client: ['projects.view_public', 'quotes.create', 'profiles.view_own'],
}

const initialProjects = [
  {
    id: 1,
    name: 'Portail Retail',
    status: 'development',
    visibility: 'private',
    tasks: [
      { id: 'T-101', title: 'Audit UX', state: 'in_progress' },
      { id: 'T-102', title: 'API catalogue', state: 'development' },
    ],
  },
  {
    id: 2,
    name: 'Marketplace B2B',
    status: 'production',
    visibility: 'public',
    tasks: [
      { id: 'T-201', title: 'Monitoring SLA', state: 'production' },
      { id: 'T-202', title: 'Optimisation SEO', state: 'in_progress' },
    ],
  },
]

const initialUsers = [
  { id: 1, name: 'Admin One', email: 'admin@nova.local', role: 'admin' },
  { id: 2, name: 'Amina Editor', email: 'editor@nova.local', role: 'editor' },
  { id: 3, name: 'Yassine Client', email: 'client@nova.local', role: 'client' },
]

const initialQuotes = [
  { id: 'Q-1', userId: 3, projectId: 1, amount: 2800, status: 'submitted' },
  { id: 'Q-2', userId: 3, projectId: 2, amount: 5200, status: 'reviewed' },
]

function App() {
  const [locale, setLocale] = useState('fr')
  const t = translations[locale]

  const [projects, setProjects] = useState(initialProjects)
  const [users] = useState(initialUsers)
  const [quotes] = useState(initialQuotes)
  const [currentUserId, setCurrentUserId] = useState(1)
  const [securityLog, setSecurityLog] = useState([])

  const currentUser = useMemo(
    () => users.find((user) => user.id === currentUserId) ?? users[0],
    [users, currentUserId],
  )

  const translateState = (state) => ({
    development: t.development,
    in_progress: t.inProgress,
    production: t.production,
    private: t.private,
    public: t.public,
    submitted: t.submitted,
    reviewed: t.reviewed,
    approved: t.approved,
  })[state] ?? state

  const toggleProjectVisibility = (projectId) => {
    setProjects((previous) =>
      previous.map((project) => {
        if (project.id !== projectId) {
          return project
        }

        if (project.visibility === 'private') {
          return { ...project, lockReason: t.cannotPublishPrivate }
        }

        return { ...project, visibility: project.visibility === 'public' ? 'private' : 'public', lockReason: '' }
      }),
    )
  }

  const resetUserPassword = (user) => {
    if (currentUser.role !== 'admin') {
      return
    }

    setSecurityLog((previous) => [
      `${new Date().toLocaleTimeString(locale)} - ${t.resetSent} ${user.email}`,
      ...previous,
    ])
  }

  const changeMyPassword = (targetUser) => {
    if (targetUser.id !== currentUser.id) {
      setSecurityLog((previous) => [`${new Date().toLocaleTimeString(locale)} - ${t.changeOwnPasswordOnly}`, ...previous])
      return
    }

    setSecurityLog((previous) => [
      `${new Date().toLocaleTimeString(locale)} - ${targetUser.email} ${t.passwordChanged}`,
      ...previous,
    ])
  }

  return (
    <main className="container">
      <header className="panel">
        <div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <label>
          {t.language}
          <select value={locale} onChange={(event) => setLocale(event.target.value)}>
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
        </label>
      </header>

      <section className="panel">
        <h2>{t.profile}</h2>
        <p>{t.profileHint}</p>
        <div className="profile-row">
          <label>
            {t.owner}
            <select value={currentUserId} onChange={(event) => setCurrentUserId(Number(event.target.value))}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <div>
            <strong>{t.role}: </strong>
            {currentUser.role}
          </div>
          <div>
            <strong>{t.permissions}: </strong>
            {rolePermissions[currentUser.role].join(', ')}
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>{t.projects}</h2>
        <table>
          <thead>
            <tr>
              <th>{t.id}</th>
              <th>{t.name}</th>
              <th>{t.status}</th>
              <th>{t.visibility}</th>
              <th>{t.tasks}</th>
              <th>{t.toggleVisibility}</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{translateState(project.status)}</td>
                <td>
                  {translateState(project.visibility)}
                  {project.lockReason ? <span className="warning"> - {project.lockReason}</span> : null}
                </td>
                <td>
                  {project.tasks.map((task) => (
                    <div key={task.id}>
                      {task.id} · {task.title} ({translateState(task.state)})
                    </div>
                  ))}
                </td>
                <td>
                  <button type="button" onClick={() => toggleProjectVisibility(project.id)}>
                    {t.toggleVisibility}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <h2>{t.users}</h2>
        {users.map((user) => (
          <article key={user.id} className="user-card">
            <div>
              <strong>{user.name}</strong> — {user.email}
            </div>
            <div>
              {t.role}: {user.role}
            </div>
            <div>
              {t.permissions}: {rolePermissions[user.role].join(', ')}
            </div>
            <div className="actions">
              <button type="button" onClick={() => resetUserPassword(user)}>
                {t.resetPassword}
              </button>
              <button type="button" onClick={() => changeMyPassword(user)}>
                {t.changePassword}
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="panel">
        <h2>{t.quotes}</h2>
        <table>
          <thead>
            <tr>
              <th>{t.id}</th>
              <th>{t.owner}</th>
              <th>{t.project}</th>
              <th>{t.amount}</th>
              <th>{t.quoteStatus}</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => {
              const owner = users.find((user) => user.id === quote.userId)
              const project = projects.find((item) => item.id === quote.projectId)

              return (
                <tr key={quote.id}>
                  <td>{quote.id}</td>
                  <td>{owner?.name}</td>
                  <td>{project?.name}</td>
                  <td>{quote.amount} €</td>
                  <td>{translateState(quote.status)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <h2>{t.security}</h2>
        <ul>
          {securityLog.map((line) => (
            <li key={line}>{line}</li>
          ))}
          {securityLog.length === 0 ? <li>{t.noSecurityEvent}</li> : null}
        </ul>
      </section>
    </main>
  )
}

export default App
