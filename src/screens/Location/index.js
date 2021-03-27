
import React, { useState, useEffect } from 'react';
import { AddTaskButton, TaskList, Dialog } from '../../components'
import { useLocation } from '../../context/Location'
import { CircularProgress } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

const Location = () => {
    const classes = useStyles();

    const { locations, handleAddLocation, loading, handleDelete, locationLoading } = useLocation()
    const [state, setState] = useState({
        open: false,
        latitude: 0,
        longitude: 0,
        stateLoading: false
    })
    useEffect(() => {

        if ("geolocation" in navigator) {
            setState({ ...state, stateLoading: true })

            navigator.geolocation.getCurrentPosition(function (position) {
                setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            });
        } else {
            console.log("Not Available");
            setState({ ...state, stateLoading: false })

        }
    }, [])


    const addLocation = () => {
        const { latitude, longitude } = state
        let formData = new FormData();
        formData.append('latitude', latitude)
        formData.append('longitude', longitude)
        formData.append('address', 'Karachi Pakistan')
        handleAddLocation(formData)
    }
    return (
        <div style={{ backgroundColor: '#fff', width: '100%' }}>
            {
                loading ?
                    < CircularProgress />
                    :
                    <>
                        {
                            <Backdrop
                                className={classes.backdrop}
                                open={locationLoading}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        }
                        <AddTaskButton
                            toggleDialog={addLocation}
                            title="Check In"
                        />
                        <TaskList
                            // handleDelete={handleDelete}
                            isLocation
                            title='Current Location'
                            currentLocationLoading={state.stateLoading}
                            tasks={[{ address: 'Karachi Pakistan', latitude: state.latitude, longitude: state.longitude }]}

                        />
                        <TaskList
                            handleDelete={handleDelete}
                            isLocation
                            title='Previous Locations '
                            tasks={locations}
                        />

                    </>

            }

        </div>
    )
}

export default Location