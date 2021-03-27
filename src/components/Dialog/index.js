import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CommentIcon from '@material-ui/icons/Comment';
import SubjectIcon from '@material-ui/icons/Subject';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';

import { validations } from './schema'
import { Formik } from 'formik';
import { useTask } from '../../context/Task'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '50px',
  },
  saveButton: {
    margin: theme.spacing(3, 0, 0),
    backgroundColor: '#000000',
    borderRadius: '50px',
    padding: '10px',
    width: '50%',
    alignSelf: 'center'
  },
  cancelButton: {
    marginTop: '5px',
    width: '50%',
    alignSelf: 'center'
  },
  dialogContent: {
    width: '80%',
    alignSelf: 'center'
  },
  margin: {
    paddingTop: '10px',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
export default function DialogBox({ open, toggleDialog, title, taskLoading }) {
  const classes = useStyles();
  const { handleCreateTask } = useTask();

  const onSubmit = (values) => {
    const obj = {
      title: values.summary,
      description: values.description,
      status: 'inprogress',
      due_at: values.dueDate
    }
    handleCreateTask(obj, toggleDialog)
  }
  return (
    <div>
      <Formik
        initialValues={{ summary: '', description: '', dueDate: '' }}
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
          <Dialog className={classes.root} open={open} aria-labelledby="form-dialog-title">
            {/* {taskLoading && <CircularProgress />} */}
            <Backdrop
              className={classes.backdrop}
              open={taskLoading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent className={classes.dialogContent} >
              <DialogContentText>
              </DialogContentText>
              <TextField
                fullWidth
                margin="dense"
                name='summary'
                placeholder='Summary'
                className={classes.margin}
                id="input-with-icon-textfield"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.summary}
                error={!!(errors.summary && touched.summary)}
                helperText={errors.summary}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CommentIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                margin="dense"
                className={classes.margin}
                id="input-with-icon-textfield"
                name='description'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={!!(errors.description && touched.description)}
                helperText={errors.description}
                placeholder='Description'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SubjectIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                id="dueDate"
                placeholder="Due Date"
                margin="dense"
                name='dueDate'
                onChange={handleChange}
                onBlur={handleBlur}
                type="datetime-local"
                value={values.dueDate}
                error={!!(errors.dueDate && touched.dueDate)}
                helperText={errors.dueDate}
                id="input-with-icon-textfield"
                className={classes.margin}
                // label="TextField"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTimeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </DialogContent>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={!isValid || !dirty}
              className={classes.saveButton}
            >
              Save
            </Button>
            <Button
              onClick={handleSubmit}
              onClick={toggleDialog}

              // fullWidth={false}
              color="primary"
              className={classes.cancelButton}
            >
              Cancel
            </Button>

          </Dialog>
        )}
      </Formik>
    </div>
  );
}
