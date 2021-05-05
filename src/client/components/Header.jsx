import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  trelloTitle: {
    fontSize: '18px',
    color: '#fff',
    padding: '1%',
    display: 'inline-block',
  },
  stageButtonDiv: {
    display: 'inline-block',
    float: 'right',
    padding: '1%',
    color: '#fff',
  },
  stageButton: {
    color: '#fff',
  },
});

const Header = props => {
  const styles = useStyles();

  return (
    <div>
      <div className={styles.trelloTitle}>TRELLO</div>
      <div className={styles.stageButtonDiv}>
        <Button className={styles.stageButton} onClick={props.addNewStage}>
          Add New Stage
        </Button>
      </div>
    </div>
  );
};

Header.propTypes = {
  addNewStage: PropTypes.func,
};

export default Header;
