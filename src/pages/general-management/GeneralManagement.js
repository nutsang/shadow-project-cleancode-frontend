import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { Icon } from '@iconify/react'

const GeneralManagement = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])

    const [dataBanner, setDataBanner] = useState([])
    const [dataGameName, setDataGameName] = useState([])
    const [dataGameNameSearch, setDataGameNameSearch] = useState([])
    const [dataPaymentMethod, setDataPaymentMethod] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/banner-select`)
        .then((response) => {
            if(response.data.status){
                setDataBanner(response.data.payload.map((value, index) => {
                    return {...value, index: index+1}
                }))
            }
        })
        .catch((error) => {})
    }, [])
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/game-name-select`)
        .then((response) => {
            if(response.data.status){
                setDataGameName(response.data.payload.map((value, index) => {
                    return {...value, index: index+1}
                }))
            }
        })
        .catch((error) => {})
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/payment-method-select`)
        .then((response) => {
            if(response.data.status){
                setDataPaymentMethod(response.data.payload.map((value, index) => {
                    return {...value, index: index+1}
                }))
            }
        })
        .catch((error) => {})
    }, [])

    const columnsBanner = [
        {
            name: 'ลำดับ',
            selector: row => row.index
        },
        {
            name: 'ลิงก์ภาพ',
            selector: row => row.information,
            cell: (row) => [<img key={row.uuid} alt={row.uuid} src={`${process.env.REACT_APP_BANNER}${row.information}`}/>]
        },
        {
            name: 'แก้ไข',
            selector: row => row.uuid,
            cell: (row) => [<Link key={row.uuid} to={`/edit-banner/${row.uuid}`} className='btn border-none bg-[#F8BB86] hover:bg-[#cf9c6f] text-[#FFFFFF]'>แก้ไข</Link>]
        },
        {
            name: 'ลบ',
            selector: row => row.uuid,
            cell: (row) => [<button key={row.uuid} type={`button`} className='btn border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF]'>ลบ</button>]
        }
    ]

    const columnsGameName = [
        {
            name: 'ลำดับ',
            selector: row => row.index
        },
        {
            name: 'ชื่อเกม',
            selector: row => row.game_name
        },
        {
            name: 'แก้ไข',
            selector: row => row.uuid,
            cell: (row) => [<Link key={row.uuid} to={`/edit-game-name/${row.uuid}`} className='btn border-none bg-[#F8BB86] hover:bg-[#cf9c6f] text-[#FFFFFF]'>แก้ไข</Link>]
        },
        {
            name: 'ลบ',
            selector: row => row.uuid,
            cell: (row) => [<button key={row.uuid} type={`button`} className='btn border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF]'>ลบ</button>]
        }
    ]

    const columnsPaymentMethod = [
        {
            name: 'ลำดับ',
            selector: row => row.index
        },
        {
            name: 'วิธีการชำระเงิน',
            selector: row => row.method
        },
        {
            name: 'เปลี่ยน',
            selector: row => row.uuid,
            cell: (row) => [<Link key={row.uuid} to={`${row.method === 'วิดีโอ' ? '/edit-video-payment-method': '/edit-image-payment-method'}/${row.uuid}`} className='btn border-none bg-[#F8BB86] hover:bg-[#cf9c6f] text-[#FFFFFF]'>เปลี่ยน</Link>]
        },
        {
            name: 'ล้าง',
            selector: row => row.uuid,
            cell: (row) => [<button key={row.uuid} type={`button`} className='btn border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF]'>ล้าง</button>]
        }
    ]

    const filterDataGameName = (event) => {
        const newDataGameName = dataGameName.filter((row) => {
            return row.game_name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setDataGameNameSearch(newDataGameName)
    }

    return (
        <div>
            <MetaHeader title={`จัดการทั่วไป`} />
            <Navigation />
            <TitleBox title={'จัดการแบนเนอร์'} name={'เพิ่มแบนเนอร์'} path={'/add-banner'} status={true} />
            <DataTable
                columns={columnsBanner}
                data={dataBanner}
                fixedHeader
                pagination
                persistTableHead={true}
                minRows={5}
                className='px-10'
            />
            <TitleBox title={'จัดการชื่อเกม'} name={'เพิ่มชื่อเกม'} path={'/add-game-name'} status={true} />
            <div className='flex flex-row justify-end px-10 my-3'>
                <label className="flex items-center self-end gap-2 input input-bordered input-md size-fit">
                    <Icon icon={"material-symbols:search"} className='text-xl' />
                    <input type="text" placeholder="ชื่อเกม" onChange={filterDataGameName} />
                </label>
            </div>
            <DataTable
                columns={columnsGameName}
                data={dataGameNameSearch.length <= 0 ? dataGameName : dataGameNameSearch}
                fixedHeader
                pagination
                persistTableHead={true}
                minRows={5}
                className='px-10'
            />
            <TitleBox title={'จัดการวิธีการชำระเงิน'} />
            <DataTable
                columns={columnsPaymentMethod}
                data={dataPaymentMethod}
                fixedHeader
                pagination
                persistTableHead={true}
                minRows={5}
                className='px-10'
            />
        </div>
    )
}

export default GeneralManagement