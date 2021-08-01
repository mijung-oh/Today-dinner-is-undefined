package com.ssafy.curator.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.dto.user.UserSessionDto;
import com.ssafy.curator.service.LoginService;
import com.ssafy.curator.service.LoginSessionService;
import com.ssafy.curator.service.user.UserService;
import com.ssafy.curator.vo.oauth.*;
import com.ssafy.curator.vo.user.ResponseLogin;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
import java.util.Map;

@RestController
@CrossOrigin(origins = "withCredentials = true")
public class OAuthController {

    /* 리팩토링은 나중에  . . .. . . . .. . . . . . . .. . . . .. . */

    UserService userService;
    LoginService loginSessionService;

    @Autowired
    public OAuthController(UserService userService, LoginSessionService loginSessionService) {
        this.userService = userService;
        this.loginSessionService = loginSessionService;
    }

    @GetMapping(value = "/google/auth")
    public ResponseEntity<Object> googleAuth(@RequestParam(value = "code") String authCode)
            throws Exception {

        //HTTP Request
        RestTemplate restTemplate = new RestTemplate();

        // console.cloud.google 파라미터 세팅
        GoogleOAuthRequest googleOAuthRequestParam = new GoogleOAuthRequest();
        googleOAuthRequestParam.setClientId("5927178749-au1h5ohkehsiq21enpd5l5pl0scnkp03.apps.googleusercontent.com");
        googleOAuthRequestParam.setClientSecret("VfCPndT-sxz9dBNuaTz482jP");
        googleOAuthRequestParam.setCode(authCode);
        googleOAuthRequestParam.setRedirectUri("http://127.0.0.1:3000/oauth/google");
        googleOAuthRequestParam.setGrantType("authorization_code");

        //JSON 파싱을 위한 기본값 세팅
        //요청시 파라미터는 스네이크 케이스로 세팅되므로 Object mapper에 미리 설정해준다.
        ObjectMapper mapper = new ObjectMapper();
        mapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        //AccessToken 발급 요청
        ResponseEntity<String> resultEntity = restTemplate.postForEntity("https://oauth2.googleapis.com/token", googleOAuthRequestParam, String.class);

        //Token Request
        GoogleOAuthResponse result = mapper.readValue(resultEntity.getBody(), new TypeReference<GoogleOAuthResponse>() {
        });

        //ID Token만 추출 (사용자의 정보는 jwt로 인코딩 되어있다)
        String jwtToken = result.getIdToken();
        String requestUrl = UriComponentsBuilder.fromHttpUrl("https://oauth2.googleapis.com/tokeninfo").queryParam("id_token", jwtToken).toUriString();

        String resultJson = restTemplate.getForObject(requestUrl, String.class);

        Map<String, String> userInfo = mapper.readValue(resultJson, new TypeReference<Map<String, String>>() {
        });
        String userEmail = userInfo.get("email");
        String userName = userInfo.get("name");
        UserDto userDto = null;
        if (userService.existUser(userEmail)) {
            userDto = userService.getUserByUserEmail(userEmail);
        } else {
            userDto = new UserDto();
            userDto.setName(userName);
            userDto.setEmail(userEmail);
            userService.createPlatformUser(userDto, "GOOGLE");
        }
        UserSessionDto sessionDto = new ModelMapper().map(userDto, UserSessionDto.class);
        loginSessionService.setSession(sessionDto);
        ResponseLogin responseLogin = new ResponseLogin(200, "로그인 성공", true, sessionDto);
        return new ResponseEntity<>(responseLogin, HttpStatus.OK);

    }

