package com.ssafy.curator.service.recommend;


import com.ssafy.curator.entity.recommend.ReplyEntity;
import com.ssafy.curator.entity.recommend.SurveyEntity;
import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.repository.recommend.ReplyRepository;
import com.ssafy.curator.repository.recommend.SurveyRepository;
import com.ssafy.curator.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;

@Service
public class ReplyServiceImpl {

    @Autowired
    UserRepository userRepository;

    @Autowired
    SurveyRepository surveyRepository;

    @Autowired
    ReplyRepository replyRepository;

    public ResponseEntity createReply(@PathVariable("survey_id") Long surveyId, HttpServletRequest request) throws Exception {

        ReplyEntity reply = new ReplyEntity();

        String n = request.getParameter("nickname");
        UserEntity user = userRepository.findByNickname(n);
        SurveyEntity survey = surveyRepository.findById(surveyId);
        String content = request.getParameter("content");
        reply.setUser(user);
        reply.setSurvey(survey);
        reply.setContent(content);

        replyRepository.save(reply);

        return ResponseEntity.ok().build();
    }

    public ReplyEntity updateReply(@PathVariable("survey_id") Long surveyId, @PathVariable("reply_id") Long replyId, ReplyEntity replyDetails) throws Exception {
        Long c = Long.parseLong(String.valueOf(replyId));
        ReplyEntity reply = replyRepository.findById(c);
        reply.setContent(replyDetails.getContent());

        ReplyEntity updatereply = replyRepository.save(reply);
        return updatereply;
    }

    public ResponseEntity deletereply(@PathVariable("survey_id") Long surveyId, @PathVariable("reply_id") Long replyId) throws Exception {
        Long c = Long.parseLong(String.valueOf(replyId));
        ReplyEntity reply = replyRepository.findById(c);
        replyRepository.delete(reply);
        return ResponseEntity.ok().build();
    }
}
