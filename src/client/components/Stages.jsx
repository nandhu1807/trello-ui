import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import { Add } from '@material-ui/icons';

const Container = styled.div`
  height: 90vh;
  display: inline-block;
  border: 2px solid #fff;
  width: 25%;
  margin-left: 1%;
  background-color: #dcdcdc;
`;

const Title = styled.h3`
  color: #000;
  margin: 2%;
  padding: 2%;
  font-size: 20px;
  font-weight: bold;
  display: inline-block;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
`;

const useStyles = makeStyles({
  addNewTask: {
    display: 'inline-block',
    float: 'right',
    marginTop: '4%',
  },
});

const Stages = props => {
  const styles = useStyles();

  return (
    <Container>
      <Title>{props.stage.stageName}</Title>
      <div className={styles.addNewTask}>
        <IconButton
          style={{ float: 'right', padding: 0, paddingRight: '10px' }}
          aria-label="add"
          className={'add-task-button'}
          id={'addTaskButton'}
          onClick={() => props.addNewTask(props.stage.stageId)}
        >
          <Add />
        </IconButton>
      </div>
      <Droppable droppableId={props.stage.stageName} type="TASK">
        {(provided, snapshot) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
            {props.tasks.map((task, index) => (
              <Task key={index} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

Stages.propTypes = {
  stage: PropTypes.object,
  addNewTask: PropTypes.func,
  tasks: PropTypes.array,
};

export default Stages;
