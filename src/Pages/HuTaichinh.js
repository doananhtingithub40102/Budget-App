import { useState, useEffect } from "react"
import { ThangNamFormat } from "../Utils/DateFormat"
import { Row } from "react-bootstrap"
import { createContext } from "react"
import { SetGiaoDichThangNam } from "../Utils/HandleGiaoDich"
import { TongCongGiaoDichThang } from "../Utils/CalculatorTongCong"
import { GiMasonJar } from "react-icons/gi"
import { BiChevronDown } from "react-icons/bi"
import Dropdown from 'react-bootstrap/Dropdown'
import Badge from "react-bootstrap/Badge"

export const CacGiaoDich = createContext({
    cacGiaoDich: [],
    setCacGiaoDich: () => []
})

const Hangngay = () => {
    const [thang, nam] = ThangNamFormat()

    const [tongThuChiTheoThang, setTongThuChiTheoThang] = useState({
        tongThu: 0,
        tongChi: 0
    })

    const [cacGiaoDich, setCacGiaoDich] = useState([])
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

    useEffect(() => {
        setTongThuChiTheoThang({
            tongThu: TongCongGiaoDichThang(SetGiaoDichThangNam(cacGiaoDich, thangNam.thang, thangNam.nam))[0],
            tongChi: TongCongGiaoDichThang(SetGiaoDichThangNam(cacGiaoDich, thangNam.thang, thangNam.nam))[1]
        })
    }, [thangNam, cacGiaoDich])

    return (
        <CacGiaoDich.Provider value={{ cacGiaoDich, setCacGiaoDich }}>
            <main className="border-top pb-2">
                <Row>
                    <div className="col-md-6 mb-2">
                        <div className="soDuHuTaiChinh m-3 mb-2 p-3">
                            <div>Số dư khả dụng</div>
                            <div className="soDu">2.150.000đ</div>
                        </div>
                        <div className="soDuCacHu mx-3 p-2">
                            <Row className="px-3 py-2 align-items-center">
                                <div className="huIcon col-2 huIcon1">
                                    <GiMasonJar />
                                </div>
                                <div className="loaiHu col-6">
                                    Thiết yếu
                                </div>
                                <div className="soDuHu col-4 text-end">
                                    5.000.000.000đ
                                </div>
                            </Row>
                            <Row className="px-3 py-2 align-items-center">
                                <div className="huIcon col-2 huIcon2">
                                    <GiMasonJar />
                                </div>
                                <div className="loaiHu col-6">
                                    Hưởng thụ
                                </div>
                                <div className="soDuHu col-4 text-end">
                                    5.000.000.000đ
                                </div>
                            </Row>
                            <Row className="px-3 py-2 align-items-center">
                                <div className="huIcon col-2 huIcon3">
                                    <GiMasonJar />
                                </div>
                                <div className="loaiHu col-6">
                                    Giáo dục
                                </div>
                                <div className="soDuHu col-4 text-end">
                                    5.000.000.000đ
                                </div>
                            </Row>
                            <Row className="px-3 py-2 align-items-center">
                                <div className="huIcon col-2 huIcon4">
                                    <GiMasonJar />
                                </div>
                                <div className="loaiHu col-6">
                                    Tiết kiệm dài hạn
                                </div>
                                <div className="soDuHu col-4 text-end">
                                    5.000.000.000đ
                                </div>
                            </Row>
                            <Row className="px-3 py-2 align-items-center">
                                <div className="huIcon col-2 huIcon5">
                                    <GiMasonJar />
                                </div>
                                <div className="loaiHu col-6">
                                    Tự do tài chính
                                </div>
                                <div className="soDuHu col-4 text-end">
                                    5.000.000.000đ
                                </div>
                            </Row>
                            <Row className="px-3 py-2 align-items-center">
                                <div className="huIcon col-2 huIcon6">
                                    <GiMasonJar />
                                </div>
                                <div className="loaiHu col-6">
                                    Từ thiện
                                </div>
                                <div className="soDuHu col-4 text-end">
                                    5.000.000.000đ
                                </div>
                            </Row>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="m-3 my-2 text-light">
                            <h3>Lịch sử giao dịch</h3>
                        </div>
                        <Dropdown className="soDuCacHu dropdownHu mx-3 mt-3">
                            <Dropdown.Toggle variant="" className="px-3 py-2 align-items-center d-flex flex-row w-100">
                                <div className="huIcon me-2 ps-0 huIcon1">
                                    <GiMasonJar />
                                </div>
                                <div className="loaiHu loaiHuSelected">
                                    Thiết yếu
                                </div>
                                <div className="soDuHu ms-auto">
                                    5.000.000.000đ
                                </div>
                                <div className="soDuHu ms-auto">
                                    <BiChevronDown />
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="">
                                    <div className="py-2 align-items-center d-flex flex-row w-100">
                                        <div className="huIcon me-2 huIcon1" style={{ paddingLeft: "11px" }}>
                                            <GiMasonJar />
                                        </div>
                                        <div className="loaiHu loaiHuSelected">
                                            Thiết yếu
                                        </div>
                                        <div className="ms-auto">
                                            <Badge bg="secondary">5</Badge>
                                        </div>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Item href="">
                                    <div className="py-2 align-items-center d-flex flex-row w-100">
                                        <div className="huIcon me-2 huIcon2" style={{ paddingLeft: "11px" }}>
                                            <GiMasonJar />
                                        </div>
                                        <div className="loaiHu loaiHuSelected">
                                            Hưởng thụ
                                        </div>
                                        <div className="ms-auto">
                                            <Badge bg="secondary">5</Badge>
                                        </div>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Item href="">
                                    <div className="py-2 align-items-center d-flex flex-row w-100">
                                        <div className="huIcon me-2 huIcon3" style={{ paddingLeft: "11px" }}>
                                            <GiMasonJar />
                                        </div>
                                        <div className="loaiHu loaiHuSelected">
                                            Giáo dục
                                        </div>
                                        <div className="ms-auto">
                                            <Badge bg="secondary">5</Badge>
                                        </div>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Item href="">
                                    <div className="py-2 align-items-center d-flex flex-row w-100">
                                        <div className="huIcon me-2 huIcon4" style={{ paddingLeft: "11px" }}>
                                            <GiMasonJar />
                                        </div>
                                        <div className="loaiHu loaiHuSelected">
                                            Tiết kiệm dài hạn
                                        </div>
                                        <div className="ms-auto">
                                            <Badge bg="secondary">5</Badge>
                                        </div>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Item href="">
                                    <div className="py-2 align-items-center d-flex flex-row w-100">
                                        <div className="huIcon me-2 huIcon5" style={{ paddingLeft: "11px" }}>
                                            <GiMasonJar />
                                        </div>
                                        <div className="loaiHu loaiHuSelected">
                                            Tự do tài chính
                                        </div>
                                        <div className="ms-auto">
                                            <Badge bg="secondary">5</Badge>
                                        </div>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Item href="">
                                    <div className="py-2 align-items-center d-flex flex-row w-100">
                                        <div className="huIcon me-2 huIcon6" style={{ paddingLeft: "11px" }}>
                                            <GiMasonJar />
                                        </div>
                                        <div className="loaiHu loaiHuSelected">
                                            Từ thiện
                                        </div>
                                        <div className="ms-auto">
                                            <Badge bg="secondary">5</Badge>
                                        </div>
                                    </div>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Row>
            </main>
        </CacGiaoDich.Provider>
    )
}
export default Hangngay