import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowBackIcon } from "../Icons";
import { HomeIcon } from "../Icons";
import { useNavigate } from 'react-router-dom';

import {
    Container,
    Wrapper,
    Right,
    Image,
    Left,
} from "./SidebarStyles";
import styled from "styled-components";

const Span = styled.span`
  color: #7c7788;
  text-decoration: none;
  font-size: 20px;
  padding: 5px;
`;

const Nav = (props) => {
  const {page} = props;
  const navigate =useNavigate();
  
  const back=()=>{

    navigate(-1)
  }

  return (
    <Container>
        <Wrapper>
            <Left>
            <Link className='no_underline'>
            <button className="btn" onClick={back}>
                   <ArrowBackIcon /> Back to Home
            </button>
            </Link>
            </Left>
            <Right>
              <Image src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'></Image>
              <Span>Finance One</Span>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Nav