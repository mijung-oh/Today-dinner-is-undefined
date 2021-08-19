import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import KitchenIcon from "@material-ui/icons/Kitchen";
import { withRouter, Link } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { getUserNickname } from "@lib/helper";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: "auto",
    backgroundColor: "#ea4c4c",
    zIndex: 1,
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
    // console.log(pathname);
    if (pathname.includes("userscrap")) {
      setValue("Favorites");
    } else if (pathname.includes("recommend")) {
      setValue("recommend");
    } else {
      setValue("Home");
    }
  }, [location]);

  useEffect(() => {
    const fetchUserNickName = async () => {
      const nickname = await getUserNickname();
      setUserNickName(nickname);
    };
    fetchUserNickName();
  }, []);
  const classes = useStyles();
  const [value, setValue] = React.useState<string>("Home");
  const [userNickName, setUserNickName] = React.useState<string>("");
  //TODO : 서버 복구 되면 각 기능과 연결하기
  // console.log("location in bottomNav", location);

  return (
    <BottomNavigation
      value={value}
      onChange={(event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
      }}
      className={classes.root}
    >
      <BottomNavigationAction
        label="홈"
        icon={<HomeIcon />}
        component={Link}
        to="/articles"
        value="Home"
      />
      <BottomNavigationAction
        label="나만의 레시피"
        icon={<FavoriteIcon />}
        component={Link}
        to={{ pathname: "userscrap", state: { user: `${userNickName}` } }}
        value="Favorites"
      />
      <BottomNavigationAction
        label="메뉴 추천"
        icon={<KitchenIcon />}
        component={Link}
        to="/recommend"
        value="recommend"
      />
    </BottomNavigation>
  );
};

export default withRouter(BottomNav);
