import React from 'react';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };
  return (
    <div>
      <div>없는 페이지 입니다.</div>
      <button onClick={onClick}>이전 페이지로</button>
    </div>
  );
};

export default Page404;
