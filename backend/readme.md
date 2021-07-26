# 📃 API

> 유저 관련

|REST|Description|URL|Parameter|Return Type / Return Value|
|:------:|:------:|:---:|:---:|:----:|
|**GET**|현재 로그인 유저|http://127.0.0.1:9000/curation/currentLogin||String: name<br>String: email|
|**GET**|소셜 로그인|http://127.0.0.1:9000/curation/google/auth|code|Int: code<br>String: message<br>Boolean: check<br>String: email<br>String: name|

> 게시글 관련

|REST|Description|URL|Parameter|Return Type / Return Value|
|:------:|:------:|:---:|:---:|:----:|
||||||

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
