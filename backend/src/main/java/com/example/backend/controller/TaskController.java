package com.example.backend.controller;

import com.example.backend.model.Task;
import com.example.backend.model.TaskExecution;
import com.example.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // GET all tasks or a task by ID
    @GetMapping
    public List<Task> getTasks(@RequestParam Optional<String> id, @RequestParam Optional<String> name) {
        if (id.isPresent()) {
            return taskService.getTaskById(id.get()).map(List::of).orElseThrow(() -> new RuntimeException("Task not found"));
        } else if (name.isPresent()) {
            return taskService.findTasksByName(name.get());
        }
        return taskService.getAllTasks();
    }

    // PUT a task
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable String id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    // DELETE a task
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
    }

    // Run a task (PUT TaskExecution)
    @PutMapping("/{id}/run")
    public TaskExecution runTask(@PathVariable String id) {
        return taskService.runTask(id);
    }

    // POST a new task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }
}
