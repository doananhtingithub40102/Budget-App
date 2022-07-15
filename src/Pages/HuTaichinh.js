import { useState, useEffect } from "react"
import { Row } from "react-bootstrap"
import { GiMasonJar } from "react-icons/gi"
import { BiChevronDown } from "react-icons/bi"
import Dropdown from 'react-bootstrap/Dropdown'
import Badge from "react-bootstrap/Badge"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { scrollToSpecificElementById } from "../Utils/HandleScroll"
import ReactTooltip from "react-tooltip"
import { TongCongTaiChinh, TongGiaoDichTheoHu } from "../Utils/CalculatorTongCong"
import { FormatSoTien } from "../Utils/NumberFormat"

const Hangngay = () => {
    const [cacGiaoDich, setCacGiaoDich] = useState([])
    const [soDuKhaDung, setSoDuKhaDung] = useState(0)
    const [giaoDichCacHu, setGiaoDichCacHu] = useState({
        "Thiết yếu": { tongThu: 0, tongChi: 0, soLuongGiaoDich: 0 },
        "Hưởng thụ": { tongThu: 0, tongChi: 0, soLuongGiaoDich: 0 },
        "Giáo dục": { tongThu: 0, tongChi: 0, soLuongGiaoDich: 0 },
        "Tiết kiệm dài hạn": { tongThu: 0, tongChi: 0, soLuongGiaoDich: 0 },
        "Tự do tài chính": { tongThu: 0, tongChi: 0, soLuongGiaoDich: 0 },
        "Từ thiện": { tongThu: 0, tongChi: 0, soLuongGiaoDich: 0 }
    })
    const [phanTramSoDuCacHu, setPhanTramSoDuCacHu] = useState({
        "Thiết yếu": 0,
        "Hưởng thụ": 0,
        "Giáo dục": 0,
        "Tiết kiệm dài hạn": 0,
        "Tự do tài chính": 0,
        "Từ thiện": 0
    })

    const [huSelected, setHuSelected] = useState({
        huSelect: "Thiết yếu",
        soDuHuSelect: 0
    })
    const handleHuSelected = (key) => {
        setHuSelected({
            huSelect: key,
            soDuHuSelect: Math.floor(giaoDichCacHu[key].tongThu) - giaoDichCacHu[key].tongChi
        })
        if (key === "Thiết yếu") {
            setColorHuSelected("#eb4c60")
        }
        if (key === "Hưởng thụ") {
            setColorHuSelected("#1992fe")
        }
        if (key === "Giáo dục") {
            setColorHuSelected("#ff54c6")
        }
        if (key === "Tiết kiệm dài hạn") {
            setColorHuSelected("#48dc28")
        }
        if (key === "Tự do tài chính") {
            setColorHuSelected("#17f4e3")
        }
        if (key === "Từ thiện") {
            setColorHuSelected("#fdbe01")
        }
    }

    const [colorHuSelected, setColorHuSelected] = useState("#eb4c60")
    const [startDate, setStartDate] = useState(new Date())

    useEffect(() => {
        fetch("https://doananhtingithub40102.github.io/MyData/budget-app/data.json").then(function (response) { return response.json() })
            .then(function (json) {
                setCacGiaoDich(json);
            })
            .catch(function (error) { console.log(error) });
    }, [])

    useEffect(() => {
        setSoDuKhaDung(TongCongTaiChinh(cacGiaoDich)[0] - TongCongTaiChinh(cacGiaoDich)[1])
        setGiaoDichCacHu({
            "Thiết yếu": { tongThu: TongCongTaiChinh(cacGiaoDich)[0] * 0.55, tongChi: TongGiaoDichTheoHu(cacGiaoDich, "Thiết yếu")[0], soLuongGiaoDich: TongGiaoDichTheoHu(cacGiaoDich, "Thiết yếu")[1] },
            "Hưởng thụ": { tongThu: TongCongTaiChinh(cacGiaoDich)[0] * 0.1, tongChi: TongGiaoDichTheoHu(cacGiaoDich, "Hưởng thụ")[0], soLuongGiaoDich: TongGiaoDichTheoHu(cacGiaoDich, "Hưởng thụ")[1] },
            "Giáo dục": { tongThu: TongCongTaiChinh(cacGiaoDich)[0] * 0.1, tongChi: TongGiaoDichTheoHu(cacGiaoDich, "Giáo dục")[0], soLuongGiaoDich: TongGiaoDichTheoHu(cacGiaoDich, "Giáo dục")[1] },
            "Tiết kiệm dài hạn": { tongThu: TongCongTaiChinh(cacGiaoDich)[0] * 0.1, tongChi: TongGiaoDichTheoHu(cacGiaoDich, "Tiết kiệm dài hạn")[0], soLuongGiaoDich: TongGiaoDichTheoHu(cacGiaoDich, "Tiết kiệm dài hạn")[1] },
            "Tự do tài chính": { tongThu: TongCongTaiChinh(cacGiaoDich)[0] * 0.1, tongChi: TongGiaoDichTheoHu(cacGiaoDich, "Tự do tài chính")[0], soLuongGiaoDich: TongGiaoDichTheoHu(cacGiaoDich, "Tự do tài chính")[1] },
            "Từ thiện": { tongThu: TongCongTaiChinh(cacGiaoDich)[0] * 0.05, tongChi: TongGiaoDichTheoHu(cacGiaoDich, "Từ thiện")[0], soLuongGiaoDich: TongGiaoDichTheoHu(cacGiaoDich, "Từ thiện")[1] }
        })
    }, [cacGiaoDich])
    
    useEffect(() => {
        setHuSelected({
            huSelect: "Thiết yếu",
            soDuHuSelect: Math.floor(giaoDichCacHu["Thiết yếu"].tongThu) - giaoDichCacHu["Thiết yếu"].tongChi
        })
        setPhanTramSoDuCacHu({
            "Thiết yếu": Math.round(((giaoDichCacHu["Thiết yếu"].tongThu - giaoDichCacHu["Thiết yếu"].tongChi) / giaoDichCacHu["Thiết yếu"].tongThu) * 100),
            "Hưởng thụ": Math.round(((giaoDichCacHu["Hưởng thụ"].tongThu - giaoDichCacHu["Hưởng thụ"].tongChi) / giaoDichCacHu["Hưởng thụ"].tongThu) * 100),
            "Giáo dục": Math.round(((giaoDichCacHu["Giáo dục"].tongThu - giaoDichCacHu["Giáo dục"].tongChi) / giaoDichCacHu["Giáo dục"].tongThu) * 100),
            "Tiết kiệm dài hạn": Math.round(((giaoDichCacHu["Tiết kiệm dài hạn"].tongThu - giaoDichCacHu["Tiết kiệm dài hạn"].tongChi) / giaoDichCacHu["Tiết kiệm dài hạn"].tongThu) * 100),
            "Tự do tài chính": Math.round(((giaoDichCacHu["Tự do tài chính"].tongThu - giaoDichCacHu["Tự do tài chính"].tongChi) / giaoDichCacHu["Tự do tài chính"].tongThu) * 100),
            "Từ thiện": Math.round(((giaoDichCacHu["Từ thiện"].tongThu - giaoDichCacHu["Từ thiện"].tongChi) / giaoDichCacHu["Từ thiện"].tongThu) * 100)
        })
    }, [giaoDichCacHu])
    
    return (
        <main className="border-top pb-2">
            <Row>
                <div className="col-md-6 mb-2">
                    <div className="soDuHuTaiChinh m-3 mb-2 p-3">
                        <div>Số dư khả dụng</div>
                        <div className="soDu">{FormatSoTien(soDuKhaDung)}</div>
                    </div>
                    <div className="soDuCacHu mx-3 p-2">
                        <Row className="px-3 py-1 my-2 align-items-center huHover" onClick={() => scrollToSpecificElementById("#lichSuGD")}>
                            <div className="huIcon col-2 huIcon1">
                                <GiMasonJar />
                            </div>
                            <div className="loaiHu col-6">
                                Thiết yếu
                            </div>
                            <div className="soDuHu col-4 text-end">
                                {FormatSoTien(Math.floor(giaoDichCacHu["Thiết yếu"].tongThu) - giaoDichCacHu["Thiết yếu"].tongChi)}
                            </div>
                        </Row>
                        <Row className="px-3 py-1 my-2 align-items-center huHover" onClick={() => scrollToSpecificElementById("#lichSuGD")}>
                            <div className="huIcon col-2 huIcon2">
                                <GiMasonJar />
                            </div>
                            <div className="loaiHu col-6">
                                Hưởng thụ
                            </div>
                            <div className="soDuHu col-4 text-end">
                                {FormatSoTien(Math.floor(giaoDichCacHu["Hưởng thụ"].tongThu) - giaoDichCacHu["Hưởng thụ"].tongChi)}
                            </div>
                        </Row>
                        <Row className="px-3 py-1 my-2 align-items-center huHover" onClick={() => scrollToSpecificElementById("#lichSuGD")}>
                            <div className="huIcon col-2 huIcon3">
                                <GiMasonJar />
                            </div>
                            <div className="loaiHu col-6">
                                Giáo dục
                            </div>
                            <div className="soDuHu col-4 text-end">
                                {FormatSoTien(Math.floor(giaoDichCacHu["Giáo dục"].tongThu) - giaoDichCacHu["Giáo dục"].tongChi)}
                            </div>
                        </Row>
                        <Row className="px-3 py-1 my-2 align-items-center huHover" onClick={() => scrollToSpecificElementById("#lichSuGD")}>
                            <div className="huIcon col-2 huIcon4">
                                <GiMasonJar />
                            </div>
                            <div className="loaiHu col-6">
                                Tiết kiệm dài hạn
                            </div>
                            <div className="soDuHu col-4 text-end">
                                {FormatSoTien(Math.floor(giaoDichCacHu["Tiết kiệm dài hạn"].tongThu) - giaoDichCacHu["Tiết kiệm dài hạn"].tongChi)}
                            </div>
                        </Row>
                        <Row className="px-3 py-1 my-2 align-items-center huHover" onClick={() => scrollToSpecificElementById("#lichSuGD")}>
                            <div className="huIcon col-2 huIcon5">
                                <GiMasonJar />
                            </div>
                            <div className="loaiHu col-6">
                                Tự do tài chính
                            </div>
                            <div className="soDuHu col-4 text-end">
                                {FormatSoTien(Math.floor(giaoDichCacHu["Tự do tài chính"].tongThu) - giaoDichCacHu["Tự do tài chính"].tongChi)}
                            </div>
                        </Row>
                        <Row className="px-3 py-1 my-2 align-items-center huHover" onClick={() => scrollToSpecificElementById("#lichSuGD")}>
                            <div className="huIcon col-2 huIcon6">
                                <GiMasonJar />
                            </div>
                            <div className="loaiHu col-6">
                                Từ thiện
                            </div>
                            <div className="soDuHu col-4 text-end">
                                {FormatSoTien(Math.floor(giaoDichCacHu["Từ thiện"].tongThu) - giaoDichCacHu["Từ thiện"].tongChi)}
                            </div>
                        </Row>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="m-3 my-2 text-light">
                        <h4 id="lichSuGD">Lịch sử giao dịch</h4>
                    </div>
                    <Dropdown className="soDuCacHu dropdownHu mx-3 mt-3 mb-2" onSelect={(key) => handleHuSelected(key)}>
                        <Dropdown.Toggle variant="" className="px-3 py-2 align-items-center d-flex flex-row w-100">
                            <div className="huIcon me-2 ps-0 huIcon1" style={{ backgroundColor: colorHuSelected }}>
                                <GiMasonJar />
                            </div>
                            <div className="loaiHu loaiHuSelected">
                                {huSelected.huSelect}
                            </div>
                            <div className="soDuHu ms-auto">
                                {FormatSoTien(huSelected.soDuHuSelect)}
                            </div>
                            <div className="soDuHu ms-auto">
                                <BiChevronDown />
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="" eventKey="Thiết yếu">
                                <div className="py-2 align-items-center d-flex flex-row w-100">
                                    <div className="huIcon me-2 huIcon1" style={{ paddingLeft: "11px" }}>
                                        <GiMasonJar />
                                    </div>
                                    <div className="loaiHu loaiHuSelected">
                                        Thiết yếu
                                    </div>
                                    <div className="ms-auto">
                                        <Badge bg="secondary">{giaoDichCacHu["Thiết yếu"].soLuongGiaoDich}</Badge>
                                    </div>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item href="" eventKey="Hưởng thụ">
                                <div className="py-2 align-items-center d-flex flex-row w-100">
                                    <div className="huIcon me-2 huIcon2" style={{ paddingLeft: "11px" }}>
                                        <GiMasonJar />
                                    </div>
                                    <div className="loaiHu loaiHuSelected">
                                        Hưởng thụ
                                    </div>
                                    <div className="ms-auto">
                                        <Badge bg="secondary">{giaoDichCacHu["Hưởng thụ"].soLuongGiaoDich}</Badge>
                                    </div>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item href="" eventKey="Giáo dục">
                                <div className="py-2 align-items-center d-flex flex-row w-100">
                                    <div className="huIcon me-2 huIcon3" style={{ paddingLeft: "11px" }}>
                                        <GiMasonJar />
                                    </div>
                                    <div className="loaiHu loaiHuSelected">
                                        Giáo dục
                                    </div>
                                    <div className="ms-auto">
                                        <Badge bg="secondary">{giaoDichCacHu["Giáo dục"].soLuongGiaoDich}</Badge>
                                    </div>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item href="" eventKey="Tiết kiệm dài hạn">
                                <div className="py-2 align-items-center d-flex flex-row w-100">
                                    <div className="huIcon me-2 huIcon4" style={{ paddingLeft: "11px" }}>
                                        <GiMasonJar />
                                    </div>
                                    <div className="loaiHu loaiHuSelected">
                                        Tiết kiệm dài hạn
                                    </div>
                                    <div className="ms-auto">
                                        <Badge bg="secondary">{giaoDichCacHu["Tiết kiệm dài hạn"].soLuongGiaoDich}</Badge>
                                    </div>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item href="" eventKey="Tự do tài chính">
                                <div className="py-2 align-items-center d-flex flex-row w-100">
                                    <div className="huIcon me-2 huIcon5" style={{ paddingLeft: "11px" }}>
                                        <GiMasonJar />
                                    </div>
                                    <div className="loaiHu loaiHuSelected">
                                        Tự do tài chính
                                    </div>
                                    <div className="ms-auto">
                                        <Badge bg="secondary">{giaoDichCacHu["Tự do tài chính"].soLuongGiaoDich}</Badge>
                                    </div>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item href="" eventKey="Từ thiện">
                                <div className="py-2 align-items-center d-flex flex-row w-100">
                                    <div className="huIcon me-2 huIcon6" style={{ paddingLeft: "11px" }}>
                                        <GiMasonJar />
                                    </div>
                                    <div className="loaiHu loaiHuSelected">
                                        Từ thiện
                                    </div>
                                    <div className="ms-auto">
                                        <Badge bg="secondary">{giaoDichCacHu["Từ thiện"].soLuongGiaoDich}</Badge>
                                    </div>
                                </div>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className="soDuCacHu mx-3 p-3">
                        <div className="mb-2">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                showFullMonthYearPicker
                                showFourColumnMonthYearPicker
                            />
                        </div>
                        <div>
                            <Row className="px-3 py-2 align-items-center">
                                <div className="col-1 me-3 ps-0">
                                    <Badge bg="danger">T7</Badge>
                                    <div className="fs-5 text-white">13</div>
                                </div>
                                <div className="huIcon col-2 huIcon1">
                                    <GiMasonJar />
                                </div>
                                <div className="loaiHu col-6">
                                    <div className="text-white-50">Ăn uống</div>
                                    <div>Bánh tráng trộn</div>
                                </div>
                                <div className="soDuHu col-3 text-end">
                                    5.000.000.000đ
                                </div>
                            </Row>
                            <Row className="px-3 py-2 align-items-center">
                                <div className="col-1 me-3 ps-0">
                                    <Badge bg="danger">T7</Badge>
                                    <div className="fs-5 text-white">13</div>
                                </div>
                                <div className="huIcon col-2 huIcon1">
                                    <GiMasonJar />
                                </div>
                                <div className="loaiHu col-6">
                                    <div className="text-white-50">Ăn uống</div>
                                    <div>Bánh tráng trộn</div>
                                </div>
                                <div className="soDuHu col-3 text-end">
                                    5.000.000.000đ
                                </div>
                            </Row>
                            <Row className="px-3 py-2 align-items-center">
                                <div className="col-1 me-3 ps-0">
                                    <Badge bg="danger">T7</Badge>
                                    <div className="fs-5 text-white">13</div>
                                </div>
                                <div className="huIcon col-2 huIcon1">
                                    <GiMasonJar />
                                </div>
                                <div className="loaiHu col-6">
                                    <div className="text-white-50">Ăn uống</div>
                                    <div>Bánh tráng trộn</div>
                                </div>
                                <div className="soDuHu col-3 text-end">
                                    5.000.000.000đ
                                </div>
                            </Row>
                            <Row className="px-3 py-2 align-items-center">
                                <div className="col-1 me-3 ps-0">
                                    <Badge bg="danger">T7</Badge>
                                    <div className="fs-5 text-white">13</div>
                                </div>
                                <div className="huIcon col-2 huIcon1">
                                    <GiMasonJar />
                                </div>
                                <div className="loaiHu col-6">
                                    <div className="text-white-50">Ăn uống</div>
                                    <div>Bánh tráng trộn</div>
                                </div>
                                <div className="soDuHu col-3 text-end">
                                    5.000.000.000đ
                                </div>
                            </Row>
                            <Row className="px-3 py-2 align-items-center">
                                <div className="col-1 me-3 ps-0">
                                    <Badge bg="danger">T7</Badge>
                                    <div className="fs-5 text-white">13</div>
                                </div>
                                <div className="huIcon col-2 huIcon1">
                                    <GiMasonJar />
                                </div>
                                <div className="loaiHu col-6">
                                    <div className="text-white-50">Ăn uống</div>
                                    <div>Bánh tráng trộn</div>
                                </div>
                                <div className="soDuHu col-3 text-end">
                                    5.000.000.000đ
                                </div>
                            </Row>
                            <Row className="px-3 py-2 align-items-center border-bottom">
                                <div className="col-1 me-3 ps-0">
                                    <Badge bg="danger">T7</Badge>
                                    <div className="fs-5 text-white">13</div>
                                </div>
                                <div className="huIcon col-2 huIcon1">
                                    <GiMasonJar />
                                </div>
                                <div className="loaiHu col-6">
                                    <div className="text-white-50">Ăn uống</div>
                                    <div>Bánh tráng trộn</div>
                                </div>
                                <div className="soDuHu col-3 text-end">
                                    5.000.000.000đ
                                </div>
                            </Row>
                            <Row className="px-3 py-2 align-items-center">
                                <div className="col-1 me-3 ps-0">
                                    <Badge bg="danger">CN</Badge>
                                    <div className="fs-5 text-white">14</div>
                                </div>
                                <div className="huIcon col-2 huIcon1">
                                    <GiMasonJar />
                                </div>
                                <div className="loaiHu col-6">
                                    <div className="text-white-50">Giao thông vận tải</div>
                                    <div>Đổ xăng</div>
                                </div>
                                <div className="soDuHu col-3 text-end">
                                    5.000.000.000đ
                                </div>
                            </Row>
                            <Row className="px-3 py-2 align-items-center">
                                <div className="col-1 me-3 ps-0">
                                    <Badge bg="danger">CN</Badge>
                                    <div className="fs-5 text-white">14</div>
                                </div>
                                <div className="huIcon col-2 huIcon1">
                                    <GiMasonJar />
                                </div>
                                <div className="loaiHu col-6">
                                    <div className="text-white-50">Giao thông vận tải</div>
                                    <div>Đổ xăng</div>
                                </div>
                                <div className="soDuHu col-3 text-end">
                                    5.000.000.000đ
                                </div>
                            </Row>
                        </div>
                    </div>
                </div>
            </Row>
            <Row>
                <div className="col-md-6">
                    <div className="m-3 my-2 text-light">
                        <h4 id="lichSuGD">Cơ cấu các hũ</h4>
                    </div>
                    <div className="soDuCacHu mx-3 p-2">
                        <div className="m-2">
                            <Row className="mb-2">
                                <div className="col-4">
                                    <div className="huIcon huIcon1" data-tip="Thiết yếu" data-for="myTooltip" >
                                        <GiMasonJar />
                                    </div>
                                    <div className="text-white ms-2">55%</div>
                                </div>
                                <div className="col-4">
                                    <div className="huIcon huIcon2" data-tip="Hưởng thụ" data-for="myTooltip">
                                        <GiMasonJar />
                                    </div>
                                    <div className="text-white ms-2">10%</div>
                                </div>
                                <div className="col-4">
                                    <div className="huIcon huIcon3" data-tip="Giáo dục" data-for="myTooltip">
                                        <GiMasonJar />
                                    </div>
                                    <div className="text-white ms-2">10%</div>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-4">
                                    <div className="huIcon huIcon4" data-tip="Tiết kiệm dài hạn" data-for="myTooltip">
                                        <GiMasonJar />
                                    </div>
                                    <div className="text-white ms-2">10%</div>
                                </div>
                                <div className="col-4">
                                    <div className="huIcon huIcon5" data-tip="Tự do tài chính" data-for="myTooltip">
                                        <GiMasonJar />
                                    </div>
                                    <div className="text-white ms-2">10%</div>
                                </div>
                                <div className="col-4">
                                    <div className="huIcon huIcon6" data-tip="Từ thiện" data-for="myTooltip">
                                        <GiMasonJar />
                                    </div>
                                    <div className="text-white ms-2">5%</div>
                                </div>
                            </Row>
                        </div>
                        <div className="captionCacHu">
                            <Row className="mb-2">
                                <div className="col-4">
                                    <div className="divColor" id="divColor1"></div>
                                    <span className="text-white-50">Thiết yếu</span>
                                </div>
                                <div className="col-4">
                                    <div className="divColor" id="divColor2"></div>
                                    <span className="text-white-50">Hưởng thụ</span>
                                </div>
                                <div className="col-4">
                                    <div className="divColor" id="divColor3"></div>
                                    <span className="text-white-50">Giáo dục</span>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-4">
                                    <div className="divColor" id="divColor4"></div>
                                    <span className="text-white-50">Tiết kiệm dài hạn</span>
                                </div>
                                <div className="col-4">
                                    <div className="divColor" id="divColor5"></div>
                                    <span className="text-white-50">Tự do tài chính</span>
                                </div>
                                <div className="col-4">
                                    <div className="divColor" id="divColor6"></div>
                                    <span className="text-white-50">Từ thiện</span>
                                </div>
                            </Row>
                        </div>

                        {/* tooltip */}
                        <ReactTooltip id="myTooltip"
                            getContent={(dataTip) => {
                                return (
                                    <div style={{ width: "200px" }}>
                                        <h6>{dataTip}</h6>
                                        <div className="progress mb-2">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                    width:
                                                        (dataTip === "Thiết yếu" && ((phanTramSoDuCacHu["Thiết yếu"] > 0) ? phanTramSoDuCacHu["Thiết yếu"] : 0) + "%") ||
                                                        (dataTip === "Hưởng thụ" && ((phanTramSoDuCacHu["Hưởng thụ"] > 0) ? phanTramSoDuCacHu["Hưởng thụ"] : 0) + "%") ||
                                                        (dataTip === "Giáo dục" && ((phanTramSoDuCacHu["Giáo dục"] > 0) ? phanTramSoDuCacHu["Giáo dục"] : 0) + "%") ||
                                                        (dataTip === "Tiết kiệm dài hạn" && ((phanTramSoDuCacHu["Tiết kiệm dài hạn"] > 0) ? phanTramSoDuCacHu["Tiết kiệm dài hạn"] : 0) + "%") ||
                                                        (dataTip === "Tự do tài chính" && ((phanTramSoDuCacHu["Tự do tài chính"] > 0) ? phanTramSoDuCacHu["Tự do tài chính"] : 0) + "%") ||
                                                        (dataTip === "Từ thiện" && ((phanTramSoDuCacHu["Từ thiện"] > 0) ? phanTramSoDuCacHu["Từ thiện"] : 0) + "%"),
                                                    backgroundColor: (dataTip === "Thiết yếu" && "#eb4c60") || (dataTip === "Hưởng thụ" && "#1992fe") || (dataTip === "Giáo dục" && "#ff54c6") || (dataTip === "Tiết kiệm dài hạn" && "#48dc28") || (dataTip === "Tự do tài chính" && "#17f4e3") || (dataTip === "Từ thiện" && "#fdbe01")
                                                }}>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <span>Số dư gốc: </span>
                                                <span>
                                                    {
                                                        (dataTip === "Thiết yếu" && FormatSoTien(Math.floor(giaoDichCacHu["Thiết yếu"].tongThu))) ||
                                                        (dataTip === "Hưởng thụ" && FormatSoTien(Math.floor(giaoDichCacHu["Hưởng thụ"].tongThu))) ||
                                                        (dataTip === "Giáo dục" && FormatSoTien(Math.floor(giaoDichCacHu["Giáo dục"].tongThu))) ||
                                                        (dataTip === "Tiết kiệm dài hạn" && FormatSoTien(Math.floor(giaoDichCacHu["Tiết kiệm dài hạn"].tongThu))) ||
                                                        (dataTip === "Tự do tài chính" && FormatSoTien(Math.floor(giaoDichCacHu["Tự do tài chính"].tongThu))) ||
                                                        (dataTip === "Từ thiện" && FormatSoTien(Math.floor(giaoDichCacHu["Từ thiện"].tongThu)))
                                                    }
                                                </span>
                                            </div>
                                            <div>
                                                <span>Số dư còn lại: </span>
                                                <span>
                                                    {
                                                        (dataTip === "Thiết yếu" && FormatSoTien(Math.floor(giaoDichCacHu["Thiết yếu"].tongThu) - giaoDichCacHu["Thiết yếu"].tongChi)) ||
                                                        (dataTip === "Hưởng thụ" && FormatSoTien(Math.floor(giaoDichCacHu["Hưởng thụ"].tongThu) - giaoDichCacHu["Hưởng thụ"].tongChi)) ||
                                                        (dataTip === "Giáo dục" && FormatSoTien(Math.floor(giaoDichCacHu["Giáo dục"].tongThu) - giaoDichCacHu["Giáo dục"].tongChi)) ||
                                                        (dataTip === "Tiết kiệm dài hạn" && FormatSoTien(Math.floor(giaoDichCacHu["Tiết kiệm dài hạn"].tongThu) - giaoDichCacHu["Tiết kiệm dài hạn"].tongChi)) ||
                                                        (dataTip === "Tự do tài chính" && FormatSoTien(Math.floor(giaoDichCacHu["Tự do tài chính"].tongThu) - giaoDichCacHu["Tự do tài chính"].tongChi)) ||
                                                        (dataTip === "Từ thiện" && FormatSoTien(Math.floor(giaoDichCacHu["Từ thiện"].tongThu) - giaoDichCacHu["Từ thiện"].tongChi))
                                                    }
                                                </span>
                                                <span>
                                                    {
                                                        (dataTip === "Thiết yếu" && " (" + phanTramSoDuCacHu["Thiết yếu"] + "%)") ||
                                                        (dataTip === "Hưởng thụ" && " (" + phanTramSoDuCacHu["Hưởng thụ"] + "%)") ||
                                                        (dataTip === "Giáo dục" && " (" + phanTramSoDuCacHu["Giáo dục"] + "%)") ||
                                                        (dataTip === "Tiết kiệm dài hạn" && " (" + phanTramSoDuCacHu["Tiết kiệm dài hạn"] + "%)") ||
                                                        (dataTip === "Tự do tài chính" && " (" + phanTramSoDuCacHu["Tự do tài chính"] + "%)") ||
                                                        (dataTip === "Từ thiện" && " (" + phanTramSoDuCacHu["Từ thiện"] + "%)")
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }}
                            place="right"
                            effect="solid"
                        />
                    </div>
                </div>
            </Row>
        </main>
    )
}
export default Hangngay