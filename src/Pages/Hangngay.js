import { useState, useEffect } from "react"
import { ThangNamFormat } from "../Utils/DateFormat"
import { FcPrevious, FcNext } from "react-icons/fc"
import { Row } from "react-bootstrap"
import ModalThuChi from "../Components/ModalThuChi"
import { GiaoDichHangNgay } from "../Layouts/Main/Layout_GiaoDichHangNgay"
import { createContext } from "react"

export const CacGiaoDich = createContext({
    cacGiaoDich: [],
    setCacGiaoDich: () => []
})

const Hangngay = () => {
    const [thang, nam] = ThangNamFormat()
    const [navItem, setStyleNavItem] = useState({
        hangNgay: "",
        ngay: "",
        tuan: "",
        thang: "",
    })
    const [navLink, setStyleNavLink] = useState({
        hangNgay: "nav-link text-white-50",
        ngay: "nav-link text-white-50",
        tuan: "nav-link text-white-50",
        thang: "nav-link text-white-50",
    })
    const [cacGiaoDich, setCacGiaoDich] = useState([])
    useEffect(() => {
        fetch("https://doananhtingithub40102.github.io/MyData/budget-app/data.json").then(function (response) { return response.json() })
            .then(function (json) { setCacGiaoDich(json) })
            .catch(function (error) { console.log(error) });
    }, [])
    
    return (
        <CacGiaoDich.Provider value={{ cacGiaoDich, setCacGiaoDich }}>
            <main className="border-top pb-2">
                <div className="mx-2 mt-2">
                    <a href="/">{<FcPrevious />}</a>
                    <span className="text-light">Tháng {thang} {nam}</span>
                    <a href="/">{<FcNext />}</a>
                </div>
                <Row className="border-bottom">
                    <nav className="col-md-6">
                        <ul className="nav">
                            <li className="nav-item me-2" style={{ borderBottom: navItem.hangNgay }} onClick={() => setStyleNavItem({ hangNgay: "2px solid red", ngay: "", tuan: "", thang: "" })}>
                                <a href="/" className={navLink.hangNgay} onClick={() => setStyleNavLink({ hangNgay: "nav-link text-white", ngay: "nav-link text-white-50", tuan: "nav-link text-white-50", thang: "nav-link text-white-50" })}>Hàng ngày</a>
                            </li>
                            <li className="nav-item me-2" style={{ borderBottom: navItem.ngay }} onClick={() => setStyleNavItem({ hangNgay: "", ngay: "2px solid red", tuan: "", thang: "" })}>
                                <a href="/" className={navLink.ngay} onClick={() => setStyleNavLink({ hangNgay: "nav-link text-white-50", ngay: "nav-link text-white", tuan: "nav-link text-white-50", thang: "nav-link text-white-50" })}>Ngày</a>
                            </li>
                            <li className="nav-item me-2" style={{ borderBottom: navItem.tuan }} onClick={() => setStyleNavItem({ hangNgay: "", ngay: "", tuan: "2px solid red", thang: "" })}>
                                <a href="/" className={navLink.tuan} onClick={() => setStyleNavLink({ hangNgay: "nav-link text-white-50", ngay: "nav-link text-white-50", tuan: "nav-link text-white", thang: "nav-link text-white-50" })}>Tuần</a>
                            </li>
                            <li className="nav-item me-2" style={{ borderBottom: navItem.thang }} onClick={() => setStyleNavItem({ hangNgay: "", ngay: "", tuan: "", thang: "2px solid red" })}>
                                <a href="/" className={navLink.thang} onClick={() => setStyleNavLink({ hangNgay: "nav-link text-white-50", ngay: "nav-link text-white-50", tuan: "nav-link text-white-50", thang: "nav-link text-white" })}>Tháng</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="col-md-6 mt-2">
                        <Row className="mx-2">
                            <div className="col">
                                <div className="text-white">Tổng thu nhập</div>
                                <span className="text-info">3.500.000</span>
                            </div>
                            <div className="col">
                                <div className="text-white">Tổng chi tiêu</div>
                                <span className="text-danger">1.500.000</span>
                            </div>
                            <div className="col">
                                <div className="text-white">Còn lại</div>
                                <span className="text-white-50">2.000.000</span>
                            </div>
                        </Row>
                    </div>
                </Row>

                {cacGiaoDich.map((giaoDich, index) => {
                    return (
                        index % 2 === 0 && (
                            <Row className="content" key={index}>
                                <GiaoDichHangNgay props={cacGiaoDich[index]} />
                                {cacGiaoDich[index + 1] !== undefined && <GiaoDichHangNgay props={cacGiaoDich[index + 1]} />}
                            </Row>
                        )
                    )
                })}
                <ModalThuChi />
            </main>
        </CacGiaoDich.Provider>
    )
}
export default Hangngay