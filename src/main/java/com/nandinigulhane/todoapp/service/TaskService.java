package com.nandinigulhane.todoapp.service;

import java.util.List;

import com.nandinigulhane.todoapp.dto.TaskRequestDtoCreate;
import com.nandinigulhane.todoapp.dto.TaskRequestDtoUpdate;
import com.nandinigulhane.todoapp.dto.TaskResponseDto;

public interface TaskService {
    public List<TaskResponseDto> getAllTasks();

    public TaskResponseDto getTaskById(Long id);

    public TaskResponseDto addTask(TaskRequestDtoCreate task);

    public TaskResponseDto updateTask(Long id, TaskRequestDtoUpdate task);

    public TaskResponseDto deleteTask(Long id);
}
