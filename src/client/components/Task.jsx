import React from 'react';
import * as PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  background-color: white;
`;

const Task = props => {
  return (
    <Draggable draggableId={props.task.taskName} index={props.task.priority}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Grid container alignItems={'center'} direction="row" style={{ marginTop: '2%' }}>
            <Grid item md={4}>
              <Typography style={{fontSize: '16px', fontWeight: 'bold'}}>Task Name: </Typography>
            </Grid>
            <Grid item md={8}>
              <Typography>{props.task.taskName}</Typography>
            </Grid>
          </Grid>

          <Grid container alignItems={'center'} direction="row" style={{ marginTop: '2%' }}>
            <Grid item md={4}>
              <Typography style={{fontSize: '16px', fontWeight: 'bold'}}>Description: </Typography>
            </Grid>
            <Grid item md={8}>
              <Typography>{props.task.taskDesc}</Typography>
            </Grid>
          </Grid>
        </Container>
      )}
    </Draggable>
  );
};

Task.propTypes = {
  task: PropTypes.object,
};

export default Task;
