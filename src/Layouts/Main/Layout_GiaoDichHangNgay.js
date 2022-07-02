import { Row } from "react-bootstrap"
import { DayOfWeek, NgayThangNam } from "../../Utils/DateFormat"
import { FormatSoTien } from "../../Utils/NumberFormat"

const HeaderGiaoDich = ({ props_header }) => {
    return (
        <Row className="mx-2">
            <div className="col-sm-6">
                <span className="badge bg-danger me-2">{DayOfWeek(props_header.ngay)}</span>
                <span className="text-white-50"><span className="fs-4 text-white">{NgayThangNam(props_header.ngay).slice(0, 2)}</span>{NgayThangNam(props_header.ngay).slice(2)}</span>
            </div>
            <div className="col-sm-6">
                <Row className="mt-2">
                    <span className="text-info col-sm-8 text-end">{FormatSoTien(props_header.tongThuNhap)}</span>
                    <span className="text-danger col-sm-4">{FormatSoTien(props_header.tongChiTieu)}</span>
                </Row>
            </div>
        </Row>
    )
}

const GiaoDich = ({ props_giaodich }) => {
    return (
        <Row className="mt-2 mx-2">
            <div className="col-sm-4">
                <span className="text-white-50">{props_giaodich.theLoai}</span>
            </div>
            <div className="col-sm-4">
                <span className="text-white">{props_giaodich.moTa}</span>
            </div>
            <div className="col-sm-4">
                <Row>
                    <span className="text-info col-sm-6 text-end">{ props_giaodich.quyTaiChinh === "" && props_giaodich.theLoai === "" && FormatSoTien(props_giaodich.soTien)}</span>
                    <span className="text-danger col-sm-6">{props_giaodich.quyTaiChinh !== "" && props_giaodich.theLoai !== "" && FormatSoTien(props_giaodich.soTien)}</span>
                </Row>
            </div>
        </Row>
    )
}

const GiaoDichHangNgay = ({ props }) => {
    return (
        <div className="col-md-6 mt-2">
            <div style={{ backgroundColor: "#3d3c64", minHeight: "100%" }} className="py-2 pb-3 pe-2">
                <HeaderGiaoDich props_header={props} />
                {props.giaoDich.map((gd, index) => <GiaoDich key={index} props_giaodich={gd} />)}
            </div>
        </div>
    )
}

export { HeaderGiaoDich, GiaoDich, GiaoDichHangNgay }