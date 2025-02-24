package com.example.backend.service;

import com.example.backend.model.Task;
import com.example.backend.model.TaskExecution;
import com.example.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(String id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(String id, Task taskDetails) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setName(taskDetails.getName());
        task.setOwner(taskDetails.getOwner());
        task.setCommand(taskDetails.getCommand());
        return taskRepository.save(task);
    }

    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }

    public List<Task> findTasksByName(String name) {
        return taskRepository.findByNameContaining(name);
    }

    public TaskExecution runTask(String id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        
        // Execute the command
        Date startTime = new Date();
        String output = executeCommand(task.getCommand());
        Date endTime = new Date();

        TaskExecution taskExecution = new TaskExecution(startTime, endTime, output);
        task.getTaskExecutions().add(taskExecution);
        taskRepository.save(task);

        return taskExecution;
    }

    private String executeCommand(String command) {
        // Execute shell command here (mocked)
        return "Command executed: " + command;
    }
}
