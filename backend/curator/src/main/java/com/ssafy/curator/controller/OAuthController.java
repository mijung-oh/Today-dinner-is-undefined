package com.ssafy.curator.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.dto.user.UserSessionDto;
import com.ssafy.curator.service.LoginService;
import com.ssafy.curator.service.LoginSessionService;
import com.ssafy.curator.service.user.UserService;
import com.ssafy.curator.vo.GoogleOAuthRequest;
import com.ssafy.curator.vo.GoogleOAuthResponse;
import com.ssafy.curator.vo.ResponseLogin;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@CrossOrigin(origins = "withCredentials = true")
public class OAuthController {

    UserService userService;
    LoginService loginSessionService;

    @Autowired
    public OAuthController(UserService userService, LoginSessionService loginSessionService) {
        this.userService = userService;
        this.loginSessionService = loginSessionService;
    }

    @GetMapping(value = "/google/auth")
    public ResponseEntity<Object> googleAuth(@RequestParam(value = "code") String authCode, HttpServletResponse response)
            throws Exception {

        //HTTP Request
        RestTemplate restTemplate = new RestTemplate();

        // console.cloud.google 파라미터 세팅
        GoogleOAuthRequest googleOAuthRequestParam =  new GoogleOAuthRequest();
        googleOAuthRequestParam.setClientId("5927178749-au1h5ohkehsiq21enpd5l5pl0scnkp03.apps.googleusercontent.com");
        googleOAuthRequestParam.setClientSecret("VfCPndT-sxz9dBNuaTz482jP");
        googleOAuthRequestParam.setCode(authCode);
        googleOAuthRequestParam.setRedirectUri("http://127.0.0.1:3000/");
        googleOAuthRequestParam.setGrantType("authorization_code");

        //JSON 파싱을 위한 기본값 세팅
        //요청시 파라미터는 스네이크 케이스로 세팅되므로 Object mapper에 미리 설정해준다.
        ObjectMapper mapper = new ObjectMapper();
        mapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        //AccessToken 발급 요청
        ResponseEntity<String> resultEntity = restTemplate.postForEntity("https://oauth2.googleapis.com/token", googleOAuthRequestParam, String.class);

        //Token Request
        GoogleOAuthResponse result = mapper.readValue(resultEntity.getBody(), new TypeReference<GoogleOAuthResponse>() {});

        //ID Token만 추출 (사용자의 정보는 jwt로 인코딩 되어있다)
        String jwtToken = result.getIdToken();
        String requestUrl = UriComponentsBuilder.fromHttpUrl("https://oauth2.googleapis.com/tokeninfo").queryParam("id_token", jwtToken).toUriString();

        String resultJson = restTemplate.getForObject(requestUrl, String.class);

        Map<String,String> userInfo = mapper.readValue(resultJson, new TypeReference<Map<String, String>>(){});
        String userEmail = userInfo.get("email");
        String userName = userInfo.get("name");
        UserDto userDto = null;
        if(userService.existUser(userEmail)){
            userDto = userService.getUserByUserEmail(userEmail);
        }
        else {
            userDto = new UserDto();
            userDto.setName(userName);
            userDto.setEmail(userEmail);
            userService.createPlatformUser(userDto, "GOOGLE");
        }
        UserSessionDto sessionDto = new ModelMapper().map(userDto, UserSessionDto.class);
        loginSessionService.setSession(sessionDto);
        Cookie cookie = new Cookie("id_token",jwtToken);
        cookie.setMaxAge(60*60);
        response.addCookie(cookie);
        ResponseLogin responseLogin = new ResponseLogin(200, "로그인 성공", true, sessionDto);
        return new ResponseEntity<>(responseLogin, HttpStatus.OK);

    }
}
