import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BoardList from "./Sections/BoardList";
import { Button, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../../slice/boardSlice";
const { Title } = Typography;
function BoadrdPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(boardActions.getBoard());
  }, [dispatch]);

  const { board, isLoading, isSuccess, error, date } = useSelector((state) => ({
    board: state.boardReducers.board,
    isLoading: state.boardReducers.isLoading,
    isSuccess: state.boardReducers.isSuccess,
    error: state.boardReducers.error,
    date: state.boardReducers.date,
  }));
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div>
        <Title>Board Title</Title>
      </div>
      <div>
        <Link to="/register?isForEdit=false">
          <Button
            style={{
              backgroundColor: "indigo",
              color: "white",
              borderRadius: "10px 100px / 120px",
            }}
          >
            New PosT
          </Button>
        </Link>
      </div>
      <div>
        {isSuccess && board.length > 0 ? (
          <BoardList board={board} date={date} />
        ) : (
          <p>조회할 내용이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default BoadrdPage;
