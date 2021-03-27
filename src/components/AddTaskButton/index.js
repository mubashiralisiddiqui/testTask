
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',

    },

}));

const AddTaskButton = ({ title = '', toggleDialog = () => { } }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>

            <Button
                onClick={toggleDialog}
                startIcon={<AddIcon button />}
                color="default">{title}</Button>
        </div>
    )
}
export default AddTaskButton