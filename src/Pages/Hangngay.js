import { useState, useEffect } from "react"
import { ThangNamFormat } from "../Utils/DateFormat"
import { FcPrevious, FcNext } from "react-icons/fc"
import { Row } from "react-bootstrap"
import ModalThuChi from "../Components/ModalThuChi"
import { GiaoDichHangNgay } from "../Layouts/Main/Layout_GiaoDichHangNgay"
import { createContext } from "react"
import { SetGiaoDichThangNam } from "../Utils/HandleGiaoDich"
import { TongCongGiaoDichThang } from "../Utils/CalculatorTongCong"
import { FormatSoTien } from "../Utils/NumberFormat"

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

    const [tongThuChiTheoThang, setTongThuChiTheoThang] = useState({
        tongThu: 0,
        tongChi: 0
    })

    const [navLink, setStyleNavLink] = useState({
        hangNgay: "nav-link text-white-50",
        ngay: "nav-link text-white-50",
        tuan: "nav-link text-white-50",
        thang: "nav-link text-white-50",
    })
    const [cacGiaoDich, setCacGiaoDich] = useState([])
    const [cacGiaoDichThangNam, setCacGiaoDichThangNam] = useState([])
    useEffect(() => {
        fetch("https://doananhtingithub40102.github.io/MyData/budget-app/data.json").then(function (response) { return response.json() })
        .then(function (json) {
            setCacGiaoDich(json);
        })
        .catch(function (error) { console.log(error) });
    }, [])
    
    
    const [thangNam, setThangNam] = useState({
        thang: thang,
        nam: nam
    })
    const handleThangNam = (operator) => {
        if (operator === "-"){
            if (thangNam.thang === 1){
                setThangNam({
                    thang: 12,
                    nam: thangNam.nam - 1
                })
            } else {
                setThangNam({
                    thang: thangNam.thang - 1,
                    nam: thangNam.nam
                })
            }
        } else if (operator === "+") {
            if (thangNam.thang === 12){
                setThangNam({
                    thang: 1,
                    nam: thangNam.nam + 1
                })
            } else {
                setThangNam({
                    thang: thangNam.thang + 1,
                    nam: thangNam.nam
                })
            }
        }
    }

    useEffect(() => {
        setCacGiaoDichThangNam(SetGiaoDichThangNam(cacGiaoDich, thangNam.thang, thangNam.nam))
        setTongThuChiTheoThang({
            tongThu: TongCongGiaoDichThang(SetGiaoDichThangNam(cacGiaoDich, thangNam.thang, thangNam.nam))[0],
            tongChi: TongCongGiaoDichThang(SetGiaoDichThangNam(cacGiaoDich, thangNam.thang, thangNam.nam))[1]
        })
    }, [thangNam, cacGiaoDich])
    
    return (
        <CacGiaoDich.Provider value={{ cacGiaoDich, setCacGiaoDich }}>
            <main className="border-top pb-2">
                <div className="mx-2 mt-2">
                    <span onClick={() => handleThangNam("-")} className="thangNam">{<FcPrevious />}</span>
                    <span className="text-light">Tháng {thangNam.thang} {thangNam.nam}</span>
                    <span onClick={() => handleThangNam("+")} className="thangNam">{<FcNext />}</span>
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
                                <span className="text-info">{FormatSoTien(tongThuChiTheoThang.tongThu)}</span>
                            </div>
                            <div className="col">
                                <div className="text-white">Tổng chi tiêu</div>
                                <span className="text-danger">{FormatSoTien(tongThuChiTheoThang.tongChi)}</span>
                            </div>
                            <div className="col">
                                <div className="text-white">Còn lại</div>
                                <span className="text-white-50">{FormatSoTien(tongThuChiTheoThang.tongThu - tongThuChiTheoThang.tongChi)}</span>
                            </div>
                        </Row>
                    </div>
                </Row>

                {cacGiaoDichThangNam.map((giaoDich, index) => {
                    return (
                        index % 2 === 0 && (
                            <Row className="content" key={index}>
                                <GiaoDichHangNgay props={cacGiaoDichThangNam[index]} />
                                {cacGiaoDichThangNam[index + 1] !== undefined && <GiaoDichHangNgay props={cacGiaoDichThangNam[index + 1]} />}
                            </Row>
                        )
                    )
                })}
                {cacGiaoDichThangNam.length === 0 && <span className="noGiaoDich">Không có giao dịch nào trong tháng</span>}
                <ModalThuChi />
            </main>
        </CacGiaoDich.Provider>
    )
}
export default Hangngay