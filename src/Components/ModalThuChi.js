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
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const cacGiaoDichContext = useContext(CacGiaoDich)
    let { cacGiaoDich, setCacGiaoDich } = cacGiaoDichContext

    const handleLuu = () => {
        if (!kiemTraDuLieuHopLe(form)) {
            return
        }
        if ($(".quyChiTieu").attr("hidden") === "hidden"){
            form.quyChiTieu = ""
            form.theLoai = ""
        }
        setCacGiaoDich(AddGiaoDich(cacGiaoDich, form))
        setShow(false)
    }
    const handleTiepTuc = () => {
        if (!kiemTraDuLieuHopLe(form)) {
            return
        }
        if ($(".quyChiTieu").attr("hidden") === "hidden"){
            form.quyChiTieu = ""
            form.theLoai = ""
        }
        setCacGiaoDich(AddGiaoDich(cacGiaoDich, form))
        setShow(false)

        const timer = setTimeout(() => {
            setShow(true)
            clearTimeout(timer);
        }, 1000);
    }

    const [cacTheLoai, setCacTheLoai] = useState([])

    let [form, setForm] = useState({
        date: dateValue,
        quyChiTieu: "",
        theLoai: "",
        soTien: 0,
        moTa: "",
    })
    const handleForm = (e) => {
        const { name, value } = e.target
        if (name === "quyChiTieu" && value === "") {
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
            setCacTheLoai(["Photo", "Mua sách/tài liệu"])
            setForm({ ...form, [name]: value, theLoai: "Photo" })
            $(".optionEmptyTheLoai").attr("hidden", "hidden")
            return
        }
        setForm({ ...form, [name]: value })
    }

    useEffect(() => {
        if (show) {
            if ($(".selectQuyChiTieu").val() !== ""){
                $(".optionEmptyTheLoai").attr("hidden", "hidden")
            } else {
                $(".optionEmptyTheLoai").removeAttr("hidden")
            }
        }
    }, [show])

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