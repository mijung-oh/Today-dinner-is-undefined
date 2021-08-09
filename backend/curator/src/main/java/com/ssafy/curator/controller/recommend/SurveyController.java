package com.ssafy.curator.controller.recommend;

import com.ssafy.curator.dto.recommend.SurveyDto;
import com.ssafy.curator.entity.recommend.ReplyEntity;
import com.ssafy.curator.service.recommend.ReplyServiceImpl;
import com.ssafy.curator.service.recommend.SurveyServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/survey")
public class SurveyController {

    @Autowired
    private SurveyServiceImpl surveyService;

    @Autowired
    private ReplyServiceImpl replyService;

    @PostMapping("/list")
    public ResponseEntity  createsurvey(HttpServletRequest request) throws Exception {
        return surveyService.createSurvey(request);
    }

    @GetMapping("/list")
    public List<SurveyDto> getSurveyList() throws Exception {
        return surveyService.getSurveyList();
    }

    @GetMapping("/{survey_id}")
    SurveyDto getSurveyById(@PathVariable("survey_id") Long surveyId) throws Exception{
        return surveyService.getSurveyById(surveyId);
    }

    @DeleteMapping("/{survey_id}")
    public ResponseEntity deleteSurvey(@PathVariable("survey_id") Long surveyId) throws Exception{
        return surveyService.deleteSurvey(surveyId);
    }

    @PostMapping("/{survey_id}/replyList")
    public ResponseEntity  createReply(@PathVariable("survey_id") Long surveyId, HttpServletRequest request) throws Exception {
        return replyService.createReply(surveyId, request);
    }

    @PutMapping("/{survey_id}/replyList/{reply_id}")
    public ReplyEntity updatereply(@PathVariable("survey_id") Long surveyId, @PathVariable("reply_id") Long replyId, ReplyEntity replyDetails) throws Exception {
        return replyService.updateReply(surveyId, replyId, replyDetails);
    }

    @DeleteMapping("/{survey_id}/replyList/{reply_id}")
    public ResponseEntity deletereply(@PathVariable("survey_id") Long surveyId, @PathVariable("reply_id") Long replyId) throws Exception {
        return replyService.deletereply(surveyId, replyId);
    }


}
