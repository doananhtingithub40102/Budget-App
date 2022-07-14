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
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { scrollToSpecificElementById } from "../Utils/HandleScroll"
import ReactTooltip from "react-tooltip"

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

    const [startDate, setStartDate] = useState(new Date())

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
                            <Row className="px-3 py-1 my-2 align-items-center huHover" onClick={() => scrollToSpecificElementById("#lichSuGD")}>
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
                            <Row className="px-3 py-1 my-2 align-items-center huHover" onClick={() => scrollToSpecificElementById("#lichSuGD")}>
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
                            <Row className="px-3 py-1 my-2 align-items-center huHover" onClick={() => scrollToSpecificElementById("#lichSuGD")}>
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
                            <Row className="px-3 py-1 my-2 align-items-center huHover" onClick={() => scrollToSpecificElementById("#lichSuGD")}>
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
                            <Row className="px-3 py-1 my-2 align-items-center huHover" onClick={() => scrollToSpecificElementById("#lichSuGD")}>
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
                            <Row className="px-3 py-1 my-2 align-items-center huHover" onClick={() => scrollToSpecificElementById("#lichSuGD")}>
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
                            <h4 id="lichSuGD">Lịch sử giao dịch</h4>
                        </div>
                        <Dropdown className="soDuCacHu dropdownHu mx-3 mt-3 mb-2">
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
                                                        width: "40%",
                                                        backgroundColor: (dataTip === "Thiết yếu" && "#eb4c60") || (dataTip === "Hưởng thụ" && "#1992fe") || (dataTip === "Giáo dục" && "#ff54c6") || (dataTip === "Tiết kiệm dài hạn" && "#48dc28") || (dataTip === "Tự do tài chính" && "#17f4e3") || (dataTip === "Từ thiện" && "#fdbe01")
                                                    }}>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <span>Số dư gốc: </span>
                                                    <span>5.000.000đ</span>
                                                </div>
                                                <div>
                                                    <span>Số dư còn lại: </span>
                                                    <span>5.000.000đ</span>
                                                    <span> (100%)</span>
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
        </CacGiaoDich.Provider>
    )
}
export default Hangngay