package com.girish.dto;

import lombok.Data;

@Data
public class QuestionDTO {

    private long id;
    private long testId;
    private String questionText;

    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;

    private String correctOption;
}
