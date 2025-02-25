// components/TaskList.tsx
import React, { useState, useEffect } from 'react';
import { Table, Button, notification } from 'antd';
import { Task } from '../types/TaskTypes';
import { fetchTasks, deleteTask } from '../api/taskApi';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks().then((data) => setTasks(data));
  }, []);

  const handleDelete = async (taskId: string) => {
    try {
      const response = await deleteTask(taskId);
      if (response) {
        notification.success({
          message: 'Task Deleted Successfully',
        });
        setTasks(tasks.filter((task) => task.id !== taskId));
      } else {
        notification.error({
          message: 'Error Deleting Task',
        });
      }
    } catch (error: any) {
      notification.error({
        message: 'Error Deleting Task',
        description: error.message,
      });
    }
  };

  return (
    <Table
      dataSource={tasks}
      rowKey="id"
      columns={[
        { title: 'Task Name', dataIndex: 'name', key: 'name' },
        { title: 'Command', dataIndex: 'command', key: 'command' },
        {
          title: 'Actions',
          key: 'action',
          render: (_, record: Task) => (
            <Button onClick={() => handleDelete(record.id)} danger>
              Delete
            </Button>
          ),
        },
      ]}
    />
  );
};

export default TaskList;
