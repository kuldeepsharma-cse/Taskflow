import { useEffect, useState } from 'react'
import { FolderKanban, FolderOpen, Plus } from 'lucide-react'
import EmptyState from '../components/EmptyState.jsx'
import ErrorPanel from '../components/ErrorPanel.jsx'
import LoadingPanel from '../components/LoadingPanel.jsx'
import ProjectForm from '../components/ProjectForm.jsx'
import ProjectListItem from '../components/ProjectListItem.jsx'
import WorkspaceSidebar from '../components/WorkspaceSidebar.jsx'
import {
  createProject,
  deleteProject,
  listProjects,
  updateProject,
} from '../services/projects.js'
import {
  createWorkspace,
  deleteWorkspace,
  listWorkspaces,
  renameWorkspace,
} from '../services/workspaces.js'

const primaryButtonClass =
  'inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-indigo-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-50'

function ProjectsPage() {
  const [workspaces, setWorkspaces] = useState([])
  const [workspacesStatus, setWorkspacesStatus] = useState('loading')
  const [workspacesError, setWorkspacesError] = useState(null)
  const [workspaceReloadKey, setWorkspaceReloadKey] = useState(0)
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null)

  const [projects, setProjects] = useState([])
  const [projectsStatus, setProjectsStatus] = useState('idle')
  const [projectsError, setProjectsError] = useState(null)
  const [projectReloadKey, setProjectReloadKey] = useState(0)
  const [projectEditor, setProjectEditor] = useState(null)

  const selectedWorkspace =
    workspaces.find((workspace) => workspace.id === selectedWorkspaceId) || null
  const canCreateProject =
    selectedWorkspaceId !== null &&
    projectsStatus === 'ready' &&
    projectEditor === null

  useEffect(() => {
    let active = true

    setWorkspacesStatus('loading')
    setWorkspacesError(null)

    async function loadWorkspaces() {
      try {
        const nextWorkspaces = await listWorkspaces()

        if (!active) {
          return
        }

        setWorkspaces(nextWorkspaces)
        setWorkspacesStatus('ready')
        setSelectedWorkspaceId((currentId) => {
          if (
            currentId !== null &&
            nextWorkspaces.some((workspace) => workspace.id === currentId)
          ) {
            return currentId
          }

          return nextWorkspaces[0]?.id ?? null
        })
      } catch (error) {
        if (!active) {
          return
        }

        setWorkspacesStatus('error')
        setWorkspacesError(error)
      }
    }

    loadWorkspaces()

    return () => {
      active = false
    }
  }, [workspaceReloadKey])

  useEffect(() => {
    setProjectEditor(null)

    if (selectedWorkspaceId === null) {
      setProjects([])
      setProjectsStatus('idle')
      setProjectsError(null)
      return undefined
    }

    let active = true

    setProjects([])
    setProjectsStatus('loading')
    setProjectsError(null)

    async function loadProjects() {
      try {
        const nextProjects = await listProjects(selectedWorkspaceId)

        if (!active) {
          return
        }

        setProjects(nextProjects)
        setProjectsStatus('ready')
      } catch (error) {
        if (!active) {
          return
        }

        setProjectsStatus('error')
        setProjectsError(error)
      }
    }

    loadProjects()

    return () => {
      active = false
    }
  }, [selectedWorkspaceId, projectReloadKey])

  async function handleCreateWorkspace(payload) {
    const workspace = await createWorkspace(payload)
    setWorkspaces((current) => [workspace, ...current])
    setSelectedWorkspaceId(workspace.id)
    return workspace
  }

  async function handleRenameWorkspace(workspaceId, payload) {
    const workspace = await renameWorkspace(workspaceId, payload)
    setWorkspaces((current) =>
      current.map((item) => (item.id === workspace.id ? workspace : item)),
    )
    return workspace
  }

  async function handleDeleteWorkspace(workspaceId) {
    await deleteWorkspace(workspaceId)

    const remainingWorkspaces = workspaces.filter(
      (workspace) => workspace.id !== workspaceId,
    )

    setWorkspaces(remainingWorkspaces)

    if (selectedWorkspaceId === workspaceId) {
      setSelectedWorkspaceId(remainingWorkspaces[0]?.id ?? null)
    }
  }

  async function handleCreateProject(payload) {
    if (selectedWorkspaceId === null) {
      throw new Error('Select a workspace before creating a project.')
    }

    const project = await createProject(selectedWorkspaceId, payload)
    setProjects((current) => [project, ...current])
    setProjectsStatus('ready')
    setProjectEditor(null)
    return project
  }

  async function handleUpdateProject(projectId, payload) {
    const project = await updateProject(projectId, payload)
    setProjects((current) =>
      current.map((item) => (item.id === project.id ? project : item)),
    )
    setProjectEditor(null)
    return project
  }

  async function handleDeleteProject(projectId) {
    await deleteProject(projectId)
    setProjects((current) =>
      current.filter((project) => project.id !== projectId),
    )
    setProjectEditor(null)
  }

  function retryWorkspaces() {
    setWorkspaceReloadKey((key) => key + 1)
  }

  function retryProjects() {
    setProjectReloadKey((key) => key + 1)
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Projects</h1>
          <p className="mt-1 text-sm text-slate-500">
            Organize your work into workspaces and projects.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setProjectEditor({ mode: 'create' })}
          disabled={!canCreateProject}
          className={primaryButtonClass}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <WorkspaceSidebar
          workspaces={workspaces}
          selectedWorkspaceId={selectedWorkspaceId}
          status={workspacesStatus}
          error={workspacesError}
          onSelect={setSelectedWorkspaceId}
          onCreate={handleCreateWorkspace}
          onRename={handleRenameWorkspace}
          onDelete={handleDeleteWorkspace}
          onRetry={retryWorkspaces}
        />

        <section
          aria-labelledby={selectedWorkspace ? 'projects-heading' : undefined}
          aria-label={selectedWorkspace ? undefined : 'Project management'}
          className="min-w-0"
        >
          {workspacesStatus === 'loading' && (
            <LoadingPanel label="Loading workspaces…" />
          )}

          {workspacesStatus === 'error' && (
            <ErrorPanel
              message={
                workspacesError?.message ||
                'Unable to load your workspaces. Please try again.'
              }
              onRetry={retryWorkspaces}
              label="Try again"
            />
          )}

          {workspacesStatus === 'ready' && !selectedWorkspace && (
            <EmptyState
              icon={FolderKanban}
              title="No workspaces yet"
              description="Create a workspace in the Workspaces panel to start adding projects."
            />
          )}

          {workspacesStatus === 'ready' && selectedWorkspace && (
            <div className="space-y-4">
              <div>
                <h2
                  id="projects-heading"
                  className="break-words text-lg font-semibold text-slate-900"
                >
                  {selectedWorkspace.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Projects in this workspace
                </p>
              </div>

              {projectEditor && (
                <ProjectForm
                  key={
                    projectEditor.mode === 'edit'
                      ? `edit-${projectEditor.project.id}`
                      : 'create'
                  }
                  mode={projectEditor.mode}
                  project={
                    projectEditor.mode === 'edit'
                      ? projectEditor.project
                      : undefined
                  }
                  onSubmit={(payload) =>
                    projectEditor.mode === 'edit'
                      ? handleUpdateProject(projectEditor.project.id, payload)
                      : handleCreateProject(payload)
                  }
                  onCancel={() => setProjectEditor(null)}
                />
              )}

              {(projectsStatus === 'loading' || projectsStatus === 'idle') && (
                <LoadingPanel label="Loading projects…" />
              )}

              {projectsStatus === 'error' && (
                <ErrorPanel
                  message={
                    projectsError?.message ||
                    'Unable to load projects in this workspace.'
                  }
                  onRetry={retryProjects}
                  label="Try again"
                />
              )}

              {projectsStatus === 'ready' &&
                projects.length === 0 &&
                !projectEditor && (
                  <div className="space-y-4">
                    <EmptyState
                      icon={FolderOpen}
                      title="No projects yet"
                      description="Create the first project in this workspace."
                    />
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setProjectEditor({ mode: 'create' })}
                        className={primaryButtonClass}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create project
                      </button>
                    </div>
                  </div>
                )}

              {projectsStatus === 'ready' && projects.length > 0 && (
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  {projects.map((project) => (
                    <ProjectListItem
                      key={project.id}
                      project={project}
                      onEdit={(item) =>
                        setProjectEditor({ mode: 'edit', project: item })
                      }
                      onDelete={handleDeleteProject}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default ProjectsPage
