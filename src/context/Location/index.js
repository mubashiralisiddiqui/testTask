import React, { useEffect, useState, useContext } from 'react';
import { setItem, getItem } from "../../utils/helper";
import { USER_KEY } from '../../constant'
import { addLocation, getLocation, deleteLocation } from '../../api/location'

export const LocationContext = React.createContext(null);
export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {

    const [state, setState] = useState({
        locations: [],
        loading: false,
        error: null,
        locationLoading: false
    })
    useEffect(() => {
        handleGetLocation()
    }, [])
    const handleGetLocation = async () => {
        try {
            setState({ ...state, loading: true })
            const res = await getLocation()
            if (res && res.data && res.data.checkins) {
                setState({
                    ...state,
                    locations: res.data.checkins
                })
            }
        } catch (err) {
            setState({ ...state, loading: false })
        }

    }
    const handleDelete = async (id) => {
        try {
            setState({ ...state, locationLoading: true })

            const response = await deleteLocation(id)
            if (response.data) {
                const updatedLocations = state.locations.filter((item) => item.id !== id)
                setState({ ...state, locationLoading: false, locations: updatedLocations })
            }
        } catch (err) {
            setState({ ...state, locationLoading: false })

        }
    }

    const handleAddLocation = async (payload) => {
        try {
            setState({ ...state, locationLoading: true })
            const res = await addLocation(payload)
            if (res) {
                setState({ ...state, locationLoading: false })
                handleGetLocation()
            }
        } catch (err) {
            setState({ ...state, locationLoading: false })
        }
    }
    return (
        <LocationContext.Provider
            value={{
                handleAddLocation,
                handleDelete,
                ...state,
            }}
        >
            {children}
        </LocationContext.Provider>
    )
}