import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProductManagement = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])
    
    return (
        <div>
            <MetaHeader title={`จัดการสินค้า`} />
            <Navigation />
            <TitleBox title={'จัดการสินค้า'} name={'เพิ่มสินค้า'} path={'/add-general-product'} status={true} />
            <TitleBox title={'จัดการสินค้ากาชาปอง'} name={'เพิ่มสินค้ากาชาปอง'} path={'/add-gacha-product'} status={true} />
            <TitleBox title={'จัดการสินค้าประมูล'} name={'เพิ่มสินค้าประมูล'} path={'/add-auction-product'} status={true} />
            
        </div>
    )
}

export default ProductManagement