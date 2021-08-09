package com.ssafy.curator.service.recommend;

import com.ssafy.curator.entity.recommend.ReplyEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;

public interface ReplyService {
    ResponseEntity createReply(@PathVariable("survey_id") Long surveyId, HttpServletRequest request) throws Exception;
    ReplyEntity updateReply(@PathVariable("survey_id") Long surveyId, @PathVariable("reply_id") Long replyId, ReplyEntity replyDetails) throws Exception;
    ResponseEntity deletereply(@PathVariable("survey_id") Long surveyId, @PathVariable("reply_id") Long replyId) throws Exception;
}
