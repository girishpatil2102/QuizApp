package com.girish.dto;


import lombok.Data;

import java.util.List;

@Data
public class SubmitTestDTO {

    private long testId;

    private long userId;

    private List<QuestionResponse> responses;

}
