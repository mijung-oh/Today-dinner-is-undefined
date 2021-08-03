import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import KitchenIcon from "@material-ui/icons/Kitchen";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Link, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: "auto",
  },
});
interface paramsProps {}
const BottomNav: React.FC<RouteComponentProps<paramsProps>> = ({
  history,
  location,
  match,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<number>(0);
  //TODO : 서버 복구 되면 각 기능과 연결하기
  console.log("location in bottomNav", location);

  return (
    <BottomNavigation
      value={value}
      onChange={(event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
      }}
      className={classes.root}
    >
      {/* home == Aticle board 메인으로 
       favorites == 나중에 추가될 좋아요 눌렀던 게시글 모은 곳으로
       foodies == 식약청 API 사이트로
      */}
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Foodies" icon={<KitchenIcon />} />
    </BottomNavigation>
  );
};

export default withRouter(BottomNav);
