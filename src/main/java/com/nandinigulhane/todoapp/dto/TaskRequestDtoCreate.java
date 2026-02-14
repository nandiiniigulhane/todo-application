package com.nandinigulhane.todoapp.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class TaskRequestDtoCreate {

    @NotBlank(message = "Title is mandatory")
    @Min(value = 3, message = "Title should have at least 3 characters")  
    @Max(value = 100, message = "Title should not exceed 100 characters")  
    private String title;

    private String description;

    private boolean completed;
    
}
