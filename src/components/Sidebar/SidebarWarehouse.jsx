import React, { useState } from 'react'
import { Link } from "react-router-dom";
import {  ItemContainer,  ItemWrapper,  ItemName } from "./SidebarStyles";
import {  HomeIcon, UserIcon, CostCenterIcon } from "../Icons";
import styled from "styled-components";


  const SubItemName = styled.span`
  margin-left: 30px;
`;

const SidebarWarehouse = ({displaySidebar}) => {
    const [showSub, setShowSub] = useState(false);

    const show_sub = () => {
        setShowSub(!showSub);
      };
  return (
    <>

    <ItemContainer>
          <Link className="no_underline" onClick={show_sub}>
            <ItemWrapper>
              <HomeIcon />
              <ItemName displaySidebar={displaySidebar}>Master Data</ItemName>
            </ItemWrapper>
          </Link>
    </ItemContainer>
    
     
        {showSub && (
            <>
            <ItemContainer>
            <Link className="no_underline" to="/categories">
              <ItemWrapper>
                <SubItemName displaySidebar={displaySidebar}>
                  Categories
                </SubItemName>
              </ItemWrapper>
            </Link>
          </ItemContainer>
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
          <ItemContainer>
            <Link className="no_underline" to="/asset">
              <ItemWrapper>
         
                <SubItemName displaySidebar={displaySidebar}>
                  Asset
                </SubItemName>
              </ItemWrapper>
            </Link>
          </ItemContainer>
          </>
        ) 
        }
    
        <ItemContainer>
          <Link className="no_underline" to="/regional_warehouse">
            <ItemWrapper>
              <CostCenterIcon />
              <ItemName displaySidebar={displaySidebar}>Regional Warehouse</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Link className="no_underline" to="/material_issue_list">
            <ItemWrapper>
              <CostCenterIcon />
              <ItemName displaySidebar={displaySidebar}>Material Issue</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Link className="no_underline" to="/warehouse_transfer/list">
            <ItemWrapper>
              <CostCenterIcon />
              <ItemName displaySidebar={displaySidebar}>Warehouse Transfer</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Link className="no_underline" to="/sales_order_list">
            <ItemWrapper>
              <UserIcon />
              <ItemName displaySidebar={displaySidebar}>Sales Order</ItemName>
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
    </>
  )
}

export default SidebarWarehouse