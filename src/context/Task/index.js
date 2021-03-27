import React, { useEffect, useState, useContext } from 'react';
import { setItem, getItem } from "../../utils/helper";
import { USER_KEY } from '../../constant'
import { createTask, getTask, deleteTask, updateTask } from '../../api/task'

export const TaskContext = React.createContext(null);
export const useTask = () => useContext(TaskContext);
export const TaskProvider = ({ children }) => {

    const [state, setState] = useState({
        tasks: [],
        loading: false,
        error: null,
        taskLoading: false
    })
    useEffect(() => {
        handleGetTask()
    }, [])
    const handleGetTask = async () => {
        try {
            setState({ ...state, loading: true })

            const res = await getTask()
            if (res && res.data && res.data.tasks) {
                setState({
                    ...state,
                    tasks: res.data.tasks
                })
            }
        } catch (err) {
            setState({ ...state, loading: false })
        }

    }
    const handleCreateTask = async (payload, cb) => {
        try {
            setState({ ...state, taskLoading: true })
            const res = await createTask(payload)
            if (res) {
                handleGetTask()
                cb()
            }
        } catch (err) {
            setState({ ...state, taskLoading: false })

        }
    }
    const handleUpdate = async (value) => {
        try {
            setState({ ...state, taskLoading: true })
            const obj = {
                description: value.description,
                status: value.status === 'completed' ? 'inprogress' : 'completed',
                due_at: value.due_at
            }
            const res = await updateTask({ id: value.id, obj })
            if (res) {
                const updateTask = state.tasks.map((item) => {
                    if (item.id === value.id) {
                        item.status = value.status === 'completed' ? 'inprogress' : 'completed'
                    }
                    return item
                })
                setState({ ...state, tasks: updateTask })
            }
        } catch (err) {
            setState({ ...state, taskLoading: false })

        }

    }
    const handleDelete = async (id) => {
        try {
            setState({ ...state, taskLoading: true })
            const response = await deleteTask(id)
            if (response.data) {
                const remainingTask = state.tasks.filter((item) => item.id !== id)
                setState({ ...state, taskLoading: false, tasks: remainingTask })
            }

        } catch (err) {
            setState({ ...state, taskLoading: false })

        }
    }

    return (
        <TaskContext.Provider
            value={{
                handleCreateTask,
                handleDelete,
                handleUpdate,
                ...state,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}