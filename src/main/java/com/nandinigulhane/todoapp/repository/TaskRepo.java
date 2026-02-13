package com.nandinigulhane.todoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nandinigulhane.todoapp.model.Task;

@Repository
public interface TaskRepo extends JpaRepository<Task, Long> {
    
}
