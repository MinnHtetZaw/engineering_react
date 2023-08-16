import React from "react";
import { LogoutProcess } from "../../redux/userRedux"
import {  useNavigate } from "react-router-dom";
import {ItemsList,  ItemContainer,  ItemWrapper,  ItemName,} from "./SidebarStyles";
import {LogoutIcon} from "../Icons";
import { useDispatch, useSelector } from "react-redux";
import SidebarWarehouse from "./SidebarWarehouse";
import SidebarManager from "./SidebarManager";
import SidebarRegional from "./SidebarRegional";



const SidebarItems = ({ displaySidebar }) => {

  const role = useSelector(state=>state.user.user?.role?.role)

  const dispatch = useDispatch()
  const nav = useNavigate()

  const Logout =()=>{
   
    dispatch(LogoutProcess())
    nav('/login')
  }

  return (
    <div className="fix">
      <ItemsList>


        {role == 'Warehouse Supervisor' && <SidebarWarehouse displaySidebar={displaySidebar}/> }

        {role == 'Project Manager' && <SidebarManager displaySidebar={displaySidebar}/> }
        
        {role == 'Regional Warehouse' && <SidebarRegional displaySidebar={displaySidebar}/>}


        <ItemContainer>
         
            <ItemWrapper>
              <LogoutIcon />
              <ItemName displaySidebar={displaySidebar} onClick={Logout}>Logout</ItemName>
            </ItemWrapper>
         
        </ItemContainer>
      </ItemsList>
    </div>
  );
};

export default SidebarItems;
