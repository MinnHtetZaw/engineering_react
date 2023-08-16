import React from 'react'
import { Link } from "react-router-dom";
import { ItemContainer,ItemWrapper,ItemName} from "./SidebarStyles";
import { CostCenterIcon } from "../Icons";


const SidebarRegional = ({displaySidebar}) => {
  return (
    <>
     <ItemContainer>
          <Link className="no_underline" to="/warehouse_transfer/list">
            <ItemWrapper>
              <CostCenterIcon />
              <ItemName displaySidebar={displaySidebar}>Warehouse Transfer</ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
    </>
  )
}

export default SidebarRegional