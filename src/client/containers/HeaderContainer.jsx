import React, { useState } from 'react';
import Header from '../components/Header';
import AddNewStage from '../components/AddNewStage';

const HeaderContainer = () => {
  const [showDialog, setShowDialog] = useState(false);

  const addNewStage = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <>
      <Header addNewStage={addNewStage} />
      <AddNewStage showDialog={showDialog} handleCloseForDialog={handleCloseDialog} />
    </>
  );
};

export default HeaderContainer;
