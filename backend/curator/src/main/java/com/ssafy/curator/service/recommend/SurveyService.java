package com.ssafy.curator.service.recommend;

import com.ssafy.curator.dto.recommend.SurveyDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public interface SurveyService {
    ResponseEntity createSurvey(HttpServletRequest request) throws Exception;
    List<SurveyDto> getSurveyList() throws Exception;
    ResponseEntity deleteSurvey(@PathVariable("survey_id") Long surveyId) throws Exception;
    SurveyDto getSurveyById(@PathVariable("survey_id") Long surveyId) throws IOException;
}
