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
    let LOGIN_URL = "";
    const code = codeExtractor(authURL);
    switch (socialCompany) {
      case "google":
        LOGIN_URL = "http://127.0.0.1:9000/curation/google/auth?code=" + code;
        break;
      case "naver":
        LOGIN_URL = "http://127.0.0.1:9000/curation/naver/auth?code=" + code;
        break;
      case "kakao":
        LOGIN_URL = "http://127.0.0.1:9000/curation/kakao/auth?code=" + code;
        break;
      default:
        console.log("error");
    }
    const config = {
      withCredentials: true,
    };
    axios.get(LOGIN_URL, config).then((res) => {
      const userData = res.data.response;
      const { email, nickname } = userData;
      if (!nickname) {
        nicknameCheck(email);
      } else {
        history.push("/");
      }
    });
  });
  return (
    <div>
      <p>여기가 그곳입니다.</p>
    </div>
  );
};

export default Authlogin;
