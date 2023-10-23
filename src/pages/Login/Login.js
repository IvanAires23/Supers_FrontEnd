import axios from "axios"
import { useState } from "react"
import styled from "styled-components"
import DATABASE_URL from "../../database"
import { Link, useNavigate } from "react-router-dom"
import { Oval } from "react-loader-spinner"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css';

export default function Login() {
    const [emailTopLabel, setEmailTopLabel] = useState('3px')
    const [passwordTopLabel, setPasswordTopLabel] = useState('3px')
    const [send, setSend] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()


    function login(e) {
        e.preventDefault()
        setSend(true)
        const body = { email, password }
        axios.post(`${DATABASE_URL}/auth/sign-in`, body)
            .then(res => {
                localStorage.setItem("token", res.data.token)
                navigate('/')
            })
            .catch(err => {
                console.log(err.response.data)
                if (err.response.data.length > 0) toast.error(err.response.data[0])
                else toast.error(err.response.data.message)
                setSend(false)
            })

    }

    function moveLabelUp(input) {
        if (input === 'email') return setEmailTopLabel('-18px')
        else if (input === 'password') return setPasswordTopLabel('-18px')
    }

    function resetLabel(value, input) {
        if (input === 'email') {
            if (value === '') return setEmailTopLabel('3px')
        }
        else if (input === 'password') {
            if (value === '') return setPasswordTopLabel('3px')
        }
    }

    return (
        <ContainerLogin>
            <Container>
                <Form onSubmit={login}>
                    <span>Bem vindo</span>

                    <InputData top={emailTopLabel}   >
                        <input type="text" id="emailLabel" onChange={e => setEmail(e.target.value)} onFocus={() => moveLabelUp('email')} onBlur={e => resetLabel(e.target.value, 'email')}></input>
                        <label htmlFor="emailLabel" id="emailLabel" >Email</label>
                    </InputData>
                    <InputData top={passwordTopLabel}   >
                        <input type="password" id="passwordLabel" onChange={e => setPassword(e.target.value)} onFocus={() => moveLabelUp('password')} onBlur={e => resetLabel(e.target.value, 'password')}></input>
                        <label htmlFor="passwordLabel" id="passwordLabel" >Senha</label>
                    </InputData>

                    <Button disabled={send} send={send}>{!send ? 'Login' : < Oval
                        height={35}
                        width={35}
                        color="#FFFFFF"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#ccc"
                        strokeWidth={2}
                        strokeWidthSecondary={2}

                    />}</Button>
                    <h2>Ainda não tem cadastro na plataforma?<Link>Clique aqui</Link></h2>
                </Form>
            </Container>
            <ToastContainer />
        </ContainerLogin>
    )
}

const Button = styled.button`
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

const InputData = styled.div`
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

const Form = styled.form`
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