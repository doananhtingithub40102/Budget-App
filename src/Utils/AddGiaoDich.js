import { TongCongGiaoDichNgay } from "./CalculatorTongCong"

const AddGiaoDich = (cacGiaoDich, form) => {
    const ngay = form.date.split("T")[0]
    const myGiaoDich = {
        thoiGian: form.date.split("T")[1],
        quyChiTieu: form.quyChiTieu,
        theLoai: form.theLoai,
        soTien: form.soTien,
        moTa: form.moTa
    }
    let allGiaoDich = []
    let giaoDich = {}
    let isTonTaiNgayGD = false

    for (let i = 0; i < cacGiaoDich.length; i++) {
        if (cacGiaoDich[i].ngay === ngay) {
            isTonTaiNgayGD = true
            cacGiaoDich[i].giaoDich.push(myGiaoDich)
            cacGiaoDich[i].tongChiTieu = TongCongGiaoDichNgay(cacGiaoDich, ngay)
            allGiaoDich = [...cacGiaoDich]
            break
        }
    }
    if (!isTonTaiNgayGD) {
        giaoDich = {
            ngay: ngay,
            giaoDich: [myGiaoDich],
            tongThuNhap: 0,
            tongChiTieu: myGiaoDich.soTien
        }
        allGiaoDich = [...cacGiaoDich, giaoDich]
    }

    return allGiaoDich
}

export default AddGiaoDich