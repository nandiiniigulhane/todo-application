package com.nandinigulhane.todoapp.dto;

import jakarta.annotation.Nullable;
import lombok.Data;

@Data
public class TaskRequestDtoUpdate {
    
    @Nullable
    private String title;

    @Nullable
    private String description;

    @Nullable
    private boolean completed;

}