    @GetMapping(value = "/kakao/auth")
    public ResponseEntity<Object> kakaoAuth(@RequestParam(value = "code") String authCode)
            throws Exception {

        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", "4f445ad5411d2c6c022fbd8101999e07");
        params.add("client_secret", "RNMA2iMdTojasvVPW6Mx9y3B353OS1LZ");
        params.add("code", authCode);
        params.add("redirect_uri", "http://127.0.0.1:3000/oauth/kakao");
        params.add("grant_type", "authorization_code");

        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        header.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity formEntity = new HttpEntity<>(params, header);

        ResponseEntity<String> resultEntity = restTemplate.postForEntity("https://kauth.kakao.com/oauth/token", formEntity, String.class);
        ObjectMapper mapper = new ObjectMapper();
        mapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        KakaoOAuthResponse result = mapper.readValue(resultEntity.getBody(), new TypeReference<KakaoOAuthResponse>() {
        });
        String access_token = "Bearer " + result.getAccess_token();

        header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        header.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        header.set("Authorization", access_token);
        formEntity = new HttpEntity<>(header);

        ResponseEntity<String> userRequest = restTemplate.postForEntity("https://kapi.kakao.com/v2/user/me", formEntity, String.class);

        JsonNode jsonNode = mapper.readTree(userRequest.getBody());
        JsonNode properties = jsonNode.path("properties");
        JsonNode kakao_account = jsonNode.path("kakao_account");
        String email = kakao_account.path("email").asText();
        String name = properties.path("nickname").asText();

        UserDto userDto = null;
        if (userService.existUser(email)) {
            userDto = userService.getUserByUserEmail(email);
        } else {
            userDto = new UserDto();
            userDto.setName(name);
            userDto.setEmail(email);
            userService.createPlatformUser(userDto, "KAKAO");
        }
        UserSessionDto sessionDto = new ModelMapper().map(userDto, UserSessionDto.class);
        loginSessionService.setSession(sessionDto);
        ResponseLogin responseLogin = new ResponseLogin(200, "로그인 성공", true, sessionDto);
        return new ResponseEntity<>(responseLogin, HttpStatus.OK);
    }

    @GetMapping(value = "/naver/auth")
    public ResponseEntity<Object> naverAuth(@RequestParam(value = "code") String authCode)
            throws Exception {

        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", "fUgFgzRaWuRXh8piK5n8");
        params.add("client_secret", "Fi40eSrtrM");
        params.add("code", authCode);
        params.add("redirect_uri", "http://127.0.0.1:3000/oauth/naver");
        params.add("grant_type", "authorization_code");

        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        header.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity formEntity = new HttpEntity<>(params, header);

        ResponseEntity<String> resultEntity = restTemplate.postForEntity("https://nid.naver.com/oauth2.0/token", formEntity, String.class);
        System.out.println(resultEntity.getBody());
        ObjectMapper mapper = new ObjectMapper();
        mapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        NaverOAuthResponse result = mapper.readValue(resultEntity.getBody(), new TypeReference<NaverOAuthResponse>() {});
        String access_token = "Bearer " + result.getAccess_token();

        header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        header.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        header.set("Authorization", access_token);
        formEntity = new HttpEntity<>(header);

        ResponseEntity<String> userRequest = restTemplate.postForEntity("https://openapi.naver.com/v1/nid/me", formEntity, String.class);
        System.out.println(userRequest.getBody());

        JsonNode jsonNode = mapper.readTree(userRequest.getBody());
        JsonNode response = jsonNode.path("response");
        String email = response.path("email").asText();
        String name = response.path("name").asText();

        UserDto userDto = null;
        if (userService.existUser(email)) {
            userDto = userService.getUserByUserEmail(email);
        } else {
            userDto = new UserDto();
            userDto.setName(name);
            userDto.setEmail(email);
            userService.createPlatformUser(userDto, "NAVER");
        }
        UserSessionDto sessionDto = new ModelMapper().map(userDto, UserSessionDto.class);
        loginSessionService.setSession(sessionDto);
        ResponseLogin responseLogin = new ResponseLogin(200, "로그인 성공", true, sessionDto);
        return new ResponseEntity<>(responseLogin, HttpStatus.OK);
    }
}
