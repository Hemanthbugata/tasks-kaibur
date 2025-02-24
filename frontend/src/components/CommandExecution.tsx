import React, { useState } from 'react';
import { Input, Button, notification } from 'antd';
import { executeTask } from '../api/taskApi';

const CommandExecution: React.FC = () => {
  const [command, setCommand] = useState('');
  const [executionResult, setExecutionResult] = useState('');

  const handleExecuteCommand = async () => {
    try {
      const result = await executeTask(command);
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
    } catch (error: unknown) {
      // Type assertion to handle the 'unknown' type error
      if (error instanceof Error) {
        notification.error({
          message: 'Error Executing Command',
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
    <div>
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
