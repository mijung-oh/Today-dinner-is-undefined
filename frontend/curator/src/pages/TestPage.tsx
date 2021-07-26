import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserInfo } from "modules/clientLogin";

const TestPage: React.FC = () => {
  const { name, email } = useSelector((state) => ({
    name: state,
    email: state,
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
