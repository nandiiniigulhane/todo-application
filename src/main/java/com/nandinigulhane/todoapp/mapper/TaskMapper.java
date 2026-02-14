package com.nandinigulhane.todoapp.mapper;

import com.nandinigulhane.todoapp.dto.TaskRequestDtoCreate;
import com.nandinigulhane.todoapp.dto.TaskResponseDto;
import com.nandinigulhane.todoapp.model.Task;

public class TaskMapper {
    public static TaskResponseDto toResponseDto(Task task) {
        TaskResponseDto response = new TaskResponseDto();
        response.setId(task.getId());
        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());
        response.setCompleted(task.isCompleted());
        response.setCreatedAt(task.getCreatedAt());
        return response;
    }

    public static Task toEntity(TaskRequestDtoCreate request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setCompleted(request.isCompleted());

        return task;
    }
}
