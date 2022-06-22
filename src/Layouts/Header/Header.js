import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../Assets/Styles/style.css'
import logo from '../../Assets/Images/hangNgayIcon.png'
import logo2 from '../../Assets/Images/huTaiChinhIcon.png'
import logo3 from '../../Assets/Images/thongKeIcon.png'
import logo4 from '../../Assets/Images/caiDatIcon.png'
import logo5 from '../../Assets/Images/timKiemIcon.png'
import logo6 from '../../Assets/Images/thongBaoIcon.jpg'
import { DateFormat } from "../../Utils/DateFormat"

const Header = () => {
    const [bgColorNavItem, setBgColorNavItem] = useState({
        hangNgay: "",
        huTaiChinh: "",
        thongKe: "",
        catDat: "",
    })

    const [currentDate, setCurrentDate] = useState(<DateFormat />)
    useEffect(() => {
        setTimeout(() => {
            setCurrentDate(<DateFormat />)
        }, 1000)
    })

    return (
        <header>
            <nav>
                <ul className="nav">
                    <li className="nav-item" style={{ backgroundColor: bgColorNavItem.hangNgay }}>
                        <Link className="nav-link text-white" onClick={() => setBgColorNavItem({ hangNgay: "#7970de", huTaiChinh: "", thongKe: "", catDat: "" })} to="/Budget-App">
                            <img src={logo} width="30" alt="hangNgay" />
                            <span className="ms-1">Hàng ngày</span>
                        </Link>
                    </li>
                    <li className="nav-item" style={{ backgroundColor: bgColorNavItem.huTaiChinh }}>
                        <Link className="nav-link text-white" onClick={() => setBgColorNavItem({ hangNgay: "", huTaiChinh: "#7970de", thongKe: "", catDat: "" })} to="/hutaichinh">
                            <img src={logo2} alt="huTaiChinh" width="30" />
                            <span className="ms-1">Hũ tài chính</span>
                        </Link>
                    </li>
                    <li className="nav-item" style={{ backgroundColor: bgColorNavItem.thongKe }}>
                        <Link className="nav-link text-white" onClick={() => setBgColorNavItem({ hangNgay: "", huTaiChinh: "", thongKe: "#7970de", catDat: "" })} to="/thongke">
                            <img src={logo3} alt="thongKe" width="30" />
                            <span className="ms-1">Thống kê</span>
                        </Link>
                    </li>
                    <li className="nav-item" style={{ backgroundColor: bgColorNavItem.catDat }}>
                        <Link className="nav-link text-white" onClick={() => setBgColorNavItem({ hangNgay: "", huTaiChinh: "", thongKe: "", catDat: "#7970de" })} to="/caidat">
                            <img src={logo4} alt="caiDat" width="30" />
                            <span className="ms-1">Cài đặt</span>
                        </Link>
                    </li>
                    <li className="nav-item ms-auto">
                        <span className="nav-link text-white">{currentDate}</span>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="/">
                            <img src={logo5} alt="logo5" width="60" />
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="/">
                            <img src={logo6} alt="logo6" width="30" />
                        </a>
                    </li>
                </ul>
            </nav>

        </header>
    )
}

export default Header