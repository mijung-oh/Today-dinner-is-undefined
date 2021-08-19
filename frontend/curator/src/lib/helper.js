import axios from "axios";
import Swal from "sweetalert2";
import {
  RECOMMEND_LIST_URL,
  LOGOUT_URL,
  USER_CHECK_URL,
  CHECKOUT_URL,
  SET_RANK_URL,
} from "@lib/constants";
import { db } from "../fbInstance";

// Google URL 주소에서 code 뽑아주는 함수
export const codeExtractor = (URL) => {
  const regex = /code=[0-9%A-Za-z_-]*/g;
  const code = URL.match(regex);
  const STR_CODE = code.join();
  const trimmedCode = STR_CODE.substring(5);
  return trimmedCode;
};

// 작성 시간을 좀 더 사람이 손 댄 것 처럼 만들어주는 함수
export const humanizeTime = (target) => {
  const targetTime = new Date(target);
  const duration = new Date() - targetTime;
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  if (!hours && !minutes && seconds) {
    return `${seconds}초 전`;
  } else if (!hours && minutes) {
    return `${minutes}분 전`;
  } else if (hours && hours <= 10) {
    return `${hours}시간 전`;
  } else {
    return "오래 전";
  }
};

export const testalert = () => {
  Swal.fire({
    title: "Error!",
    text: "닉네임이 없어요!",
    icon: "error",
    confirmButtonText: "Test",
  });
};

// TODO: nicknameCheck 순수성 확보
// 지금 닉네임 중복체크, 닉네임 설정 2가지 기능을 동시에 하는데, 이걸 분리해야함
export const nicknameCheck = (username, email) => {
  Swal.fire({
    title: "만나서 반가워요!",
    input: "text",
    inputLabel: "당신만의 멋진 닉네임을 알려주세요",
    allowEscapeKey: false,
    allowOutsideClick: false,
    inputValidator: async (nickname) => {
      if (!nickname) {
        return "우리 사이트 그렇게 허졉하지는 않아요";
      } else {
        const nicknameCheckURL = `http://i5c207.p.ssafy.io:9000/curation/user/userNicknameCheck?nickname=${nickname}`;
        const isExist = await axios.get(nicknameCheckURL);
        // console.log("isExist", isExist);
        if (isExist.data) {
          return "이미 존재하는 닉네임입니다.";
        } else {
          const nicknameSetURL =
            "http://i5c207.p.ssafy.io:9000/curation/user/setNickname";

          const data = { nickname: nickname, email: email };
          const config = { withCredentials: true };
          await axios.post(nicknameSetURL, data, config).then(
            Swal.fire({
              title: "멋진 닉네임이네요!",
              text: "같이 즐거운 시간 보내자고요 :)",
              icon: "success",
              timer: 2000,
              timerProgressBar: true,
              willClose: () => {
                window.location.href = "/";
              },
            })
          );
        }
      }
    },
  });
};

