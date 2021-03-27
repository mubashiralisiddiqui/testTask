import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { validations } from './schema'
import { Formik } from 'formik';
import { useAuth } from '../../context/Auth'
import { browserDetect } from '../../utils/helper'
export default function Login(props) {
    const { handleLogin, error, loading } = useAuth();

    const classes = useStyles();

    const onSubmit = (values) => {
        try {
            const osName = navigator.platform
            const browser = browserDetect
            const device_name = osName + ',' + browser
            const { email, password, } = values;
            let formData = new FormData();
            formData.append('email', email)
            formData.append('password', password)
            formData.append('device_name', device_name)
            const cb = () => {
                props.history.push('./dashboard')
            }
            if (password && email) {
                handleLogin(formData, cb)
            }
        } catch (err) {
            console.log(err)
        }

    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={onSubmit}
                    validationSchema={validations}
                >
                    {({
                        handleSubmit,
                        setFieldValue,
                        handleBlur,
                        values,
                        errors,
                        touched,
                        handleChange,
                        dirty,
                        isValid
                    }) => (
                        <form onSubmit={(e) => e.preventDefault()} className={classes.form} noValidate>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                label='Email'
                                required
                                fullWidth
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                type="email"
                                error={!!(errors.email && touched.email)}
                                helperText={errors.email}
                            // autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                error={!!(errors.password && touched.password)}
                                helperText={errors.password}
                            />
                            <p className={classes.error}>{error}</p>
                            <Button
                                onClick={handleSubmit}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={!isValid || !dirty}
                            >
                                Sign In
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>
        </Container>
    );

}
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    textField: {
        backgroundColor: '#F6F6F6'

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#000000',
        borderRadius: '50px',
        padding: '10px'

    },
    error: {
        color: 'red'
    }
}));