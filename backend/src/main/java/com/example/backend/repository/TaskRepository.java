package com.example.backend.repository;

import com.example.backend.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface TaskRepository extends MongoRepository<Task, String> {

    Optional<Task> findById(String id);

    List<Task> findByNameContaining(String name);

    void deleteById(String id);
}