export const findRecommendFood = (data, config) => {
  Swal.fire({
    text: "이 재료들로 메뉴를 추천해드릴까요?",
    confirmButtonText: "네 좋아요",
    preConfirm: async () => {
      Swal.showLoading();
      return await axios
        .post(RECOMMEND_LIST_URL, data, config)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }
          // console.log(response);
          const foodies = response.data;
          const recommendedFood = foodies?.[0];
          const altFoodOne = foodies?.[1];
          const altFoodTwo = foodies?.[2];
          const altFoodThree = foodies?.[3];
          const altFoodFour = foodies?.[4];
          const { img_URL, recipe_ID, recipe_NM_KO } = recommendedFood;
          const {
            img_URL: alt_img_URL1,
            recipe_ID: alt_recipe_ID1,
            recipe_NM_KO: alt_recipe_NM_KO1,
          } = altFoodOne;
          const {
            img_URL: alt_img_URL2,
            recipe_ID: alt_recipe_ID2,
            recipe_NM_KO: alt_recipe_NM_KO2,
          } = altFoodTwo;
          const {
            img_URL: alt_img_URL3,
            recipe_ID: alt_recipe_ID3,
            recipe_NM_KO: alt_recipe_NM_KO3,
          } = altFoodThree;
          const {
            img_URL: alt_img_URL4,
            recipe_ID: alt_recipe_ID4,
            recipe_NM_KO: alt_recipe_NM_KO4,
          } = altFoodFour;
          Swal.fire({
            title: "오늘의 저녁은 이거다!",
            text: `${recipe_NM_KO}`,
            imageUrl: `${img_URL}`,
            showDenyButton: true,
            confirmButtonText: "좋아요",
            denyButtonText: "음...별로에요",
          }).then((result) => {
            if (result.isConfirmed) {
              // 그리고 여기에 투표 요청 하나 넣어야지
              // history.push(`/RecoRecipe/detail/${recipe_ID}`); // 여기를 레시피 ID로 이동하도록 수정 ( 여기 history 대신에 href 사용 --> 바꿀 수 있음 바꿔라)
              // const config = {withCredentials : true}
              axios.post(SET_RANK_URL + `${recipe_ID}`);
              // console.log(SET_RANK_URL + `${recipe_ID}`);
              window.location.href = `/RecoRecipe/detail/${recipe_ID}`;
            }
            if (result.isDenied) {
              Swal.fire({
                title: "그럼 이건 어때요?",
                html:
                  "<div>" +
                  `<div style=" width:100%; height:72px; position:relative ">` +
                  `<div style=" width:100%; height:72px; position:absolute; background:black; border-radius:15px;">` +
                  `<a href="/RecoRecipe/detail/${alt_recipe_ID1}" style='position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); color:white;font-size:1.3rem; z-index:10; text-decoration:none;'>` +
                  `${alt_recipe_NM_KO1}` +
                  `</a>` +
                  `<img style=" width:100%; height:100%; object-fit:cover; border-radius:15px; opacity:0.45" src=${alt_img_URL1} alt="${alt_recipe_NM_KO1}"/>` +
                  "</div>" +
                  "</div>" +
                  "<div style='padding-top:1% '>" +
                  `<div style=" width:100%; height:72px; position:relative ">` +
                  `<div style=" width:100%; height:72px; position:absolute; background:black; border-radius:15px;">` +
                  `<a href="/RecoRecipe/detail/${alt_recipe_ID2}" style='position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); color:white;font-size:1.3rem; z-index:10; text-decoration:none;'>` +
                  `${alt_recipe_NM_KO2}` +
                  `</a>` +
                  `<img style=" width:100%; height:100%; object-fit:cover; border-radius:15px; opacity:0.45" src=${alt_img_URL2} alt="${alt_recipe_NM_KO2}"/>` +
                  "</div>" +
                  "</div>" +
                  "<div style='padding-top:1% '>" +
                  `<div style=" width:100%; height:72px; position:relative ">` +
                  `<div style=" width:100%; height:72px; position:absolute; background:black; border-radius:15px;">` +
                  `<a href="/RecoRecipe/detail/${alt_recipe_ID3}" style='position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); color:white;font-size:1.3rem; z-index:10; text-decoration:none;'>` +
                  `${alt_recipe_NM_KO3}` +
                  `</a>` +
                  `<img style=" width:100%; height:100%; object-fit:cover; border-radius:15px; opacity:0.45" src=${alt_img_URL3} alt="${alt_recipe_NM_KO3}"/>` +
                  "</div>" +
                  "</div>" +
                  "<div style='padding-top:1% '>" +
                  `<div style=" width:100%; height:72px; position:relative ">` +
                  `<div style=" width:100%; height:72px; position:absolute; background:black; border-radius:15px;">` +
                  `<a href="/RecoRecipe/detail/${alt_recipe_ID4}" style='position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); color:white;font-size:1.3rem; z-index:10; text-decoration:none;'>` +
                  `${alt_recipe_NM_KO4}` +
                  `</a>` +
                  `<img style=" width:100%; height:100%; object-fit:cover; border-radius:15px; opacity:0.45" src=${alt_img_URL4} alt="${alt_recipe_NM_KO4}"/>` +
                  "</div>" +
                  "</div>",
                confirmButtonText: "잠시만요. 다시 골라볼래요",
              });
            }
          });
        })
        .catch((error) => {
          Swal.showValidationMessage(`에러가 발생했습니다.${error}`);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
};

export const logoutRequest = async () => {
  const config = { withCredentials: true };
  await axios.get(LOGOUT_URL, config);
  window.location.href = "http://i5c207.p.ssafy.io/";
};

// 아직 읽지 않은 알림의 갯수를 return 하는 함수
export const countNewAlert = async () => {
  const ress = await axios.get(USER_CHECK_URL);
  const nickname = ress.data.nickname;
  const res = await axios.get(
    `http://i5c207.p.ssafy.io/curation/${nickname}/followers`
  );
  return res.data.length;
};

export const listener = async () => {
  db.collection("Follow")
    .doc("김서방") //2. params 넣은다 음에 실행
    .onSnapshot((doc) => {
      // console.log(doc);
      // console.log(doc.data().follower.length);
      // console.log(" data: ", doc.data()); //3. 이떄부터 firebase를 listen중
    });
};

export const getUserNickname = async () => {
  const res = await axios.get(USER_CHECK_URL);
  const { nickname } = res.data;
  return nickname;
};
