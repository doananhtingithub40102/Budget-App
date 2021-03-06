import { Button } from "react-bootstrap"
import Modal from "react-bootstrap/Modal"
import TabsThuChi from "./TabsThuChi"
import btnThem from "../Assets/Images/themBtn.png"
import { useState, useContext, useEffect } from "react"
import { createContext } from "react"
import { ArrDateValueFormat } from "../Utils/DateFormat";
import { kiemTraDuLieuHopLe } from "../Utils/HandleForm"
import { CacGiaoDich } from "../Pages/Hangngay"
import { AddGiaoDich } from "../Utils/HandleGiaoDich"
import { NamThangNgay } from "../Utils/DateFormat"
import $ from "jquery"

export const ModalContext = createContext({
    form: {},
    handleForm: () => { }
})

export const TheLoaiContext = createContext()

const ModalThuChi = () => {
    const [nam, thang, ngay, gio, phut] = ArrDateValueFormat()
    const dateValue = nam + "-" + thang + "-" + ngay + "T" + gio + ":" + phut

    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
        form.date = dateValue
        form.quyTaiChinh = ""
        form.theLoai = ""
        form.soTien = 0
        form.moTa = ""
        setCacTheLoai([])
    }
    const handleShow = () => {
        setShow(true)
    }

    const cacGiaoDichContext = useContext(CacGiaoDich)
    let { cacGiaoDich, setCacGiaoDich } = cacGiaoDichContext

    const handleLuu = () => {
        if (!kiemTraDuLieuHopLe(form)) {
            return
        }
        if ($(".quyTaiChinh").attr("hidden") === "hidden") {
            form.quyTaiChinh = ""
            form.theLoai = ""
            setCacTheLoai([])
        }
        setCacGiaoDich(AddGiaoDich(cacGiaoDich, form))
        handleClose()
    }
    const handleTiepTuc = () => {
        if (!kiemTraDuLieuHopLe(form)) {
            return
        }
        if ($(".quyTaiChinh").attr("hidden") === "hidden") {
            form.quyTaiChinh = ""
            form.theLoai = ""
            setCacTheLoai([])
        }
        setCacGiaoDich(AddGiaoDich(cacGiaoDich, form))
        handleClose()

        const timer = setTimeout(() => {
            handleShow()
            clearTimeout(timer);
        }, 1000);
    }

    const [cacTheLoai, setCacTheLoai] = useState([])

    let [form, setForm] = useState({
        date: dateValue,
        quyTaiChinh: "",
        theLoai: "",
        soTien: 0,
        moTa: "",
    })
    const handleForm = (e) => {
        const { name, value } = e.target
        if (name === "quyTaiChinh" && value === "") {
            $(".optionEmptyTheLoai").removeAttr("hidden")
            setCacTheLoai([])
            setForm({ ...form, [name]: value, theLoai: "" })
            return
        }
        if (value === "Thi???t y???u") {
            setCacTheLoai(["??n u???ng", "Ti???n tr???", "????? d??ng sinh ho???t", "Giao th??ng v???n t???i", "Sim", "Bank", "??? kh??a", "L??m ?????p", "S???c kh???e"])
            setForm({ ...form, [name]: value, theLoai: "??n u???ng" })
            $(".optionEmptyTheLoai").attr("hidden", "hidden")
            return
        }
        if (value === "H?????ng th???") {
            setCacTheLoai(["??n u???ng", "Gi???t s???y ?????", "Gi???i tr??", "L??m ?????p", "??o qu???n", "S???c kh???e"])
            setForm({ ...form, [name]: value, theLoai: "??n u???ng" })
            $(".optionEmptyTheLoai").attr("hidden", "hidden")
            return
        }
        if (value === "Gi??o d???c") {
            setCacTheLoai(["Photo", "Mua s??ch/t??i li???u", "Kh??a h???c"])
            setForm({ ...form, [name]: value, theLoai: "Photo" })
            $(".optionEmptyTheLoai").attr("hidden", "hidden")
            return
        }
        if (value === "Ti???t ki???m d??i h???n") {
            setCacTheLoai(["Ti???t ki???m d??i h???n"])
            setForm({ ...form, [name]: value, theLoai: "Ti???t ki???m d??i h???n" })
            $(".optionEmptyTheLoai").attr("hidden", "hidden")
            return
        }
        if (value === "T??? do t??i ch??nh") {
            setCacTheLoai(["G???i ti???t ki???m", "?????u t??", "G??p v???n kinh doanh"])
            setForm({ ...form, [name]: value, theLoai: "G???i ti???t ki???m" })
            $(".optionEmptyTheLoai").attr("hidden", "hidden")
            return
        }
        if (value === "T??? thi???n") {
            setCacTheLoai(["Mua ????? cho ng?????i kh?? kh??n", "Cho ti???n", "T???ng qu??"])
            setForm({ ...form, [name]: value, theLoai: "Mua ????? cho ng?????i kh?? kh??n" })
            $(".optionEmptyTheLoai").attr("hidden", "hidden")
            return
        }
        setForm({ ...form, [name]: value })
    }

    const [title, setTitle] = useState("Th??m giao d???ch")
    const [textBtn, setTextBtn] = useState({
        "btn1": "L??u",
        "btn2": "Ti???p t???c"
    })

    useEffect(() => {
        if (show) {
            if ($(".selectQuyTaiChinh").val() !== "") {
                $(".optionEmptyTheLoai").attr("hidden", "hidden")
            } else {
                $(".optionEmptyTheLoai").removeAttr("hidden")
            }
        }
    }, [show])

    useEffect(() => {
        $(".giaoDich").click(function () {
            setTitle("Th??ng tin giao d???ch")
            setTextBtn({
                "btn1": "C???p nh???t",
                "btn2": "X??a"
            })

            let ngay = $(this)[0].parentElement.innerText.slice(2, 12)
            ngay = NamThangNgay(ngay)
            const childNodes = $(this)[0].parentElement.childNodes
            const children = $(this)[0]
            const index = Array.prototype.indexOf.call(childNodes, children) - 1
            for (let i = 0; i < cacGiaoDich.length; i++) {
                if (ngay === cacGiaoDich[i].ngay) {
                    form.date = ngay + "T" + cacGiaoDich[i].giaoDich[index].thoiGian
                    form.quyTaiChinh = cacGiaoDich[i].giaoDich[index].quyTaiChinh
                    if (form.quyTaiChinh === "") {
                        setCacTheLoai([])
                    }
                    if (form.quyTaiChinh === "Thi???t y???u") {
                        setCacTheLoai(["??n u???ng", "Ti???n tr???", "????? d??ng sinh ho???t", "Giao th??ng v???n t???i", "Sim", "Bank", "??? kh??a", "L??m ?????p", "S???c kh???e"])

                    }
                    if (form.quyTaiChinh === "H?????ng th???") {
                        setCacTheLoai(["??n u???ng", "Gi???t s???y ?????", "Gi???i tr??", "L??m ?????p", "??o qu???n", "S???c kh???e"])

                    }
                    if (form.quyTaiChinh === "Gi??o d???c") {
                        setCacTheLoai(["Photo", "Mua s??ch/t??i li???u", "Kh??a h???c"])
                    }
                    if (form.quyTaiChinh === "Ti???t ki???m d??i h???n") {
                        setCacTheLoai(["Ti???t ki???m d??i h???n"])
                    }
                    if (form.quyTaiChinh === "T??? do t??i ch??nh") {
                        setCacTheLoai(["G???i ti???t ki???m", "?????u t??", "G??p v???n kinh doanh"])
                    }
                    if (form.quyTaiChinh === "T??? thi???n") {
                        setCacTheLoai(["Mua ????? cho ng?????i kh?? kh??n", "Cho ti???n", "T???ng qu??"])
                    }
                    form.theLoai = cacGiaoDich[i].giaoDich[index].theLoai
                    form.soTien = cacGiaoDich[i].giaoDich[index].soTien
                    form.moTa = cacGiaoDich[i].giaoDich[index].moTa
                    break
                }
            }
            handleShow()
            if (form.quyTaiChinh === "") {
                $(document).ready(function () {
                    $("[data-rr-ui-event-key~=thuNhap]").prop("disabled", false)
                    $("[data-rr-ui-event-key~=chiTieu]").prop("disabled", true)

                    $("[data-rr-ui-event-key~=thuNhap]").trigger("click")
                })
            } else {
                $(document).ready(function () {
                    $("[data-rr-ui-event-key~=thuNhap]").prop("disabled", true)
                    $("[data-rr-ui-event-key~=chiTieu]").prop("disabled", false)

                    $("[data-rr-ui-event-key~=chiTieu]").trigger("click")
                })
            }
        })
    })


    return (
        <ModalContext.Provider value={{ form, handleForm }}>
            <TheLoaiContext.Provider value={cacTheLoai}>
                <Button className="add rounded-circle py-5 position-fixed" onClick={() => { setTitle("Th??m giao d???ch"); setTextBtn({"btn1": "L??u", "btn2": "Ti???p t???c"}); handleShow() }}>
                    <img src={btnThem} alt="add" />
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TabsThuChi />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" id="btnLuu" onClick={handleLuu}>
                            {textBtn.btn1}
                        </Button>
                        <Button variant="outline-dark" id="btnTiepTuc" onClick={handleTiepTuc}>
                            {textBtn.btn2}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </TheLoaiContext.Provider>
        </ModalContext.Provider>
    )
}

export default ModalThuChi