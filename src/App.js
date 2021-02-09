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

function SubTask({ data, index, subIndex, onDeleteSubTask, onStatusTask }) {

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
          onClick={() => onStatusTask(index, subIndex)}
        >
          {data.isDone ? 'Undo' : 'Done'}
        </Button>{" "}
        <Button type="danger"
          onClick={() => onDeleteSubTask(index, subIndex)}
        >Delete</Button>
      </Col>
    </Row>
  )
}

function Task({ data, index, onDeleteTask, onCreateSubTask, onDeleteSubTask, onStatusTask, onDuplicate }) {

  const [subTaskName, setSubTaskName] = useState('')
  const checkIsDone = () => data.task.find(e => e.isDone === false) === undefined
  const isBlankArr = () => data.task.length !== 0
  const Valid = () => checkIsDone() && isBlankArr()

  return (
    <Space direction="vertical" style={{ marginTop: 24 }}>
      <Card
        title={data.name}
        style={{ width: 600, }}
        headStyle={Valid() ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}
        extra={
          <>
            <Button
              type="primary"
              onClick={() => { onDuplicate(index); }}
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
            data.task.map((e, subIndex) => {
              return (
                <SubTask
                  data={e}
                  key={subIndex}
                  index={index}
                  subIndex={subIndex}
                  onDeleteSubTask={onDeleteSubTask}
                  onStatusTask={onStatusTask}
                />
              )
            }
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
    let taskArr = [...taskData];
    let subTaskArr = [...taskData[index].task]
    subTaskArr.push(subTask(subTaskName, false))
    taskArr[index].task = subTaskArr
    setTaskData(taskArr)
  }

  const onDuplicate = (index) => {
    let taskArr = [...taskData]
    let dupTask = taskArr[index]
    setTaskData([...taskArr, task(dupTask.name, dupTask.isAllDone, dupTask.task)])
  }

  const onDeleteTask = (index) => {
    let taskArr = [...taskData];
    taskArr.splice(index, 1);
    setTaskData(taskArr);
  };

  const onDeleteSubTask = (index, subIndex) => {
    let taskArr = [...taskData];
    let subTaskArr = [...taskData[index].task]
    subTaskArr.splice(subIndex, 1)
    taskArr[index].task = subTaskArr
    setTaskData(taskArr);
  }

  const onStatusTask = (index, subIndex) => {
    let taskArr = [...taskData];
    let subTaskArr = [...taskData[index].task]
    let subTaskName = taskArr[index].task[subIndex].name
    let bool = taskArr[index].task[subIndex].isDone
    subTaskArr.splice(subIndex, 1, subTask(subTaskName, !bool))
    taskArr[index].task = subTaskArr
    setTaskData(taskArr);
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
              key={index}
              onDeleteTask={onDeleteTask}
              onCreateSubTask={onCreateSubTask}
              onDeleteSubTask={onDeleteSubTask}
              onStatusTask={onStatusTask}
              onDuplicate={onDuplicate}
            />
          )
        })
      }

    </Container>
  );
}

export default App;