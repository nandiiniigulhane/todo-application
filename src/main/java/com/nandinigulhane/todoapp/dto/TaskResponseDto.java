package com.nandinigulhane.todoapp.dto;

import lombok.Data;

@Data
public class TaskResponseDto {
    private Long id;

    private String title;

    private String description;
    
    private boolean completed;
}
