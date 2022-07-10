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
        if (value === "Thiết yếu") {
            setCacTheLoai(["Ăn uống", "Tiền trọ", "Đồ dùng sinh hoạt", "Giao thông vận tải", "Sim", "Bank", "Ổ khóa", "Làm đẹp", "Sức khỏe"])
            setForm({ ...form, [name]: value, theLoai: "Ăn uống" })
            $(".optionEmptyTheLoai").attr("hidden", "hidden")
            return
        }
        if (value === "Hưởng thụ") {
            setCacTheLoai(["Ăn uống", "Giặt sấy đồ", "Giải trí", "Làm đẹp", "Áo quần", "Sức khỏe"])
            setForm({ ...form, [name]: value, theLoai: "Ăn uống" })
            $(".optionEmptyTheLoai").attr("hidden", "hidden")
            return
        }
        if (value === "Giáo dục") {
            setCacTheLoai(["Photo", "Mua sách/tài liệu", "Khóa học"])
            setForm({ ...form, [name]: value, theLoai: "Photo" })
            $(".optionEmptyTheLoai").attr("hidden", "hidden")
            return
        }
        if (value === "Tiết kiệm dài hạn") {
            setCacTheLoai(["Tiết kiệm dài hạn"])
            setForm({ ...form, [name]: value, theLoai: "Tiết kiệm dài hạn" })
            $(".optionEmptyTheLoai").attr("hidden", "hidden")
            return
        }
        if (value === "Tự do tài chính") {
            setCacTheLoai(["Gửi tiết kiệm", "Đầu tư", "Góp vốn kinh doanh"])
            setForm({ ...form, [name]: value, theLoai: "Gửi tiết kiệm" })
            $(".optionEmptyTheLoai").attr("hidden", "hidden")
            return
        }
        if (value === "Từ thiện") {
            setCacTheLoai(["Mua đồ cho người khó khăn", "Cho tiền", "Tặng quà"])
            setForm({ ...form, [name]: value, theLoai: "Mua đồ cho người khó khăn" })
            $(".optionEmptyTheLoai").attr("hidden", "hidden")
            return
        }
        setForm({ ...form, [name]: value })
    }

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
            let ngay = $(this)[0].parentElement.innerText.slice(2, 12)
            ngay = NamThangNgay(ngay)
            const childNodes = $(this)[0].parentElement.childNodes
            const children = $(this)[0]
            const index = Array.prototype.indexOf.call(childNodes, children) - 1
            for (let i = 0; i < cacGiaoDich.length; i++){
                if (ngay === cacGiaoDich[i].ngay){
                    form.date = ngay + "T" + cacGiaoDich[i].giaoDich[index].thoiGian
                    form.quyTaiChinh = cacGiaoDich[i].giaoDich[index].quyTaiChinh
                    if (form.quyTaiChinh === "") {
                        setCacTheLoai([])
                    }
                    if (form.quyTaiChinh === "Thiết yếu") {
                        setCacTheLoai(["Ăn uống", "Tiền trọ", "Đồ dùng sinh hoạt", "Giao thông vận tải", "Sim", "Bank", "Ổ khóa", "Làm đẹp", "Sức khỏe"])
    
                    }
                    if (form.quyTaiChinh === "Hưởng thụ") {
                        setCacTheLoai(["Ăn uống", "Giặt sấy đồ", "Giải trí", "Làm đẹp", "Áo quần", "Sức khỏe"])
    
                    }
                    if (form.quyTaiChinh === "Giáo dục") {
                        setCacTheLoai(["Photo", "Mua sách/tài liệu", "Khóa học"])
                    }
                    if (form.quyTaiChinh === "Tiết kiệm dài hạn") {
                        setCacTheLoai(["Tiết kiệm dài hạn"])
                    }
                    if (form.quyTaiChinh === "Tự do tài chính") {
                        setCacTheLoai(["Gửi tiết kiệm", "Đầu tư", "Góp vốn kinh doanh"])
                    }
                    if (form.quyTaiChinh === "Từ thiện") {
                        setCacTheLoai(["Mua đồ cho người khó khăn", "Cho tiền", "Tặng quà"])
                    }
                    form.theLoai = cacGiaoDich[i].giaoDich[index].theLoai
                    form.soTien = cacGiaoDich[i].giaoDich[index].soTien
                    form.moTa = cacGiaoDich[i].giaoDich[index].moTa
                    break
                }
            }
            handleShow()
            if (form.quyTaiChinh === ""){
                $(document).ready(function(){
                    $("[data-rr-ui-event-key~=thuNhap]").trigger("click")
                })
            } else {
                $(document).ready(function(){
                    $("[data-rr-ui-event-key~=chiTieu]").trigger("click")
                })
            }
        })
    })


    return (
        <ModalContext.Provider value={{ form, handleForm }}>
            <TheLoaiContext.Provider value={cacTheLoai}>
                <Button className="add rounded-circle py-5 position-fixed" onClick={handleShow}>
                    <img src={btnThem} alt="add" />
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm giao dịch</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TabsThuChi />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" id="btnLuu" onClick={handleLuu}>
                            Lưu
                        </Button>
                        <Button variant="outline-dark" id="btnTiepTuc" onClick={handleTiepTuc}>
                            Tiếp tục
                        </Button>
                    </Modal.Footer>
                </Modal>
            </TheLoaiContext.Provider>
        </ModalContext.Provider>
    )
}

export default ModalThuChi