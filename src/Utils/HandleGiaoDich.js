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
    let isSet = false

    if (new Date(ngay).getTime() > new Date(cacGiaoDich[0].ngay).getTime()) {
        allGiaoDich = [setGiaoDich(ngay, myGiaoDich), ...cacGiaoDich]
        return allGiaoDich
    }

    for (let i = 0; i < cacGiaoDich.length; i++) {
        if (ngay === cacGiaoDich[i].ngay) {
            isSet = true
            cacGiaoDich[i].giaoDich.unshift(myGiaoDich)
            cacGiaoDich[i].tongThuNhap = TongCongGiaoDichNgay(cacGiaoDich, ngay)[0]
            cacGiaoDich[i].tongChiTieu = TongCongGiaoDichNgay(cacGiaoDich, ngay)[1]
            allGiaoDich = [...cacGiaoDich]
            break
        }
        if (cacGiaoDich[i + 1] !== undefined) {
            if (new Date(ngay).getTime() < new Date(cacGiaoDich[i].ngay).getTime() && new Date(ngay).getTime() > new Date(cacGiaoDich[i + 1].ngay).getTime()) {
                isSet = true
                cacGiaoDich.splice((i + 1), 0, setGiaoDich(ngay, myGiaoDich))
                allGiaoDich = [...cacGiaoDich]
                break
            }
        }
    }

    if (!isSet) {
        allGiaoDich = [...cacGiaoDich, setGiaoDich(ngay, myGiaoDich)]
    }

    return allGiaoDich
}

const SetGiaoDichThangNam = (cacGiaoDich, thang, nam) => {
    let allGiaoDichThangNam = []
    let thangHienTai = thang + ""
    let namHienTai = nam + ""
    if (thangHienTai.length === 1) {
        thangHienTai = "0" + thangHienTai
    }
    for (let i = 0; i < cacGiaoDich.length; i++) {
        const arrDate = cacGiaoDich[i].ngay.split("-")
        if (arrDate[0] === namHienTai && arrDate[1] === thangHienTai){
            allGiaoDichThangNam.push(cacGiaoDich[i])
        }
    }

    return allGiaoDichThangNam
}

function setGiaoDich(ngay, myGiaoDich){
    let giaoDich = {
        ngay: ngay,
        giaoDich: [myGiaoDich],
        tongThuNhap: 0,
        tongChiTieu: myGiaoDich.soTien
    }
    if (myGiaoDich.quyChiTieu === "" && myGiaoDich.theLoai === ""){
        giaoDich.tongThuNhap = myGiaoDich.soTien
        giaoDich.tongChiTieu = 0
    }

    return giaoDich
}

export { AddGiaoDich, SetGiaoDichThangNam }