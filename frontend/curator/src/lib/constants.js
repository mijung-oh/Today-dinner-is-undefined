export const GOOGLE_URL =
  "https://accounts.google.com/o/oauth2/auth?client_id=5927178749-au1h5ohkehsiq21enpd5l5pl0scnkp03.apps.googleusercontent.com&redirect_uri=http://127.0.0.1:3000/oauth/google&response_type=code&scope=email%20profile%20openid&access_type=offline";
export const NAVER_URL =
  "https://nid.naver.com/oauth2.0/authorize?client_id=fUgFgzRaWuRXh8piK5n8&redirect_uri=http://127.0.0.1:3000/oauth/naver&response_type=code";
export const KAKAO_URL =
  // "https://kauth.kakao.com/oauth/authorize?client_id=4f445ad5411d2c6c022fbd8101999e07&redirect_uri=http://127.0.0.1:3000/oauth/kakao&response_type=code";
  "https://kauth.kakao.com/oauth/authorize?client_id=4f445ad5411d2c6c022fbd8101999e07&redirect_uri=http://I5C207.p.ssafy.io/oauth/kakao&response_type=code";

export const USER_CHECK_URL = `http://i5c207.p.ssafy.io:9000/curation/currentLogin`;
// "http://i5c207.p.ssafy.io:9000/curation/currentLogin/test";

export const NICKNAME_CHECK_URL = (nickname) => {
  return `http://i5c207.p.ssafy.io:9000/curation/user/userNicknameCheck?nickname=${nickname}`;
};

export const FOLLOW_URL = (nickname) => {
  return `http://i5c207.p.ssafy.io:9000/curation/follow/${nickname}`;
};

export const UNFOLLOW_URL = (nickname) => {
  return `http://i5c207.p.ssafy.io:9000/curation/follow/${nickname}`;
};

export const RECOMMEND_LIST_URL =
  "http://i5c207.p.ssafy.io:9000/curation/getRecommendList";

export const LOGOUT_URL = "http://127.0.0.1:9000/curation/user/logout";

export const CHECKOUT_URL = "http://i5c207.p.ssafy.io:9000/curation/checkout";

export const GET_RANK_URL =
  "http://i5c207.p.ssafy.io:9000/curation/recipe/getRanking";

export const SET_RANK_URL =
  "http://i5c207.p.ssafy.io:9000/curation/recipe/addRanking/";
