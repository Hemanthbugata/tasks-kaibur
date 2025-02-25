// src/components/TaskForm.tsx
import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { Task } from '../types/TaskTypes'; // Correct import for Task type
import { createTask } from '../api/taskApi';

const TaskForm: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const [taskCommand, setTaskCommand] = useState('');
  const [taskOwner, setTaskOwner] = useState('');

  const handleCreateTask = async () => {
    const taskData: Task = {
      id: 'temp_id',
      name: taskName,
      command: taskCommand,
      owner: 'John Doe', // Include the owner field
      taskExecutions: [], // Initially an empty array
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
    } catch (error: any) {  // Explicitly define the error type as 'any'
      notification.error({
        message: 'Error Creating Task',
        description: error.message,
      });
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

      <Form.Item label="Task Owner" required>
        <Input
          value={taskOwner}
          onChange={(e) => setTaskOwner(e.target.value)}
          placeholder="Enter Owner"
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
