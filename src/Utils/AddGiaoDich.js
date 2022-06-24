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
    let isSetted = false

    if (new Date(ngay).getTime() > new Date(cacGiaoDich[0].ngay).getTime()) {
        const giaoDich = {
            ngay: ngay,
            giaoDich: [myGiaoDich],
            tongThuNhap: 0,
            tongChiTieu: myGiaoDich.soTien
        }
        allGiaoDich = [giaoDich, ...cacGiaoDich]
        return allGiaoDich
    }

    for (let i = 0; i < cacGiaoDich.length; i++) {
        if (ngay === cacGiaoDich[i].ngay) {
            isSetted = true
            cacGiaoDich[i].giaoDich.unshift(myGiaoDich)
            cacGiaoDich[i].tongChiTieu = TongCongGiaoDichNgay(cacGiaoDich, ngay)
            allGiaoDich = [...cacGiaoDich]
            break
        }
        if (cacGiaoDich[i + 1] !== undefined){
            if (new Date(ngay).getTime() < new Date(cacGiaoDich[i].ngay).getTime() && new Date(ngay).getTime() > new Date(cacGiaoDich[i + 1].ngay).getTime()){
                isSetted = true
                const giaoDich = {
                    ngay: ngay,
                    giaoDich: [myGiaoDich],
                    tongThuNhap: 0,
                    tongChiTieu: myGiaoDich.soTien
                }
                cacGiaoDich.splice((i + 1), 0, giaoDich)
                allGiaoDich = [...cacGiaoDich]
                break
            }
        }
    }

    if (!isSetted) {
        const giaoDich = {
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