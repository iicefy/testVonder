import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import styled from "styled-components";
import { task, subTask } from "./model/data.model";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 16px 24px;
`;

function SubTask({ data, index, subIndex, onDeleteSubTask, onInsertTask }) {

  return (
    <Row>
      <Col span={16}>
        <Typography.Text
          style={data.isDone ? { textDecoration: "line-through" } : { textDecoration: "none" }}
        >{data.name} {data.isDone ? '(done)' : '(todo)'}</Typography.Text>
      </Col>
      <Col span={8}>
        <Button
          type="primary"
          onClick={() => onInsertTask(index, subIndex)}
        >Done</Button>{" "}
        <Button type="danger"
          onClick={() => onDeleteSubTask(index, subIndex)}
        >Delete</Button>
      </Col>
    </Row>
  )
}

function Task({ data, index, onDeleteTask, onCreateSubTask, onDeleteSubTask, onInsertTask, onDuplicate }) {

  const [subTaskName, setSubTaskName] = useState('')

  return (
    <Space direction="vertical" style={{ marginTop: 24 }}>
      <Card
        title={data.name}
        style={{ width: 600 }}
        extra={
          <>
            <Button
              type="primary"
              onClick={() => onDuplicate(index)}
            >Duplicate</Button>{" "}
            <Button
              type="primary"
              danger
              onClick={() => onDeleteTask(index)}
            >
              Delete
            </Button>
          </>
        }
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space>
            <Input placeholder="Enter Subtask Name" style={{ width: 400 }} value={subTaskName} onChange={(e) => setSubTaskName(e.target.value)} />
            <Button
              type="primary"
              onClick={() => {
                onCreateSubTask(index, subTaskName)
              }}
            >Add Subtask</Button>
          </Space>
          <Divider />
          {
            data.task.map((e, subIndex) =>
              <SubTask
                data={e}
                index={index}
                subIndex={subIndex}
                onDeleteSubTask={onDeleteSubTask}
                onInsertTask={onInsertTask}
              />
            )
          }
        </Space>
      </Card>
    </Space>
  )
}

function App() {

  const [taskData, setTaskData] = useState([]);
  const [taskName, setTaskName] = useState('')

  const onCreateTask = () => {
    setTaskData([...taskData, task(taskName, false, [])])
  }

  const onCreateSubTask = (index, subTaskName) => {
    let task = [...taskData];
    task[index].task.push(subTask(subTaskName, false))
    setTaskData(task)
  }

  const onDuplicate = (index) => {
    let task = [...taskData]
    let dupTask = task[index]
    console.log(dupTask);
  }

  const onDeleteTask = (index) => {
    let task = [...taskData];
    task.splice(index, 1);
    setTaskData(task);
  };

  const onDeleteSubTask = (index, subIndex) => {
    let task = [...taskData];
    task[index].task.splice(subIndex, 1)
    setTaskData(task);
  }

  const onInsertTask = (index, subIndex) => {
    let task = [...taskData];
    let subTaskName = task[index].task[subIndex].name
    task[index].task.splice(subIndex, 1, subTask(subTaskName, true))
    setTaskData(task);
  }


  return (
    <Container>
      <Space>
        <Input style={{ width: 400 }} placeholder="Enter Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        <Button type="primary" onClick={() => onCreateTask()}>Create Task</Button>
      </Space>
      {
        taskData.map((e, index) => {
          return (
            <Task
              data={e}
              index={index}
              onDeleteTask={onDeleteTask}
              onCreateSubTask={onCreateSubTask}
              onDeleteSubTask={onDeleteSubTask}
              onInsertTask={onInsertTask}
              onDuplicate={onDuplicate}
            />
          )
        })
      }

    </Container>
  );
}

export default App;
