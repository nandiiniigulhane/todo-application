package com.nandinigulhane.todoapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nandinigulhane.todoapp.model.Task;
import com.nandinigulhane.todoapp.dto.TaskRequestDtoCreate;
import com.nandinigulhane.todoapp.dto.TaskRequestDtoUpdate;
import com.nandinigulhane.todoapp.dto.TaskResponseDto;
import com.nandinigulhane.todoapp.mapper.TaskMapper;
import com.nandinigulhane.todoapp.repository.TaskRepo;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepo taskRepo;

    public TaskServiceImpl(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }

    @Override
    public List<TaskResponseDto> getAllTasks() {
        List<Task> tasks = taskRepo.findAll();

        List<TaskResponseDto> responses = new ArrayList<>();

        for (Task task : tasks) {
            TaskResponseDto response = TaskMapper.toResponseDto(task);
            responses.add(response);
        }

        return responses;

    }

    @Override
    public TaskResponseDto getTaskById(Long id) {
        Task task = taskRepo.findById(id).orElse(null);

        if (task == null) {
            return null;
        }

        return TaskMapper.toResponseDto(task);
    }

    @Override
    public TaskResponseDto addTask(TaskRequestDtoCreate task) {
        Task newTask = TaskMapper.toEntity(task);

        Task savedTask = taskRepo.save(newTask);

        return TaskMapper.toResponseDto(savedTask);
    }

    @Override
    public TaskResponseDto updateTask(Long id, TaskRequestDtoUpdate task) {
        Task existingTask = taskRepo.findById(id).orElse(null);

        if (existingTask == null) {
            return null;
        }

        String title = task.getTitle();
        String description = task.getDescription();
        boolean completed = task.isCompleted();

        if (title != null) {
            existingTask.setTitle(title);
        }

        if (description != null) {
            existingTask.setDescription(description);
        }

        if (existingTask.isCompleted() != completed) {
            existingTask.setCompleted(completed);
        }

        Task updatedTask = taskRepo.save(existingTask);

        return TaskMapper.toResponseDto(updatedTask);
    }

    @Override
    public TaskResponseDto deleteTask(Long id) {
        Task existingTask = taskRepo.findById(id).orElse(null);

        if (existingTask == null) {
            return null;
        }

        taskRepo.delete(existingTask);

        return TaskMapper.toResponseDto(existingTask);
    }

}
