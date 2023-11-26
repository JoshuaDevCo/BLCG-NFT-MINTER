import SideBar from "../components/SideBar";
import styled  from "styled-components"
import { Outlet } from "react-router-dom";


export default function Root() {
    return (
      <Div>
      <SideBar />
      <Outlet />
      </Div>
    );
  }

const Div = styled.div`
  position: relative;
`;
