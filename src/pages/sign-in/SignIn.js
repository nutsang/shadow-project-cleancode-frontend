import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import { Icon } from '@iconify/react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { signInAccount } from '../../service/authentication'
import { useSelector,useDispatch } from 'react-redux'
import { setIsLogin } from '../../redux/isLoginSlice'

const SignIn = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        isLogin.status && navigate('/')
    }, [isLogin, navigate])

    const [account, setAccount] = useState({email:'', password:''})
    const [hide, setHide] = useState(true)
    
    const setEmail = (email) => {
        setAccount({...account, email:email.target.value})
    }

    const setPassword = (password) => {
        setAccount({...account, password:password.target.value})
    }

    const alertSuccess = (title, text, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: confirmButtonText
        })
        setAccount({email:'', password:''})
        axios.get(`${process.env.REACT_APP_API}/authentication-account`, { withCredentials: true })
        .then((response) => {
            dispatch(setIsLogin({status: response.data.status, payload: response.data.payload}))
        })
    }

    const alertError = (title, text, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'error',
            confirmButtonText: confirmButtonText
        })
    }

    const alertWarning = (title, text, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            confirmButtonText: confirmButtonText
        })
    }

    const handleSignInAccount = (event) => {
        event.preventDefault()
        signInAccount(account, alertSuccess, alertError, alertWarning)
    }

    return (
        <div>
            <MetaHeader title={`เข้าสู่ระบบ`} />
            <Navigation />
            <form onSubmit={handleSignInAccount} className='p-2 bg-[#33007B] form-control sm:hidden min-w-[240px]'>
                <div className='flex flex-row items-center justify-center flex-nowrap'>
                    <Icon icon={'game-icons:minerals'} className='size-fit text-[#F000B8] text-2xl sm:text-4xl' />
                    <span translate='no' className='subpixel-antialiased not-italic size-fit font-normal text-[#FFFFFF] text-xl'>SHADOW</span>
                </div>
                <div className='flex flex-row items-center justify-center flex-nowrap'>
                    <span translate='no' className='subpixel-antialiased not-italic size-fit font-normal text-[#FFFFFF] text-xl'>ยินดีต้อนรับกลับ</span>
                </div>
                <input value={account.email} type={'text'} placeholder='อีเมล' onChange={setEmail} className='input mt-4 bg-[#D9D9D9] text-[#000000]'/>
                <label className='input mt-4 bg-[#D9D9D9] text-[#000000] flex flex-row flex-nowrap items-center'>
                    <input value={account.password} type={hide ? 'password' : 'text'} placeholder='รหัสผ่าน' onChange={setPassword} className='size-full'/>
                    <span className='flex items-center justify-end'>
                    <Icon icon={hide ? "mdi:hide" : "mdi:show"} className='text-[#000000] size-full' onClick={() => setHide(!hide)}/>
                    </span>
                </label>
                <button type='submit' className='btn mt-4 border-none bg-[#A5DC86] hover:bg-[#86b36d] text-[#FFFFFF]'>เข้าสู่ระบบ</button>
                <Link to='/' className='btn mt-4 border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF]'>กลับสู่หน้าหลัก</Link>
                <Link to='/sign-up' className='btn mt-4 border-none bg-[#3FC3EE] hover:bg-[#46a5c4] text-[#FFFFFF]'>ไปหน้าสมัครสมาชิก</Link>
                <Link to='/forgot-password' className='btn mt-4 border-none bg-[#FFB302] hover:bg-[#E5A101] text-[#FFFFFF]'>ลืมรหัสผ่าน</Link>
            </form>

            <div className='container hidden sm:flex justify-center w-full h-full mx-auto mt-5'>
                <form onSubmit={handleSignInAccount} className={`p-10 rounded bg-[#33007B]`}>
                    <div className='flex justify-center align-middle'>
                    <Icon icon={"game-icons:minerals"} className='text-[#F000B8]' width={48} height={48} />
                    <h4 className='text-5xl text-center text-[#FFFFFF]'>SHADOW</h4>
                    </div>
                    <h4 className='text-3xl text-center text-[#FFFFFF] mt-5'>ยินดีต้อนรับกลับ</h4>
                    <div className='w-full max-w-xs mt-5 form-control'>
                        <input value={account.email} type={'text'} placeholder='อีเมล' className='input w-full max-w-xs bg-[#D9D9D9] text-[#000000]' onChange={setEmail}/>
                    </div>
                    <div className='w-full max-w-xs mt-5 form-control'>
                        <label className='input w-full max-w-xs bg-[#D9D9D9] text-[#000000] flex justify-between items-center gap-2'>
                            <input value={account.password} type={hide ? 'password' : 'text'} placeholder='รหัสผ่าน' onChange={setPassword}/>
                            <Icon icon={hide ? "mdi:hide" : "mdi:show"} className='text-[#000000]' width={24} height={24} onClick={() => setHide(!hide)}/>
                        </label>
                    </div>
                    <div className='flex justify-between mt-1 align-middle'>
                        <Link to='/sign-up' className='link text-[#3FC3EE] hover:text-[#46a5c4] flex'>
                            <span className='mr-1'>สมัครสมาชิก</span>
                            <Icon icon={"line-md:account-add"} className='text-[#3FC3EE] hover:text-[#46a5c4]' width={24} height={24} />
                        </Link>
                        <Link to='/forgot-password' className='link text-[#F27474] hover:text-[#ca6161]'>
                            ลืมรหัสผ่าน
                        </Link>
                    </div>
                    <div className='flex flex-col w-full border-opacity-50'>
                        <button className="btn border-none bg-[#A5DC86] hover:bg-[#86b36d] text-[#FFFFFF] w-full mt-5">เข้าสู่ระบบ</button>
                        <Link to='/' className="btn border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF] w-full mt-5">
                            กลับสู่หน้าหลัก
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn