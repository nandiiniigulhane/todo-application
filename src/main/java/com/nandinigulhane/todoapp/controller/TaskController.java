package com.nandinigulhane.todoapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nandinigulhane.todoapp.dto.TaskRequestDto;
import com.nandinigulhane.todoapp.dto.TaskResponseDto;
import com.nandinigulhane.todoapp.service.ToDoService;

@RestController
@RequestMapping("/")
public class TaskController {

    private final ToDoService toDoService;

    public TaskController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @GetMapping()
    public List<TaskResponseDto> getAllTasks() {
        return toDoService.getAllTasks();
    }

    @PostMapping()
    public TaskResponseDto addTask(@RequestBody TaskRequestDto task) {
        return toDoService.addTask(task);
    }


    
}
