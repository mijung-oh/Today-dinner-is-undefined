import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import KitchenIcon from "@material-ui/icons/Kitchen";
import { withRouter, Link } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: "auto",
    backgroundColor: "#ea4c4c",
  },
});
interface paramsProps {}
const BottomNav: React.FC<RouteComponentProps<paramsProps>> = ({
  history,
  location,
  match,
}) => {
  useEffect(() => {
    const { pathname } = location;
    console.log(pathname);
    if (pathname.includes("test")) {
      setValue("Favorites");
    } else if (pathname.includes("recommand")) {
      setValue("recommand");
    } else {
      setValue("Home");
    }
  }, [location]);
  const classes = useStyles();
  const [value, setValue] = React.useState<string>("Home");
  //TODO : 서버 복구 되면 각 기능과 연결하기
  console.log("location in bottomNav", location);

  return (
    <BottomNavigation
      value={value}
      onChange={(event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
      }}
      className={classes.root}
    >
      {/* home == Aticle board 메인으로 
       favorites == 나중에 추가될 좋아요 눌렀던 게시글 모은 곳으로
       foodies == 식약청 API 사이트로
      */}
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        component={Link}
        to="/"
        value="Home"
      />
      <BottomNavigationAction
        label="Favorites"
        icon={<FavoriteIcon />}
        component={Link}
        to="/test"
        value="Favorites"
      />
      <BottomNavigationAction
        label="Foodies"
        icon={<KitchenIcon />}
        component={Link}
        to="/recommand"
        // to={{ pathname: "recommand", state: { user: "test" } }}
        value="recommand"
      />
    </BottomNavigation>
  );
};

export default withRouter(BottomNav);
