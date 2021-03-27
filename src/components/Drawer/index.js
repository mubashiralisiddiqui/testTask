import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { NavLink } from 'react-router-dom'
import { withRouter, useLocation } from 'react-router-dom';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    footer: {
        position: "fixed",
        bottom: 50,
        width: 'max-content',
        '&:hover': {
            width: '200px',
            backgroundColor: 'black',
            marginBottom: '5px',
            borderTopRightRadius: '25px',
            borderBottomRightRadius: '25px',
            color: '#fff',
        }
    }, link: {
        color: 'grey',
        textDecoration: "none"
    },
    Activeitem: {
        width: '200px',
        backgroundColor: 'black',
        marginBottom: '5px',
        borderTopRightRadius: '25px',
        borderBottomRightRadius: '25px',
        color: '#fff',
        '&:hover': {
            backgroundColor: 'black',
        },
    },
    activeICon: {
        color: '#fff',
    },
    logoutIcon: {
        '&:hover': {
            color: '#fff',
        },
    }
}));
const activLinkstyle = {
    color: 'blue',
    backgroundColor: 'red'

}
function ResponsiveDrawer(props) {
    const location = useLocation();
    const { window, logout } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleActiveRoute = (text) => {
        if (text === 'Task' && location.pathname === '/dashboard') {
            return true;
        } else if (text === 'Location' && location.pathname === '/location') {
            return true;
        }
        return false;
    }
    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {['Task', 'Location',].map((text, index) => (
                    <NavLink key={text} activeStyle={activLinkstyle}
                        className={classes.link} to={text === 'Task' ? '/dashboard' : '/location'}
                    >
                        <ListItem button className={handleActiveRoute(text) ? classes.Activeitem : ''} >
                            <ListItemIcon>{index % 2 === 0 ?
                                <AssignmentIcon className={handleActiveRoute(text) ? classes.activeICon : ''} />
                                :
                                <LocationOnIcon
                                    className={handleActiveRoute(text) ? classes.activeICon : ''}
                                />
                            }
                            </ListItemIcon >
                            <ListItemText primary={text} />
                        </ListItem>
                    </NavLink>
                ))}
                <ListItem onClick={() => logout(props.history)} button className={classes.footer}>
                    <ListItemIcon>
                        <ExitToAppIcon
                            className={classes.logoutIcon}
                        />
                    </ListItemIcon>
                    <ListItemText className={classes.footerText} primary={'Logout'} />
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    const { children } = props
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default withRouter(ResponsiveDrawer);
