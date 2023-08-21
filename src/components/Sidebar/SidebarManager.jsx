import React, { useState } from 'react'
import { Link } from "react-router-dom";
import {
    ItemContainer,
    ItemWrapper,
    ItemName,
  } from "./SidebarStyles";
import {
    
    UserIcon,
    BuildingIcon,
    CostCenterIcon,

  } from "../Icons";

import { dummyData } from "..";

const SidebarManager = ({displaySidebar}) => {
  const [activeItem, setActiveItem] = useState(0);

  return (
   <>
        <ItemContainer>
          <Link className="no_underline" to="/site">
            <ItemWrapper>
              <CostCenterIcon />
              <ItemName displaySidebar={displaySidebar}>Site</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
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
          <Link className="no_underline" to="/currency">
            <ItemWrapper>
              <UserIcon />
              <ItemName displaySidebar={displaySidebar}>Currency</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Link className="no_underline" to="/request_maintenance">
            <ItemWrapper>
              <UserIcon />
              <ItemName displaySidebar={displaySidebar}>Request Maintenance</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Link className="no_underline" to="/manager/delivery_order/list">
            <ItemWrapper>
              <UserIcon />
              <ItemName displaySidebar={displaySidebar}>Approve Delivery Order</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Link className="no_underline" to="/check_warehouse_transfer">
            <ItemWrapper>
              <UserIcon />
              <ItemName displaySidebar={displaySidebar}>WarehouseTransfer Monitor</ItemName>
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
          <Link className="no_underline" to="/request_material_list">
            <ItemWrapper>
              <UserIcon />
              <ItemName displaySidebar={displaySidebar}>Request Material</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
    </>
  )
}

export default SidebarManager