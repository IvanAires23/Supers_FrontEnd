import styled from "styled-components"
import SignIn from "../Components/SignIn/Sign-in"
import { useState } from "react"
import SignUp from "../Components/SignUp/Sign-up"
import { ToastContainer, toast } from "react-toastify"

export default function Login() {

    const [signIn, setSignIn] = useState(true)


    return (
        <ContainerLogin>
            <Container>
                {signIn ? <SignIn setSignIn={setSignIn} /> : <SignUp setSignIn={setSignIn} />}
            </Container>
            <ToastContainer />
        </ContainerLogin>
    )
}



const Container = styled.div`
    width: 390px;
    overflow: hidden;
    padding: 77px 55px 33px 55px;
    background-color: #FFFFFF;
    border-radius: 5px;
`
const ContainerLogin = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F2F2F2;
    padding: 15px;
`