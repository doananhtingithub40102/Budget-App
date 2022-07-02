import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap"
import { ModalContext } from "./ModalThuChi";
import { KeyContext } from "./TabsThuChi";
import { useContext, useState, useEffect } from "react";
import { xuLiDuLieuDate } from "../Utils/HandleForm";
import { xuLiDuLieuTien } from "../Utils/HandleForm";
import { xuLiDuLieuMoTa } from "../Utils/HandleForm";
import { TheLoaiContext } from "./ModalThuChi";

const FormThuChi = () => {
    const [myColor, setMyColor] = useState("#f97a7a")
    const [hidden, setHidden] = useState(false)

    const k = useContext(KeyContext)

    const modalContext = useContext(ModalContext)
    let { form, handleForm } = modalContext

    useEffect(() => {
        if (k === "thuNhap") {
            setMyColor("#7cb9fe")
            setHidden(true)
        } else {
            setMyColor("#f97a7a")
            setHidden(false)
        }
    }, [k])

    const cacTheLoai = useContext(TheLoaiContext)

    return (
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3" style={{ color: myColor }}>
                    Ngày
                </Form.Label>
                <Col sm="9">
                    <Form.Control type="datetime-local" name="date" value={form.date} onChange={handleForm} onBlur={() => xuLiDuLieuDate(form.date)} />
                    <span className="text-danger errorNgay"></span>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 quyTaiChinh" hidden={hidden}>
                <Form.Label column sm="3" className="labelQuyTaiChinh">
                    Quỹ tài chính
                </Form.Label>
                <Col sm="9">
                    <Form.Select value={form.quyTaiChinh} className="selectQuyTaiChinh" name="quyTaiChinh" onChange={handleForm}>
                        <option value="">Quỹ tài chính</option>
                        <option value="Thiết yếu">Thiết yếu</option>
                        <option value="Hưởng thụ">Hưởng thụ</option>
                        <option value="Giáo dục">Giáo dục</option>
                        <option value="Tiết kiệm dài hạn">Tiết kiệm dài hạn</option>
                        <option value="Tự do tài chính">Tự do tài chính</option>
                        <option value="Từ thiện">Từ thiện</option>
                    </Form.Select>
                    <span className="text-danger errorQuyTaiChinh"></span>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 theLoai" hidden={hidden}>
                <Form.Label column sm="3" className="labelTheLoai">
                    Thể loại
                </Form.Label>
                <Col sm="9">
                    <Form.Select value={form.theLoai} name="theLoai" onChange={handleForm}>
                        <option value="" className="optionEmptyTheLoai">Thể loại</option>        
                        {cacTheLoai.map((theLoai, index) => <option key={index} value={theLoai}>{theLoai}</option>)}
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3" style={{ color: myColor }}>
                    Số tiền
                </Form.Label>
                <Col sm="9">
                    <Form.Control type="number" value={form.soTien} name="soTien" min={0} onChange={handleForm} onBlur={() => xuLiDuLieuTien(form.soTien)} />
                    <span className="text-danger errorTien"></span>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3" style={{ color: myColor }}>
                    Mô tả
                </Form.Label>
                <Col sm="9">
                    <Form.Control type="text" value={form.moTa} name="moTa" onChange={handleForm} onBlur={() => xuLiDuLieuMoTa(form.moTa)} />
                    <span className="text-danger errorMoTa"></span>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default FormThuChi