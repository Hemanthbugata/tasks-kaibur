export interface Task {
    id: string;
    name: string;
    command: string;
  }
  
  export interface TaskExecution {
    startTime: string;
    endTime: string;
    output: string;
  }
  