package com.nandinigulhane.todoapp.service;

import java.util.List;

import com.nandinigulhane.todoapp.dto.TaskRequestDto;
import com.nandinigulhane.todoapp.dto.TaskResponseDto;

public interface ToDoService {
    public List<TaskResponseDto> getAllTasks();

    public TaskResponseDto addTask(TaskRequestDto task);
}
