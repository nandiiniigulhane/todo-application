package com.nandinigulhane.todoapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nandinigulhane.todoapp.dto.TaskRequestDto;
import com.nandinigulhane.todoapp.dto.TaskResponseDto;
import com.nandinigulhane.todoapp.model.Task;
import com.nandinigulhane.todoapp.repository.TaskRepo;

@Service
public class ToDoServiceImpl implements ToDoService {

    private final TaskRepo taskRepo;

    public ToDoServiceImpl(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }

    @Override
    public List<TaskResponseDto> getAllTasks() {
        List<Task> tasks = taskRepo.findAll();

        List<TaskResponseDto> response = new ArrayList<>();
        for(Task task : tasks){
            TaskResponseDto taskResponseDto = new TaskResponseDto();
            taskResponseDto.setId(task.getId());
            taskResponseDto.setTitle(task.getTitle());
            taskResponseDto.setDescription(task.getDescription());
            taskResponseDto.setCompleted(task.isCompleted());
            response.add(taskResponseDto);
        }
        return response;
    }


    @Override
    public TaskResponseDto addTask(TaskRequestDto task) {
        Task newTask = new Task();
        newTask.setTitle(task.getTitle());
        newTask.setDescription(task.getDescription());
        newTask.setCompleted(task.isCompleted());

        Task savedTask = taskRepo.save(newTask);

        TaskResponseDto response = new TaskResponseDto();
        response.setId(savedTask.getId());
        response.setTitle(savedTask.getTitle());
        response.setDescription(savedTask.getDescription());
        response.setCompleted(savedTask.isCompleted());

        return response;
    }

}
