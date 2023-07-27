import React, { useState } from "react";
import { LogoutProcess } from "../../redux/userRedux"
import { Link, useNavigate } from "react-router-dom";
import {
  ItemsList,
  ItemContainer,
  ItemWrapper,
  ItemName,
} from "./SidebarStyles";

import {
  HomeIcon,
  UserIcon,
  BuildingIcon,
  CostCenterIcon,
  LogoutIcon
} from "../Icons";
import { dummyData } from "..";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";


const SubItemName = styled.span`
  margin-left: 30px;
`;

const SidebarItems = ({ displaySidebar }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [showSub, setShowSub] = useState(false);
  const role = useSelector(state=>state.user.user?.role?.role)

  const dispatch = useDispatch()
  const nav = useNavigate()

  const show_sub = () => {
    setShowSub(!showSub);
  };

  const Logout =()=>{
   
    dispatch(LogoutProcess())
    nav('/login')
  }

  return (
    <div className="fix">
      <ItemsList>
        <ItemContainer>
          <Link className="no_underline" onClick={show_sub}>
            <ItemWrapper>
              <HomeIcon />
              <ItemName displaySidebar={displaySidebar}>Master Data</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
        {showSub ? (
          <ItemContainer>
            <Link className="no_underline" to="/categories">
              <ItemWrapper>
                <SubItemName displaySidebar={displaySidebar}>
                  Categories
                </SubItemName>
              </ItemWrapper>
            </Link>
          </ItemContainer>
        ) : (
          ""
        )}
        {showSub ? (
          <ItemContainer>
            <Link className="no_underline" to="/sub_categories">
              <ItemWrapper>
                {/* <CategoryIcon/> */}
                <SubItemName displaySidebar={displaySidebar}>
                  Sub Categories
                </SubItemName>
              </ItemWrapper>
            </Link>
          </ItemContainer>
        ) : (
          ""
        )}
        {showSub ? (
          <ItemContainer>
            <Link className="no_underline" to="/brands">
              <ItemWrapper>
                {/* <BrandIcon/> */}
                <SubItemName displaySidebar={displaySidebar}>
                  Brands
                </SubItemName>
              </ItemWrapper>
            </Link>
          </ItemContainer>
        ) : (
          ""
        )}
        {showSub ? (
          <ItemContainer>
            <Link className="no_underline" to="/products">
              <ItemWrapper>
                {/* <ProductIcon /> */}
                <SubItemName displaySidebar={displaySidebar}>
                  Products
                </SubItemName>
              </ItemWrapper>
            </Link>
          </ItemContainer>
        ) : (
          ""
        )}
           {showSub ? (
          <ItemContainer>
            <Link className="no_underline" to="/zone">
              <ItemWrapper>
                {/* <ProductIcon /> */}
                <SubItemName displaySidebar={displaySidebar}>
                  Zones
                </SubItemName>
              </ItemWrapper>
            </Link>
          </ItemContainer>
        ) : (
          ""
        )}
         {showSub ? (
          <ItemContainer>
            <Link className="no_underline" to="/asset">
              <ItemWrapper>
         
                <SubItemName displaySidebar={displaySidebar}>
                  Asset
                </SubItemName>
              </ItemWrapper>
            </Link>
          </ItemContainer>
        ) : (
          ""
        )}
        <ItemContainer>
          <Link className="no_underline" to="/building">
            <ItemWrapper>
              <BuildingIcon />
              <ItemName displaySidebar={displaySidebar}>Building</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Link className="no_underline" to="/suppliers">
            <ItemWrapper>
              <UserIcon />
              <ItemName displaySidebar={displaySidebar}>Suppliers</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Link className="no_underline" to="/regional_warehouse">
            <ItemWrapper>
              <CostCenterIcon />
              <ItemName displaySidebar={displaySidebar}>Regional Warehouse</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Link className="no_underline" to="/site">
            <ItemWrapper>
              <CostCenterIcon />
              <ItemName displaySidebar={displaySidebar}>Site</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
        {/* <ItemContainer>
          <Link className="no_underline" to="/cost_center">
            <ItemWrapper>
              <CostCenterIcon />
              <ItemName displaySidebar={displaySidebar}>Cost Center</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer> */}
        {/* <ItemContainer>
          <Link className="no_underline" to="/customers">
            <ItemWrapper>
              <UserIcon />
              <ItemName displaySidebar={displaySidebar}>Customers</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer> */}
        <ItemContainer>
          <Link className="no_underline" to="/currency">
            <ItemWrapper>
              <UserIcon />
              <ItemName displaySidebar={displaySidebar}>Currency</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
        {dummyData.map((itemData, index) => (
          <ItemContainer
            key={index}
            onClick={() => setActiveItem(itemData.id)}
            className={itemData.id === activeItem ? "active" : ""}
          >
            <Link to={itemData.path} className="no_underline">
              <ItemWrapper>
                {itemData.icon}
                <ItemName displaySidebar={displaySidebar}>
                  {itemData.name}
                </ItemName>
              </ItemWrapper>
            </Link>
          </ItemContainer>
        ))}
        <ItemContainer>
          <Link className="no_underline" to="/request_maintenance">
            <ItemWrapper>
              <UserIcon />
              <ItemName displaySidebar={displaySidebar}>Request Maintenance</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Link className="no_underline" to="/request_material_list">
            <ItemWrapper>
              <UserIcon />
              <ItemName displaySidebar={displaySidebar}>Request Material</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
        {
          role == 'Warehouse Supervisor' &&
          <ItemContainer>
          <Link className="no_underline" to="/sales_order_list">
            <ItemWrapper>
              <UserIcon />
              <ItemName displaySidebar={displaySidebar}>Sales Order</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
        }
       
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
