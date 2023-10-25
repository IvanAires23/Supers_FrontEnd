import { Link, useNavigate } from "react-router-dom"
import { Oval } from "react-loader-spinner"
import DATABASE_URL from "../../database"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css';
import { Button, Form, InputData } from "./style"
import { useState } from "react"

export default function SignUp({ setSignIn }) {
    const [emailTopLabel, setEmailTopLabel] = useState('3px')
    const [passwordTopLabel, setPasswordTopLabel] = useState('3px')
    const [nameTopLabel, setNameTopLabel] = useState('3px')
    const [heroNameTopLabel, setHeroNameTopLabel] = useState('3px')
    const [confirmPasswordTopLabel, setConfirmPasswordTopLabel] = useState('3px')
    const [send, setSend] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [name, setName] = useState()
    const [heroName, setHeroName] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const navigate = useNavigate()

    function login(e) {
        e.preventDefault()
        setSend(true)
        const body = { email, password, name, heroName, confirmPassword }
        axios.post(`${DATABASE_URL}/auth/sign-up`, body)
            .then(() => {
                toast.success("Sucesso, você sera direcionado para pagina de login", { autoClose: 2000 })
                setTimeout(() => {
                    setSignIn(true)
                }, 2000)
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
        else if (input === 'name') return setNameTopLabel('-18px')
        else if (input === 'heroName') return setHeroNameTopLabel('-18px')
        else if (input === 'confirmPassword') return setConfirmPasswordTopLabel('-18px')
    }

    function resetLabel(value, input) {
        if (input === 'email' && value === '') return setEmailTopLabel('3px')
        else if (input === 'password' && value === '') return setPasswordTopLabel('3px')
        if (input === 'name' && value === '') return setNameTopLabel('3px')
        else if (input === 'heroName' && value === '') return setHeroNameTopLabel('3px')
        if (input === 'confirmPassword' && value === '') return setConfirmPasswordTopLabel('3px')
    }

    return (
        <>
            <Form onSubmit={login}>
                <span>Bem vindo</span>

                <InputData top={nameTopLabel}   >
                    <input type="text" id="nameLabel" onChange={e => setName(e.target.value)} onFocus={() => moveLabelUp('name')} onBlur={e => resetLabel(e.target.value, 'name')}></input>
                    <label htmlFor="nameLabel" id="nameLabel" >Name</label>
                </InputData>

                <InputData top={heroNameTopLabel}   >
                    <input type="text" id="heroNameLabel" onChange={e => setHeroName(e.target.value)} onFocus={() => moveLabelUp('heroName')} onBlur={e => resetLabel(e.target.value, 'heroName')}></input>
                    <label htmlFor="heroNameLabel" id="heroNameLabel" >Nome de Heroi</label>
                </InputData>

                <InputData top={emailTopLabel}   >
                    <input type="email" id="emailLabel" onChange={e => setEmail(e.target.value)} onFocus={() => moveLabelUp('email')} onBlur={e => resetLabel(e.target.value, 'email')}></input>
                    <label htmlFor="emailLabel" id="emailLabel" >Email</label>
                </InputData>

                <InputData top={passwordTopLabel}   >
                    <input type="password" id="passwordLabel" onChange={e => setPassword(e.target.value)} onFocus={() => moveLabelUp('password')} onBlur={e => resetLabel(e.target.value, 'password')}></input>
                    <label htmlFor="passwordLabel" id="passwordLabel" >Senha</label>
                </InputData>

                <InputData top={confirmPasswordTopLabel}   >
                    <input type="password" id="confirmPasswordLabel" onChange={e => setConfirmPassword(e.target.value)} onFocus={() => moveLabelUp('confirmPassword')} onBlur={e => resetLabel(e.target.value, 'confirmPassword')}></input>
                    <label htmlFor="confirmPasswordLabel" id="confirmPasswordLabel" >Confirme sua senha</label>
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

                /> : 'Cadastrar'}</Button>
                <h2>Já possui uma conta? <Link onClick={() => setSignIn(true)}>Clique aqui</Link></h2>
            </Form>
            <ToastContainer />
        </>
    )
}

