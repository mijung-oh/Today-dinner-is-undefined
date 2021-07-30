# 📃 API

> 유저 관련

|REST|Description|URL|form-data|Parameter|Return Type / Return Value|
|:------:|:------:|:---:|:---:|:----:|--------|
|**GET**|현재 로그인 유저|http://127.0.0.1:9000/curation/currentLogin|||String: name<br>String: email|
|**GET**|소셜 로그인|http://127.0.0.1:9000/curation/google/auth||code|Int: code<br>String: message<br>Boolean: check<br>String: email<br>String: name|
|**POST**|팔로우하기|http://localhost:9000/curation/follow/{followingEmail}|email|followingEmail|String:message("success")|
|**GET**|팔로워 리스트|http://localhost:9000/curation/follow/{followingEmail}/followers||followingEmail|List [<br>String: userId<br> String: email<br> String: name<br> LocalDateTime createdDate ]|
|**GET**|팔로잉 리스트|http://localhost:9000/curation/follow/{followingEmail}/followings||followingEmail|List [<br/>String: userId<br/> String: email<br/> String: name<br/> LocalDateTime createdDate ]|
|**DELETE**|팔로우 취소|http://localhost:9000/curation/follow/{followingEmail}|email|followingEmail|String:message("success")|
|**GET**|유저 검색|http://localhost:9000/curation/search/{username}||username|List [<br/>String: userId<br/> String: email<br/> String: name<br/> LocalDateTime createdDate ]|

> 게시글 관련

|    REST    |        Description        |                             URL                              |                   Formdata                    | Return Type / Return Value |
| :--------: | :-----------------------: | :----------------------------------------------------------: | :-------------------------------------------: | :------------------------: |
|  **POST**  |        게시물 작성        |           http://localhost:9000/curation/post/list           | email, title, description, ingredients, files |                            |
|  **GET**   |   전체 게시물 불러오기    |           http://localhost:9000/curation/post/list           |                                               |                            |
|  **GET**   | 특정 게시물 상세 불러오기 |        http://localhost:9000/curation/post/{post_id}         |                                               |                            |
|  **PUT**   |   특정 게시물 상세 수정   |        http://localhost:9000/curation/post/{post_id}         |                                               |                            |
| **DELETE** |     특정 게시물 삭제      |        http://localhost:9000/curation/post/{post_id}         |                                               |                            |
|  **POST**  |         댓글 작성         |  http://localhost:9000/curation/post/{post_id}/commentList   |            email, content, postId             |                            |
|  **GET**   |  특정 댓글 상세 불러오기  | http://localhost:9000/curation/post/{post_id}/commentList/{comment_id} |                                               |                            |
|  **PUT**   |    특정 댓글 수정하기     | http://localhost:9000/curation/post/{post_id}/commentList/{comment_id} |                                               |                            |
| **DELETE** |    특정 댓글 삭제하기     | http://localhost:9000/curation/post/{post_id}/commentList/{comment_id} |                                               |                            |

> 레시피 관련

|REST|Description|URL|Parameter|Return Type / Return Value|
|:------:|:------:|:---:|:---:|:----:|
||||||

> Util

|REST|Description|URL|Parameter|Return Type / Return Value|
|:------:|:------:|:---:|:---:|:----:|
|**GET**|레시피 요리정보 DB 추가|http://127.0.0.1:9000/curation/addRecipe|||
|**GET**|레시피 요리과정 DB 추가|http://127.0.0.1:9000/curation/addRecipeProcess|||
|**GET**|레시피 요리재료 DB 추가|http://127.0.0.1:9000/curation/addRecipeIngredient|||
