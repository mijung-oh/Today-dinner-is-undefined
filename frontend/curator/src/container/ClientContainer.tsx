import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Client from "@components/Client";
import { getUserInfo } from "modules/clientLogin";
import RootState from "modules";

// const ClientContainer: React.FC = () => {
//   const { name, email } = useSelector((state: RootState) => ({
//     name: state.clientLogin.name,
//     email: state.clientLogin.email,
//   }));
//   const dispatch = useDispatch();

//   const onGetUser = (name: string, email: string) => {
//     dispatch(getUserInfo(name, email));
//   };
//   return <Client onGetUser={onGetUser}></Client>;
// };
