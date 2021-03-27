import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import { CircularProgress } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        marginBottom: 20
    },
    typography: {
        textAlign: 'left',
        paddingLeft: '20px'
    },
    locationIcon: {
        position: 'static',
        width: '24px',
        height: '23px',
        left: '0px',
        top: '0px',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '18px',
        lineHeight: '24px',
        textAlign: 'center',
        color: '#000000'
    },
    created_at: {
        color: '#B9B9BE'
    },
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px'

    }
}));

export default function TaskList({ title = '', isLast = false, currentLocationLoading = false,
    isLocation = false, tasks = [], handleDelete = () => { }, handleUpdate = () => { } }) {

    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    const handleTime = (date) => {
        if (date) {
            const dateTime = new Date(date)
            return dateTime.toUTCString()
        }
        return ''

    }

    return (
        <List className={classes.root}>
            <Typography className={classes.typography}>{title}</Typography>
            {tasks && tasks.map((value, i) => {
                const labelId = `checkbox-list-label-${value}`;
                return (
                    <ListItem key={i} dense button onClick={handleToggle(value)}>
                        <ListItemIcon>
                            {
                                currentLocationLoading &&
                                <CircularProgress />
                            }
                            {isLocation ?
                                <LocationOnIcon />
                                :
                                <Checkbox
                                    onClick={() => handleUpdate(value)}
                                    edge="start"
                                    checked={value.status === 'completed'}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            }

                        </ListItemIcon>
                        {isLocation ?
                            <>
                                <ListItemText id={labelId}
                                    primary={`${value.address}`} secondary={`${value.latitude},${value.longitude}`}
                                />
                            </>
                            :
                            <>
                                <ListItemText id={labelId} primary={`${value.description}`} secondary={
                                    <div className={classes.wrapper}>
                                        <AccessAlarmsIcon />
                                        &nbsp; {handleTime(value.created_at)}
                                    </div>
                                }
                                />
                            </>
                        }
                        {
                            title !== 'Current Location' &&
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon onClick={() => handleDelete(value.id)} />
                                </IconButton>
                            </ListItemSecondaryAction>

                        }

                    </ListItem>
                );
            })}
        </List>
    );
}
