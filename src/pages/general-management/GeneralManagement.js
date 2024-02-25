import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const GeneralManagement = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])
    
    return (
        <div>
            <MetaHeader title={`จัดการทั่วไป`} />
            <Navigation />
            <TitleBox title={'จัดการแบนเนอร์'} name={'เพิ่มแบนเนอร์'} path={'/add-banner'} status={true} />
            <TitleBox title={'จัดการชื่อเกม'} name={'เพิ่มชื่อเกม'} path={'/add-game-name'} status={true} />
            <TitleBox title={'จัดการวิธีการชำระเงิน'} />
        </div>
    )
}

export default GeneralManagement