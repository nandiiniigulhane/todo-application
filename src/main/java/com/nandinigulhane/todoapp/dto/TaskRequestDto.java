package com.nandinigulhane.todoapp.dto;

import lombok.Data;

@Data
public class TaskRequestDto {
    private String title;

    private String description;

    private boolean completed;
}
