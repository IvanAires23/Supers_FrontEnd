import styled from "styled-components"

export const Button = styled.button`
    color: #FFFFFF;
    transition: 1s;
    background: linear-gradient(to right, #2c58f8, #8500ba);
    width: 60%;
    height: 40px;
    outline: 0;
    border: 0;
    border-radius:20px;
    cursor: pointer;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`

export const InputData = styled.div`
     position: relative;
     margin-bottom: 35px;
     width: 100%;
     input{
        border: 0;
        border-bottom: 1px solid #000000;
        outline: 0;
        width: 100%;
        padding: 2px;
        font-size: 16px;
    }
    label{
        position: absolute;
        left: 10px;
        top: ${props => props.top};
        color: #999;
        pointer-events: none;
        transition: 0.3s;
        font-size: 17px;
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    span{
        display: block;
        font-family: 'Open Sans', sans-serif;
        font-family: 'Oswald', sans-serif; 
        font-size: 30px;
        color: #333333;
        line-height: 1.2;
        text-align: center;
        margin-bottom: 50px;
    }
    
`