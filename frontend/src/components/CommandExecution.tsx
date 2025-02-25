import React, { useState } from 'react';
import { Input, Button, notification } from 'antd';
import { executeTask } from '../api/taskApi';

const CommandExecution: React.FC = () => {
  const [taskId, setTaskId] = useState(''); // Assuming taskId is entered by the user
  const [command, setCommand] = useState('');
  const [executionResult, setExecutionResult] = useState('');

  const handleExecuteCommand = async () => {
    try {
      const result = await executeTask(taskId, command); // Passing both taskId and command

      if (result) {
        setExecutionResult(result.output);
        notification.success({
          message: 'Command Executed Successfully',
        });
      } else {
        notification.error({
          message: 'Command Execution Failed',
        });
      }
    } catch (error: any) {  // Explicitly define the error type as 'any'
      notification.error({
        message: 'Error Executing Command',
        description: error.message,
      });
    }
  };

  return (
    <div>
      <Input
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
        placeholder="Enter Task ID"
        style={{ marginBottom: '10px' }}
      />
      <Input.TextArea
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter Command"
        rows={4}
      />
      <Button type="primary" onClick={handleExecuteCommand} style={{ marginTop: '10px' }}>
        Execute Command
      </Button>
      {executionResult && (
        <pre style={{ marginTop: '10px', backgroundColor: '#f4f4f4', padding: '10px' }}>
          {executionResult}
        </pre>
      )}
    </div>
  );
};

export default CommandExecution;
