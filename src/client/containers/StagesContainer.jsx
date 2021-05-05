import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../utils/actionTypes';
import { DragDropContext } from 'react-beautiful-dnd';
import Stages from '../components/Stages';
import styled from 'styled-components';
import AddNewTask from '../components/AddNewTask';

const Container = styled.div`
  display: flex;
`;

const StagesContainer = props => {
  const dispatch = useDispatch();

  const getAllTask = useSelector(state => state.getAllTaskReducer.allTask);

  const [allTask, setAllTask] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [stageId, setStageId] = useState(0);

  useEffect(() => {
    dispatch({
      type: actionTypes.GET_ALL_TASK,
    });
  }, [dispatch]);

  useEffect(() => {
    setAllTask(getAllTask);
  }, [getAllTask]);

  const getTaskByStageId = stageId => {
    let taskByStageId = [];
    allTask.forEach(task => {
      if (task.stages.stageId === stageId) {
        taskByStageId.push(task);
      }
    });
    taskByStageId.sort((a, b) => (a.priority > b.priority ? 1 : -1));

    return taskByStageId;
  };

  const addNewTask = stageId => {
    setShowDialog(true);
    setStageId(stageId);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const sourceStage = props.stages.find(stage => stage.stageName === source.droppableId);
    const destinationStage = props.stages.find(stage => stage.stageName === destination.droppableId);

    if (sourceStage.stageName === destinationStage.stageName) {
      const prevTaskIds = getTaskByStageId(sourceStage.stageId);
      const newTaskIds = getTaskByStageId(sourceStage.stageId);
      newTaskIds.splice(source.index - 1, 1);
      newTaskIds.splice(destination.index - 1, 0, prevTaskIds.filter(task => task.taskName === draggableId)[0]);

      newTaskIds.forEach((task, index) => {
        task.priority = index + 1;
      });

      dispatch({
        type: actionTypes.UPDATE_PRIORITY,
        payload: {
          task: newTaskIds,
        },
      });
      return;
    }

    // Moving from one list to another
    const prevSourceStageTask = getTaskByStageId(sourceStage.stageId);
    const sourceStageTask = getTaskByStageId(sourceStage.stageId);
    sourceStageTask.splice(source.index - 1, 1);

    const destinationStageTask = getTaskByStageId(destinationStage.stageId);
    let destinationTask = prevSourceStageTask.filter(task => task.taskName === draggableId)[0];
    destinationTask.stages = destinationStage;

    destinationStageTask.splice(destination.index - 1, 0, destinationTask);

    sourceStageTask.forEach((task, index) => {
      task.priority = index + 1;
    });

    destinationStageTask.forEach((task, index) => {
      task.priority = index + 1;
    });

    dispatch({
      type: actionTypes.UPDATE_PRIORITY,
      payload: {
        task: sourceStageTask.concat(destinationStageTask),
      },
    });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {props.stages.map((stage, index) => {
            const tasks = getTaskByStageId(stage.stageId);
            return <Stages key={index} stage={stage} tasks={tasks} addNewTask={addNewTask} />;
          })}
        </Container>
      </DragDropContext>
      <AddNewTask showDialog={showDialog} stageId={stageId} handleCloseForDialog={handleCloseDialog} />
    </>
  );
};

StagesContainer.propTypes = {
  stages: PropTypes.array,
};

export default StagesContainer;
