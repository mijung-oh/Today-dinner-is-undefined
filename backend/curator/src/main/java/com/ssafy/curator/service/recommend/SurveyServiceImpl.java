package com.ssafy.curator.service.recommend;

import com.ssafy.curator.dto.post.CommentDto;
import com.ssafy.curator.dto.post.PostWithImageDto;
import com.ssafy.curator.dto.recipe.RecipeDto;
import com.ssafy.curator.dto.recommend.ReplyDto;
import com.ssafy.curator.dto.recommend.SurveyDto;
import com.ssafy.curator.entity.post.CommentEntity;
import com.ssafy.curator.entity.post.PostEntity;
import com.ssafy.curator.entity.post.PostImageEntity;
import com.ssafy.curator.entity.recipe.RecipeEntity;
import com.ssafy.curator.entity.recommend.ReplyEntity;
import com.ssafy.curator.entity.recommend.SurveyEntity;
import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.repository.recommend.ReplyRepository;
import com.ssafy.curator.repository.recommend.SurveyRepository;
import com.ssafy.curator.repository.user.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class SurveyServiceImpl {

    @Autowired
    UserRepository userRepository;

    @Autowired
    SurveyRepository surveyRepository;

    @Autowired
    ReplyRepository replyRepository;

    ModelMapper mapper;

    public ResponseEntity createSurvey(HttpServletRequest request) throws Exception {

        SurveyEntity surveyPost = new SurveyEntity();
        String n = request.getParameter("nickname");
        UserEntity user = userRepository.findByNickname(n);
        String ingredients = request.getParameter("ingredients");
        String description = request.getParameter("description");
        surveyPost.setUser(user);
        surveyPost.setIngredients(ingredients);
        surveyPost.setDescription(description);

        surveyRepository.save(surveyPost);

        return ResponseEntity.ok().build();
    }

    public List<SurveyDto> getSurveyList() throws Exception {

        mapper = new ModelMapper();

        List<SurveyEntity> surveyList = surveyRepository.findAll();
        List<SurveyDto> SurveyDtoList = new ArrayList<>();
        surveyList.forEach(v->{
            SurveyDtoList.add(mapper.map(v, SurveyDto.class));
        });

        return SurveyDtoList;
    }

    public SurveyDto getSurveyById(@PathVariable("survey_id") Long surveyId) throws IOException {
        Long s = Long.parseLong(String.valueOf(surveyId));
        SurveyEntity survey = surveyRepository.findById(s);

        SurveyDto surveyDto = new SurveyDto();
        surveyDto.setId(survey.getId());
        surveyDto.setDescription(survey.getDescription());
        surveyDto.setIngredients(survey.getIngredients());
        surveyDto.setUser(survey.getUser());
        surveyDto.setCreateDate(survey.getCreateDate());
        surveyDto.setUpdateDate(survey.getUpdateDate());

        List<ReplyEntity> Replys = replyRepository.findBySurveyId(s);

        List replys = new ArrayList();
        for (ReplyEntity r : Replys) {
            ReplyDto replyDto = new ModelMapper().map(r, ReplyDto.class);
            replys.add(replyDto);
        }

        surveyDto.setReply(replys);


        return surveyDto;
    }

    public ResponseEntity deleteSurvey(@PathVariable("survey_id") Long surveyId) throws Exception {

        Long s = Long.parseLong(String.valueOf(surveyId));
        SurveyEntity survey = surveyRepository.findById(s);
        surveyRepository.delete(survey);
        return ResponseEntity.ok().build();
    }


}
