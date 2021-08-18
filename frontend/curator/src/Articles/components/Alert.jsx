import Swal from "sweetalert2";

export const loginAlert = () => {
  Swal.fire({
    title: "NOT LOGIN!",
    text: "로그인을 해주세요!!!",
    icon: "warning",

    confirmButtonText: "<a href='/'>로그인/회원가입</a>",
  });
};
