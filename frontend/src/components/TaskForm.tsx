import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { Task } from '../types/TaskTypes';
import { createTask } from '../api/taskApi';

const TaskForm: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const [taskCommand, setTaskCommand] = useState('');

  const handleCreateTask = async () => {
    const taskData: Task = {
      id: 'temp-id', // Generate the ID server-side, don't use it client-side
      name: taskName,
      command: taskCommand,
    };

    try {
      const response = await createTask(taskData);

      if (response) {
        notification.success({
          message: 'Task Created Successfully',
        });
      } else {
        notification.error({
          message: 'Error Creating Task',
        });
      }
    } catch (error: unknown) {
      // Type assertion to handle the 'unknown' type error
      if (error instanceof Error) {
        notification.error({
          message: 'Error Creating Task',
        });
      } else {
        notification.error({
          message: 'Unknown error',
          description: 'An unknown error occurred',
        });
      }
    }
  };

  return (
    <Form style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Form.Item label="Task Name" required>
        <Input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter Task Name"
        />
      </Form.Item>

      <Form.Item label="Task Command" required>
        <Input
          value={taskCommand}
          onChange={(e) => setTaskCommand(e.target.value)}
          placeholder="Enter Command"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={handleCreateTask}>
          Create Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
