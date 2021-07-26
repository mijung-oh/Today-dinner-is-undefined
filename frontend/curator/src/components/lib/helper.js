// Google URL 주소에서 code 뽑아주는 함수
export const codeExtractor = (URL) => {
  const regex = /code=[0-9%A-Za-z_-]*/g;
  const code = URL.match(regex);
  const STR_CODE = code.join();
  const trimmedCode = STR_CODE.substring(5);
  return trimmedCode;
};
