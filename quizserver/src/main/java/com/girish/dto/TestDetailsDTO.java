package com.girish.dto;

import com.girish.entities.Question;
import lombok.Data;

import java.util.List;

@Data
public class TestDetailsDTO {

    private TestDTO testDTO;

    private List<QuestionDTO> questions;
}
