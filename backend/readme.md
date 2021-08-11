# 📃 API

> 유저 관련

|REST|Description|URL|form-data|Parameter|Return Type / Return Value|
|:------:|:------:|:---:|:---:|:----:|--------|
|**GET**|현재 로그인 유저|`http://127.0.0.1:9000/curation/currentLogin`|||String: name<br>String: email|
|**GET**|로그아웃|`http://127.0.0.1:9000/curation/user/logout`||||
|**GET**|소셜 로그인|`http://127.0.0.1:9000/curation/google/auth`||code|Int: code<br>String: message<br>Boolean: check<br>String: email<br>String: name|
|**POST**|팔로우하기|`http://localhost:9000/curation/follow/{followingNickname}`|                       String:nickname                        ||String:message("success")|
|**GET**|팔로워 리스트|`http://localhost:9000/curation/follow/{nickname}/followers`|||List [<br/>String: userId<br/> String: email<br/> String: name<br/>String: nickname<br/> LocalDateTime createdDate ]|
|**GET**|팔로잉 리스트|`http://localhost:9000/curation/follow/{nickname}/followings`|||List [<br/>String: userId<br/> String: email<br/> String: name<br/>String: nickname<br/> LocalDateTime createdDate ]|
|**DELETE**|팔로우 취소|`http://localhost:9000/curation/follow/{followingNickname}`|                       String:nickname                        ||String:message("success")|
|**GET**|유저 검색|`http://localhost:9000/curation/search/{nickname}`|||List [<br/>String: userId<br/> String: email<br/> String: name<br/>String: nickname<br/> LocalDateTime createdDate ]|
|**GET**|마이페이지 보기|`GET http://localhost:9000/curation/userInfo/{nickname}`|||String: nickname<br>String: introduction<br>String: profileImg<br/>String: bgImg<br/>followings, followers, myPagePostDtos|
|**PUT**|마이페이지 수정|`PUT http://localhost:9000/curation/userInfo`|String: nickName<br> String: introduction<br> String: profileImg<br> String: bgImg|||

> 게시글 관련

|    REST    |           Description            |                             URL                              |                   Formdata                    |                  Return Type / Return Value                  |
| :--------: | :------------------------------: | :----------------------------------------------------------: | :-------------------------------------------: | :----------------------------------------------------------: |
|  **POST**  |           게시물 작성            |          `http://localhost:9000/curation/post/list`          | email, title, description, ingredients, files |                                                              |
|  **GET**   |       전체 게시물 불러오기       |          `http://localhost:9000/curation/post/list`          |                                               |                                                              |
|  **GET**   |    특정 게시물 상세 불러오기     |       `http://localhost:9000/curation/post/{post_id}`        |                                               |                                                              |
|  **PUT**   |      특정 게시물 상세 수정       |       `http://localhost:9000/curation/post/{post_id}`        |                                               |                                                              |
| **DELETE** |         특정 게시물 삭제         |       `http://localhost:9000/curation/post/{post_id}`        |                                               |                                                              |
|  **POST**  |            댓글 작성             | `http://localhost:9000/curation/post/{post_id}/commentList`  |            email, content, postId             |                                                              |
|  **GET**   |     특정 댓글 상세 불러오기      | `http://localhost:9000/curation/post/{post_id}/commentList/{comment_id}` |                                               |                                                              |
|  **PUT**   |        특정 댓글 수정하기        | `http://localhost:9000/curation/post/{post_id}/commentList/{comment_id}` |                                               |                                                              |
| **DELETE** |        특정 댓글 삭제하기        | `http://localhost:9000/curation/post/{post_id}/commentList/{comment_id}` |                                               |                                                              |
|  **POST**  |       게시물 좋아요 누르기       |     `POST http://localhost:9000/curation/like/{postId}`      |               String: nickname                |                  String:message("success")                   |
|  **GET**   | 게시물 좋아요 누른 사람들 리스트 |   `GET http://localhost:9000/curation/like/{postId}/list`    |                                               | List [<br/>String: userId<br/> String: email<br/> String: name<br/>String: nickname<br> LocalDateTime createdDate ] |
| **DELETE** |        게시물 좋아요 취소        |    `DELETE http://localhost:9000/curation/like/{postId}`     |               String: nickname                |                                                              |

> 레시피 관련

|REST|Description|URL|Formdata|Return Type / Return Value|
|:------:|:------:|:---:|:---:|:----:|
|**POST**|레시피 스크랩/스크랩 취소|`http://localhost:9000/curation/scrap/{recipe_id}`|nickname|String:message("success")/<br />String:message("delete success")|
|**GET**|해당 레시피 스크랩한 유저 목록|`http://localhost:9000/curation/scrap/{recipe_id}/userList`||List|
|**GET**|해당 유저가 스크랩한 레시피 목록|`http://localhost:9000/curation/scrap/{nickname}/recipeList`||List|
|**GET**|스크랩 수를 기준으로 전체 목록|`http://localhost:9000/curation/scrap/getAllRecipe/orderByScrapCount`||List|
|**POST**|입력된 재료 맞춤 추천 레시피|      `http://localhost:9000/curation/getRecommendList`       |List<String>:ingredients<br>boolean: check|Long: RECIPE_ID<br>String: RECIPE_NM_KO(레시피이름)<br>String: IMG_URL<br>Double: rate<br> List<String>:ingredientEntities(레시피 재료들)<br>List<String> userSelectIngredients(유저가 선택한 재료들)|

> Util

|REST|Description|URL|Parameter|Return Type / Return Value|
|:------:|:------:|:---:|:---:|:----:|
|**GET**|레시피 요리정보 DB 추가|`http://127.0.0.1:9000/curation/addRecipe`|||
|**GET**|레시피 요리과정 DB 추가|`http://127.0.0.1:9000/curation/addRecipeProcess`|||
|**GET**|레시피 요리재료 DB 추가|`http://127.0.0.1:9000/curation/addRecipeIngredient`|||
