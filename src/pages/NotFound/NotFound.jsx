import React from 'react'
import background from "../../assets/images/404/Na_June_67.jpg"
import styled from 'styled-components'


const Background = styled.div`
    background-image: url(${background});
    background-repeat: no-repeat;
    background-size: cover;
    width : 1000px;
    height: 700px;

`

export const NotFound = () => {
  return (
    <div  className='d-flex justify-content-center align-items-center vh-100'>
<Background>

</Background>

    </div>
  )
}
