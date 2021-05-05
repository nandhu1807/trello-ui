import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import RequiredFieldMarker from './RequiredFieldMarker';
import actionTypes from '../utils/actionTypes';

const useStyles = makeStyles(theme => ({
  textField: {
    '& label': {
      color: '#707070 !important',
      fontSize: '14px',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },
  },
  buttonProgress: {
    color: theme.palette.action.active,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const renderTextField = (label, id, value, handleOnChange, maxLength, multiline, rows, styles) => {
  return (
    <TextField
      className={'add-new-task-value ' + styles.textField}
      id={id}
      variant="outlined"
      fullWidth
      multiline={multiline}
      rows={multiline ? rows : null}
      value={value}
      placeholder={label}
      inputProps={{
        maxLength: 100,
      }}
      autoComplete={'off'}
      onChange={event => handleOnChange(event, id, 'text')}
    />
  );
};

const AddNewTask = props => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const saveInfo = useSelector(state => state.addNewTaskReducer);

  const [showSave, setShowSave] = useState(false);
  const [newTask, setNewTask] = useState({
    taskName: '',
    taskDesc: '',
    stageId: '',
    status: true,
  });

  useEffect(() => {
    let showSave;
    showSave = newTask.taskName !== '' && newTask.taskDesc !== '';
    setShowSave(showSave);
  }, [newTask]);

  useEffect(() => {
    if (saveInfo && saveInfo.successMsg === 'Task Saved Successfully') {
      handleCloseForDialog();
    }
  }, [dispatch, saveInfo]);

  const handleOnChange = (event, id, type) => {
    if (type === 'text') {
      setNewTask({
        ...newTask,
        [event.target.id]: event.target.value,
      });
    }
  };

  const handleCloseForDialog = () => {
    props.handleCloseForDialog();
    setNewTask({
      taskName: '',
      taskDesc: '',
      stageId: '',
      status: true,
    });
    dispatch({
      type: actionTypes.CLEAR_ADD_NEW_TASK_MESSAGE,
    });
  };

  const handleSave = () => {
    newTask.stageId = props.stageId;
    newTask.priority = 4;
    dispatch({
      type: actionTypes.ADD_NEW_TASK,
      payload: {
        task: newTask,
      },
    });
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={props.showDialog}
        onClose={props.handleCloseForDialog}
        className={'add-new-task-dialog-form'}
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
      >
        <DialogTitle style={{ backgroundColor: '#1B6C92', padding: 0 }}>
          <div style={{ color: '#FFF', padding: '12px 0 8px 16px' }}>
            <Typography style={{ display: 'inline-block', fontSize: '1rem' }}>Add New Task</Typography>
            <IconButton
              style={{ float: 'right', padding: 0, paddingRight: '10px' }}
              aria-label="close"
              className={'dialog-close-button'}
              id={'dialogCloseButton'}
              onClick={props.handleCloseForDialog}
            >
              <CloseIcon style={{ fill: '#fff' }} />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid container alignItems={'center'} direction="row" style={{ marginTop: '2%' }}>
            <Typography style={{ color: 'red', width: '100%', textAlign: 'center' }}>{saveInfo.successMsg}</Typography>
          </Grid>
          <Grid container alignItems={'center'} direction="row" style={{ marginTop: '2%' }}>
            <Grid item md={4}>
              <Typography className={'add-loan-notes-date'}>
                Task Name
                <RequiredFieldMarker />
              </Typography>
            </Grid>
            <Grid item md={8}>
              {renderTextField('Task Name', 'taskName', newTask.taskName, handleOnChange, 100, false, null, styles)}
            </Grid>
          </Grid>
          <Grid container alignItems={'center'} direction="row" style={{ marginTop: '2%' }}>
            <Grid item md={4}>
              <Typography className={'add-loan-notes-date'}>
                Task Description
                <RequiredFieldMarker />
              </Typography>
            </Grid>
            <Grid item md={8}>
              {renderTextField('Task Description', 'taskDesc', newTask.taskDesc, handleOnChange, 100, true, 8, styles)}
            </Grid>
          </Grid>
        </DialogContent>
        <div style={{ margin: '5%', textAlign: 'center' }}>
          <Button
            variant="contained"
            disabled={!showSave || saveInfo.isLoading}
            onClick={handleSave}
            style={{ width: 90, marginRight: '2%' }}
            className="text-white ml-12 add-new-task-form-save-button"
            id={'add-new-task-form-save-button'}
          >
            {saveInfo.isLoading && <CircularProgress size={24} className={styles.buttonProgress} />}
            SAVE
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseForDialog}
            className="text-white ml-12 add-new-task-form-cancel-button"
            style={{ width: 90 }}
            id={'add-new-task-form-cancel-button'}
            disabled={saveInfo && saveInfo.isLoading}
          >
            CANCEL
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

AddNewTask.propTypes = {
  showDialog: PropTypes.bool,
  stageId: PropTypes.number,
  handleCloseForDialog: PropTypes.func,
};

export default AddNewTask;
