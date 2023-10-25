import { Link, useNavigate } from "react-router-dom"
import { Oval } from "react-loader-spinner"
import DATABASE_URL from "../../database"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css';
import { Button, Form, InputData } from "./style"
import { useState } from "react"

export default function SignIn({ setSignIn }) {
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
                navigate('/home')
            })
            .catch(err => {
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
        <>
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

                <Button disabled={send} send={send}>{send ? < Oval
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

                /> : 'Login'}</Button>
                <h2>Ainda não tem cadastro na plataforma? <Link onClick={() => setSignIn(false)}>Clique aqui</Link></h2>
            </Form>
            <ToastContainer />
        </>
    )
}

