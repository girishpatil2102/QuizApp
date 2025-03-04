package com.girish.service.test;

import com.girish.dto.*;
import com.girish.entities.Question;
import com.girish.entities.Test;
import com.girish.entities.TestResult;
import com.girish.entities.User;
import com.girish.repository.QuestionRepository;
import com.girish.repository.TestRepository;
import com.girish.repository.TestResultRepository;
import com.girish.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TestServiceImpl implements TestService {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private TestResultRepository testResultRepository;

    @Autowired
    private UserRepository userRepository;

    public TestDTO createTest(TestDTO dto){
        Test test = new Test();

        test.setTitle(dto.getTitle());
        test.setDescription(dto.getDescription());
        test.setTime(dto.getTime());

        return testRepository.save(test).getDto();
    }

    public QuestionDTO addQuestionInTest(QuestionDTO dto){
        Optional<Test> optionalTest = testRepository.findById(dto.getTestId());

        if(optionalTest.isPresent()){
            Question question = new Question();
            question.setTest(optionalTest.get());
            question.setQuestionText(dto.getQuestionText());
            question.setOptionA(dto.getOptionA());
            question.setOptionB(dto.getOptionB());
            question.setOptionC(dto.getOptionC());
            question.setOptionD(dto.getOptionD());
            question.setCorrectOption(dto.getCorrectOption());

            return questionRepository.save(question).getDto();
        }
        throw new EntityNotFoundException("Test Not Found");
    }

    public List<TestDTO> getAllTests(){
        return testRepository.findAll().stream().peek(
                test -> test.setTime(test.getQuestions().size()*test.getTime())).collect(Collectors.toList())
                .stream().map(Test::getDto).collect(Collectors.toList());
    }

    public TestDetailsDTO getAllQuestionsByTest(Long id){
        Optional<Test> optionalTest = testRepository.findById(id);
        TestDetailsDTO testDetailsDTO=new TestDetailsDTO();
        if(optionalTest.isPresent()){
            TestDTO testDTO = optionalTest.get().getDto();
            testDTO.setTime(optionalTest.get().getTime() * optionalTest.get().getQuestions().size());

            testDetailsDTO.setTestDTO(testDTO);
            testDetailsDTO.setQuestions(optionalTest.get().getQuestions().stream().map(Question::getDto).toList());

            return testDetailsDTO;
        }
        return testDetailsDTO;
    }

    public TestResultDTO submitTest(SubmitTestDTO request){
        Test test = testRepository.findById(request.getTestId()).orElseThrow(()->new EntityNotFoundException("Test ott Found"));
        User user = userRepository.findById(request.getUserId()).orElseThrow(()->new EntityNotFoundException("User Not Found"));

        int correctAnswers=0;
        for(QuestionResponse response: request.getResponses()){
            Question question = questionRepository.findById(response.getQuestionId()).orElseThrow(()-> new EntityNotFoundException("Question Not Found"));
            if(question.getCorrectOption().equals(response.getSelectedOption())){
                correctAnswers++;
            }
        }

        int totalQuestions = test.getQuestions().size();

        double percentage  = ((double)correctAnswers/totalQuestions)*100;
        percentage = Math.round(percentage * 100.0) / 100.0;

        TestResult testResult = new TestResult();
        testResult.setTest(test);
        testResult.setUser(user);
        testResult.setTotalQuestions(totalQuestions);
        testResult.setCorrectAnswers(correctAnswers);
        testResult.setPercentage(percentage);

        return testResultRepository.save(testResult).getDTO();
    }

    public List<TestResultDTO> getAllTestResult(){
        return testResultRepository.findAll().stream().map(TestResult::getDTO).collect(Collectors.toList());
    }

    public List<TestResultDTO> getAllResultsOfUser(Long userId){
        return testResultRepository.findAllByUserId(userId).stream().map(TestResult::getDTO).collect(Collectors.toList());
    }
}
