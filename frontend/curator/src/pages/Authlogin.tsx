import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { codeExtractor, nicknameCheck } from "@components/lib/helper";
import axios from "axios";

import { useDispatch } from "react-redux";
import { getUserInfo } from "../modules/clientLogin";

interface paramsProps {
  socialCompany: string;
}
const Authlogin: React.FC<RouteComponentProps<paramsProps>> = ({
  match,
  location,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
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
    axios
      .get(LOGIN_URL, config)
      .then(async (res) => {
        const userData = res.data.response;
        console.log("ui", userData);
        let { name, email, nickname } = userData;
        if (!nickname) {
          await nicknameCheck(name, email); // 여기서 문제...만약에 새로운 api 생기면 여기 이후에 떄리고, dispatch
        } else {
          history.push("/");
        }
      })
      .then(async () => {
        const response = await axios.get(
          `http://127.0.0.1:9000/curation/currentLogin`,
          config
        );
        const {
          data: { name, email, nickname },
        } = response;
        dispatch(getUserInfo(name, email, nickname));
      });
  }, [history, match.params.socialCompany, dispatch]);

  return (
    <div>
      <p>여기가 그곳입니다.</p>
    </div>
  );
};

export default Authlogin;
