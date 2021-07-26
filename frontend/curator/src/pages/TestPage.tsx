import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserInfo } from "modules/clientLogin";
import { RootState } from "modules";

const TestPage: React.FC = () => {
  const { name, email } = useSelector((state: RootState) => ({
    name: state.clientLogin.name,
    email: state.clientLogin.email,
  }));

  console.log("name", name);
  console.log("email", email);
  return (
    <div>
      <p>carco 테스트입니다.(from page dik)</p>
    </div>
  );
};

export default TestPage;
