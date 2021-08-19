import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPopupDate } from "../../modules/clientLogin";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import axios from "axios";
import { GET_RANK_URL } from "@lib/constants";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { RankFoodProps } from "@lib/interfaces";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    [theme.breakpoints.down("xs")]: {
      width: 150,
    },
    [theme.breakpoints.between("xs", "sm")]: {
      width: 200,
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: 500,
    },
    [theme.breakpoints.up("lg")]: {
      width: 750,
    },
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ededed",
    borderRadius: "15px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  fakeLine: {
    height: "1px",
    width: "100%",
    marginBottom: "5px",
    backgroundColor: "#bdbdbd",
  },
}));

const TodayRankModal: React.FC = () => {
  const date = useSelector((state: RootState) => state.clientLogin.popupDate);
  const [rankFoods, setRankFoods] = useState<Array<RankFoodProps>>([]);
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = new Date();
      const res = await axios.get(GET_RANK_URL);
      const { data } = res;
      setRankFoods(data);

      if (date === undefined) {
        setOpen(true);
      } else {
        let adDate = date;

        if (date.getHours > 12) {
          adDate.setDate(adDate.getDate() + 1);
          adDate.setHours(12);
          if (adDate < currentDate) {
            setOpen(true);
          } else {
            adDate.setHours(12);
            if (adDate < currentDate) {
              setOpen(true);
            }
          }
        }
      }
    };
    fetchData();
  }, [date]);

  const handleClose = () => {
    setOpen(false);
  };
  const onClick = () => {
    const now = new Date();
    dispatch(setPopupDate(now));
    setOpen(false);
  };
  const classes = useStyles();
  const body = (
    <div className={classes.paper}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "column",
        }}
      >
        <h3>오늘의 인기 메뉴</h3>
        <div className={classes.fakeLine}></div>
        {rankFoods.map((data: RankFoodProps, index: number) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  display: "inline-block",
                }}
              >
                <img
                  src={data.recipeDto.img_URL}
                  alt="dd"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                    border: "1px solid rgb(173 173 173)",
                    marginRight: "10px",
                  }}
                />
              </div>
              <div
                style={{
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <p style={{ marginLeft: "5px" }}>{data.ranking}위</p>
                <p>{data.recipeName}</p>
                <p>{data.score}표</p>
              </div>
            </div>
          );
        })}
        <Typography
          style={{ fontSize: "0.775rem", textAlign: "center" }}
          variant="subtitle2"
        >
          인기 메뉴는 오후 12시에 초기화 됩니다.
        </Typography>
        <Button onClick={onClick}>오늘 하루 안 보기</Button>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {body}
      </Modal>
    </div>
  );
};
export default TodayRankModal;
