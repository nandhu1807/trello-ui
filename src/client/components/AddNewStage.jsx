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
      className={'add-new-stage-value ' + styles.textField}
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

const AddNewStage = props => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const saveInfo = useSelector(state => state.addNewStageReducer);

  const [showSave, setShowSave] = useState(false);
  const [newStage, setNewStage] = useState({
    stageName: '',
    status: true,
  });

  useEffect(() => {
    let showSave;
    showSave = newStage.stageName !== '';
    setShowSave(showSave);
  }, [newStage]);

  useEffect(() => {
    if (saveInfo && saveInfo.successMsg === 'Stage Saved Successfully') {
      handleCloseForDialog();
    }
  }, [dispatch, saveInfo]);

  const handleOnChange = (event, id, type) => {
    if (type === 'text') {
      setNewStage({
        ...newStage,
        [event.target.id]: event.target.value,
      });
    }
  };

  const handleCloseForDialog = () => {
    props.handleCloseForDialog();
    setNewStage({
      stageName: '',
      status: true,
    });
    dispatch({
      type: actionTypes.CLEAR_ADD_NEW_STAGE_MESSAGE,
    });
  };

  const handleSave = () => {
    dispatch({
      type: actionTypes.ADD_NEW_STAGE,
      payload: {
        stage: newStage,
      },
    });
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={props.showDialog}
        onClose={props.handleCloseForDialog}
        className={'add-new-stage-dialog-form'}
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
      >
        <DialogTitle style={{ backgroundColor: '#1B6C92', padding: 0 }}>
          <div style={{ color: '#FFF', padding: '12px 0 8px 16px' }}>
            <Typography style={{ display: 'inline-block', fontSize: '1rem' }}>Add New Stage</Typography>
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
                Stage Name
                <RequiredFieldMarker />
              </Typography>
            </Grid>
            <Grid item md={8}>
              {renderTextField('Stage Name', 'stageName', newStage.stageName, handleOnChange, 100, false, null, styles)}
            </Grid>
          </Grid>
        </DialogContent>
        <div style={{ margin: '5%', textAlign: 'center' }}>
          <Button
            variant="contained"
            disabled={!showSave || saveInfo.isLoading}
            onClick={handleSave}
            style={{ width: 90, marginRight: '2%' }}
            className="text-white ml-12 add-new-stage-form-save-button"
            id={'add-new-stage-form-save-button'}
          >
            {saveInfo.isLoading && <CircularProgress size={24} className={styles.buttonProgress} />}
            SAVE
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseForDialog}
            className="text-white ml-12 add-new-stage-form-cancel-button"
            style={{ width: 90 }}
            id={'add-new-stage-form-cancel-button'}
            disabled={saveInfo && saveInfo.isLoading}
          >
            CANCEL
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

AddNewStage.propTypes = {
  showDialog: PropTypes.bool,
  handleCloseForDialog: PropTypes.func,
};

export default AddNewStage;
