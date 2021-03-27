
import React, { useState } from 'react';
import { AddTaskButton, TaskList, Dialog } from '../../components'
import { useTask } from '../../context/Task'
import { CircularProgress } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))
const Tasks = () => {
    const classes = useStyles();

    const { tasks, loading, handleDelete, handleUpdate, taskLoading } = useTask()
    const [state, setState] = useState({
        open: false,
    })
    const toggleDialog = () => {
        setState({ ...state, open: !state.open })
    }
    const completedTask = tasks && tasks.filter(task => task.status === 'completed')
    const incompletTask = tasks && tasks.filter(task => task.status !== 'completed')
    return (
        <div style={{ backgroundColor: '#fff', width: '100%' }}>
            {
                loading ?
                    <CircularProgress />
                    :
                    <>
                        <Dialog
                            taskLoading={taskLoading}
                            toggleDialog={toggleDialog}
                            open={state.open}
                            title='New Task'
                        />
                        {
                            <Backdrop
                                className={classes.backdrop}
                                open={taskLoading}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        }
                        <AddTaskButton
                            toggleDialog={toggleDialog}
                            title="Add new task"
                        />
                        <TaskList
                            title='Incomplete'
                            tasks={incompletTask}
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}
                        />
                        <TaskList
                            title='Completed '
                            tasks={completedTask}
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}

                        />
                    </>
            }

        </div>
    )
}

export default Tasks