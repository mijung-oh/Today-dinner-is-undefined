import React from "react";

function Create({
  onCreate,
  onChange,
  title,
  description,
  ingredients,
  uploadFile,
}) {
  /*
  onCreate = axios post로 백에 전송 함수
  onChange = input 상태 변경
  title, description ingredients = 인풋 상태
  uploadFile = 사진
  */
  return (
    <div>
      <div>
        제목: <input onChange={onChange} value={title} name="title" />
      </div>
      <div>
        설명:
        <input onChange={onChange} value={description} name="description" />
      </div>
      <div>
        재료:
        <input onChange={onChange} value={ingredients} name="ingredients" />
      </div>
      <div>
        사진:
        <input
          id="upload-file"
          type="file"
          accept="image/*"
          multiple
          onChange={uploadFile}
        ></input>
        <label htmlFor="upload-file">파일선택</label>
      </div>
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default Create;
