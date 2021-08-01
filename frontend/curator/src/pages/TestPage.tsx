import React from "react";
import { testalert } from "@components/lib/helper";

const TestPage: React.FC = () => {
  const onClick = () => {
    testalert();
  };
  return (
    <div>
      <p>carco 테스트입니다.(from page dik)</p>
      <button onClick={onClick}>테스트</button>
    </div>
  );
};

export default TestPage;
