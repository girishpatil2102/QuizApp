package com.girish.service.test;

import com.girish.dto.*;
import com.girish.entities.Test;

import java.util.List;

public interface TestService {
    TestDTO createTest(TestDTO dto);
    QuestionDTO addQuestionInTest(QuestionDTO dto);
    List<TestDTO> getAllTests();
    TestDetailsDTO getAllQuestionsByTest(Long id);
    TestResultDTO submitTest(SubmitTestDTO request);
    List<TestResultDTO> getAllTestResult();
    public List<TestResultDTO> getAllResultsOfUser(Long userId);
}



