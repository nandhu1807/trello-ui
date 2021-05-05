import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderContainer from './HeaderContainer';
import StagesContainer from '../containers/StagesContainer';
import actionTypes from '../utils/actionTypes';

const DashboardContainer = () => {
  const dispatch = useDispatch();

  const getAllStages = useSelector(state => state.getAllStagesReducer.stages);

  useEffect(() => {
    dispatch({
      type: actionTypes.GET_ALL_STAGES,
    });
  }, [dispatch]);

  return (
    <div>
      <HeaderContainer />
      <StagesContainer stages={getAllStages} />
    </div>
  );
};

export default DashboardContainer;
