import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { codeExtractor, nicknameCheck } from "@components/lib/helper";
import axios from "axios";

interface paramsProps {
  socialCompany: string;
}
const Authlogin: React.FC<RouteComponentProps<paramsProps>> = ({
  match,
  location,
}) => {
  const history = useHistory();
  useEffect(() => {
    const socialCompany = match.params.socialCompany;
    const authURL = history.location.search;
    switch (socialCompany) {
      case "google":
        console.log("google!!!");
        const code = codeExtractor(authURL);
        console.log(code);
        const LOGIN_URL =
          "http://127.0.0.1:9000/curation/google/auth?code=" + code;
        const config = {
          withCredentials: true,
        };
        axios.get(LOGIN_URL, config).then((res) => {
          const userData = res.data.response;
          console.log(userData);
          const { email, nickname } = userData;
          if (!nickname) {
            nicknameCheck(email);
          } else {
            history.push("/");
          }
        });
        break;
      case "naver":
        console.log("naver!!");
        break;
      case "kakao":
        console.log("kakao!!");
        break;
      default:
        console.log("error");
    }
  });
  console.log("aa", match.params.socialCompany);
  return (
    <div>
      <p>여기가 그곳입니다.</p>
    </div>
  );
};

export default Authlogin;
