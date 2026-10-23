import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { FolderKanban, FolderOpen, Plus } from 'lucide-react'
import EmptyState from '../components/EmptyState.jsx'
import ErrorPanel from '../components/ErrorPanel.jsx'
import FormAlert from '../components/FormAlert.jsx'
import KanbanBoard from '../components/KanbanBoard.jsx'
import LoadingPanel from '../components/LoadingPanel.jsx'
import Select from '../components/Select.jsx'
import TaskForm from '../components/TaskForm.jsx'
import {
  createTask,
  deleteTask,
  listTasks,
  updateTask,
} from '../services/tasks.js'
import { listProjects } from '../services/projects.js'
import { listWorkspaces } from '../services/workspaces.js'
import { useAuth } from '../context/authContext.js'
import { buildBoardColumns, getStatusForColumn } from '../utils/kanban.js'

const primaryButtonClass =
  'inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-indigo-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-50'

const secondaryButtonClass =
  'inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25'

function parseIdParam(value) {
  const id = Number(value)
  return Number.isSafeInteger(id) && id > 0 ? id : null
}

function TasksPage() {
  const { user } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()

  const [workspaces, setWorkspaces] = useState([])
  const [workspacesStatus, setWorkspacesStatus] = useState('loading')
  const [workspacesError, setWorkspacesError] = useState(null)
  const [workspaceReloadKey, setWorkspaceReloadKey] = useState(0)
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(() =>
    parseIdParam(searchParams.get('workspaceId')),
  )

  const [projects, setProjects] = useState([])
  const [projectsStatus, setProjectsStatus] = useState('idle')
  const [projectsError, setProjectsError] = useState(null)
  const [projectReloadKey, setProjectReloadKey] = useState(0)
  const [selectedProjectId, setSelectedProjectId] = useState(() =>
    parseIdParam(searchParams.get('projectId')),
  )

  const [tasks, setTasks] = useState([])
  const [tasksStatus, setTasksStatus] = useState('idle')
  const [tasksError, setTasksError] = useState(null)
  const [taskReloadKey, setTaskReloadKey] = useState(0)

  const [taskEditor, setTaskEditor] = useState(null)
  const [boardError, setBoardError] = useState('')
  const [pendingMove, setPendingMove] = useState(null)
  const movingRef = useRef(false)
  const selectedProjectIdRef = useRef(selectedProjectId)

  const selectedWorkspace =
    workspaces.find((workspace) => workspace.id === selectedWorkspaceId) || null
  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) || null
  const columns = useMemo(() => buildBoardColumns(tasks), [tasks])
  const canCreateTask =
    selectedProject !== null &&
    tasksStatus === 'ready' &&
    taskEditor === null &&
    pendingMove === null

  useEffect(() => {
    selectedProjectIdRef.current = selectedProjectId
  }, [selectedProjectId])

  useEffect(() => {
    if (selectedWorkspaceId === null) {
      return
    }

    const nextParams = new URLSearchParams(searchParams)
    const workspaceValue = String(selectedWorkspaceId)
    const projectValue =
      selectedProjectId === null ? null : String(selectedProjectId)
    let changed = false

    if (nextParams.get('workspaceId') !== workspaceValue) {
      nextParams.set('workspaceId', workspaceValue)
      changed = true
    }

    if (projectValue === null) {
      if (nextParams.has('projectId')) {
        nextParams.delete('projectId')
        changed = true
      }
    } else if (nextParams.get('projectId') !== projectValue) {
      nextParams.set('projectId', projectValue)
      changed = true
    }

    if (changed) {
      setSearchParams(nextParams, { replace: true })
    }
  }, [
    selectedWorkspaceId,
    selectedProjectId,
    searchParams,
    setSearchParams,
  ])

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
    setTaskEditor(null)
    setBoardError('')

    if (selectedWorkspaceId === null) {
      setProjects([])
      setProjectsStatus('idle')
      setProjectsError(null)
      setSelectedProjectId(null)
      setTasks([])
      setTasksStatus('idle')
      setTasksError(null)
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
        setSelectedProjectId((currentId) => {
          if (
            currentId !== null &&
            nextProjects.some((project) => project.id === currentId)
          ) {
            return currentId
          }

          return nextProjects[0]?.id ?? null
        })
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

  useEffect(() => {
    setTaskEditor(null)
    setBoardError('')

    if (selectedProjectId === null || projectsStatus !== 'ready') {
      setTasks([])
      setTasksStatus('idle')
      setTasksError(null)
      return undefined
    }

    let active = true

    setTasks([])
    setTasksStatus('loading')
    setTasksError(null)

    async function loadTasks() {
      try {
        const nextTasks = await listTasks(selectedProjectId)

        if (!active) {
          return
        }

        setTasks(nextTasks)
        setTasksStatus('ready')
      } catch (error) {
        if (!active) {
          return
        }

        setTasksStatus('error')
        setTasksError(error)
      }
    }

    loadTasks()

    return () => {
      active = false
    }
  }, [selectedProjectId, projectsStatus, taskReloadKey])

  function handleWorkspaceChange(event) {
    const nextWorkspaceId = parseIdParam(event.target.value)

    if (nextWorkspaceId === selectedWorkspaceId) {
      return
    }

    setTaskEditor(null)
    setBoardError('')
    setSelectedWorkspaceId(nextWorkspaceId)
    setSelectedProjectId(null)
    setProjects([])
    setProjectsStatus(nextWorkspaceId === null ? 'idle' : 'loading')
    setProjectsError(null)
    setTasks([])
    setTasksStatus('idle')
    setTasksError(null)
  }

  function handleProjectChange(event) {
    const nextProjectId = parseIdParam(event.target.value)

    if (nextProjectId === selectedProjectId) {
      return
    }

    setTaskEditor(null)
    setBoardError('')
    setSelectedProjectId(nextProjectId)
    setTasks([])
    setTasksStatus('idle')
    setTasksError(null)
  }

  function openCreateTask() {
    if (selectedProject === null) {
      return
    }

    setBoardError('')
    setTaskEditor({ mode: 'create' })
  }

  function openEditTask(task) {
    setBoardError('')
    setTaskEditor({ mode: 'edit', task })
  }

  async function handleCreateTask(payload) {
    if (selectedProjectId === null) {
      throw new Error('Select a project before creating a task.')
    }

    const projectId = selectedProjectId
    const task = await createTask(projectId, payload)

    if (selectedProjectIdRef.current !== projectId) {
      return task
    }

    setTasks((current) => [...current, task])
    setTaskEditor((current) => (current?.mode === 'create' ? null : current))
    return task
  }

  async function handleUpdateTask(taskId, payload) {
    const task = await updateTask(taskId, payload)

    setTasks((current) =>
      current.map((item) => (item.id === task.id ? task : item)),
    )
    setTaskEditor((current) =>
      current?.mode === 'edit' && current.task.id === taskId ? null : current,
    )
    return task
  }

  async function handleDeleteTask(taskId) {
    await deleteTask(taskId)

    setTasks((current) => current.filter((task) => task.id !== taskId))
    setTaskEditor((current) =>
      current?.mode === 'edit' && current.task.id === taskId ? null : current,
    )
  }

  async function handleMoveTask(taskId, _fromColumnId, toColumnId) {
    if (movingRef.current) {
      return
    }

    const status = getStatusForColumn(toColumnId)

    if (!status) {
      setBoardError('That board column is not available.')
      return
    }

    movingRef.current = true
    setBoardError('')
    setPendingMove({ taskId, columnId: toColumnId })

    try {
      const updatedTask = await updateTask(taskId, { status })

      setTasks((current) =>
        current.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      )
    } catch (error) {
      setBoardError(
        error?.message || 'Unable to move this task. Please try again.',
      )
    } finally {
      movingRef.current = false
      setPendingMove(null)
    }
  }

  function retryWorkspaces() {
    setWorkspaceReloadKey((key) => key + 1)
  }

  function retryProjects() {
    setProjectReloadKey((key) => key + 1)
  }

  function retryTasks() {
    setTaskReloadKey((key) => key + 1)
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Tasks</h1>
          <p className="mt-1 text-sm text-slate-500">
            Track task progress on the Kanban board.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateTask}
          disabled={!canCreateTask}
          className={primaryButtonClass}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </button>
      </header>

      {workspacesStatus === 'ready' && workspaces.length > 0 && (
        <section
          aria-label="Task project selection"
          className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2"
        >
          <Select
            label="Workspace"
            id="task-workspace"
            name="taskWorkspace"
            value={selectedWorkspaceId ?? ''}
            onChange={handleWorkspaceChange}
            options={workspaces.map((workspace) => ({
              value: String(workspace.id),
              label: workspace.name,
            }))}
            disabled={workspacesStatus !== 'ready'}
          />
          <Select
            label="Project"
            id="task-project"
            name="taskProject"
            value={selectedProjectId ?? ''}
            onChange={handleProjectChange}
            options={projects.map((project) => ({
              value: String(project.id),
              label: project.name,
            }))}
            disabled={projectsStatus !== 'ready' || projects.length === 0}
          />
        </section>
      )}

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

      {workspacesStatus === 'ready' && workspaces.length === 0 && (
        <div className="space-y-4">
          <EmptyState
            icon={FolderKanban}
            title="No workspaces yet"
            description="Create a workspace and project in Projects before adding tasks."
          />
          <div className="text-center">
            <Link to="/dashboard/projects" className={secondaryButtonClass}>
              Go to Projects
            </Link>
          </div>
        </div>
      )}

      {workspacesStatus === 'ready' && selectedWorkspace && (
        <div className="space-y-4">
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

          {projectsStatus === 'ready' && projects.length === 0 && (
            <div className="space-y-4">
              <EmptyState
                icon={FolderOpen}
                title="No projects yet"
                description="Create a project in this workspace before adding tasks."
              />
              <div className="text-center">
                <Link to="/dashboard/projects" className={secondaryButtonClass}>
                  Go to Projects
                </Link>
              </div>
            </div>
          )}

          {projectsStatus === 'ready' && selectedProject && (
            <div className="space-y-4">
              {taskEditor && (
                <TaskForm
                  key={
                    taskEditor.mode === 'edit'
                      ? `edit-${taskEditor.task.id}`
                      : 'create'
                  }
                  mode={taskEditor.mode}
                  task={
                    taskEditor.mode === 'edit' ? taskEditor.task : undefined
                  }
                  currentUser={user}
                  onSubmit={
                    taskEditor.mode === 'edit'
                      ? (payload) =>
                          handleUpdateTask(taskEditor.task.id, payload)
                      : handleCreateTask
                  }
                  onCancel={() => setTaskEditor(null)}
                />
              )}

              <FormAlert message={boardError} />

              {(tasksStatus === 'loading' || tasksStatus === 'idle') && (
                <LoadingPanel label="Loading tasks…" />
              )}

              {tasksStatus === 'error' && (
                <ErrorPanel
                  message={
                    tasksError?.message ||
                    'Unable to load tasks in this project.'
                  }
                  onRetry={retryTasks}
                  label="Try again"
                />
              )}

              {tasksStatus === 'ready' && (
                <KanbanBoard
                  columns={columns}
                  onMoveTask={handleMoveTask}
                  onEditTask={openEditTask}
                  onDeleteTask={handleDeleteTask}
                  pendingMove={pendingMove}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TasksPage
