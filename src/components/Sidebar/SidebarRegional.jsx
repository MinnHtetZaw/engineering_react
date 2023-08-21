import React from 'react'
import { Link } from "react-router-dom";
import { ItemContainer,ItemWrapper,ItemName} from "./SidebarStyles";
import { CostCenterIcon } from "../Icons";


const SidebarRegional = ({displaySidebar}) => {
  return (
    <>
     <ItemContainer>
          <Link className="no_underline" to="/regional/inventory">
            <ItemWrapper>
              <CostCenterIcon />
              <ItemName displaySidebar={displaySidebar}>Inventory</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
     <ItemContainer>
          <Link className="no_underline" to="/regional_warehouse_transfer/list">
            <ItemWrapper>
              <CostCenterIcon />
              <ItemName displaySidebar={displaySidebar}>Warehouse Transfer</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Link className="no_underline" to="/delivery_order/list">
            <ItemWrapper>
              <CostCenterIcon />
              <ItemName displaySidebar={displaySidebar}>Delivery Order List</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Link className="no_underline" to="/regional/good_receive_notes">
            <ItemWrapper>
              <CostCenterIcon />
              <ItemName displaySidebar={displaySidebar}>Good Receive Notes</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
    </>
  )
}

export default SidebarRegional