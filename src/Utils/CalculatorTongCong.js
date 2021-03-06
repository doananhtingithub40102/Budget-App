const TongCongGiaoDichNgay = (cacGiaoDich, ngayGiaoDich) => {
    let tongThuNhap = 0
    let tongChiTieu = 0

    for (let i = 0; i < cacGiaoDich.length; i++) {
        if (cacGiaoDich[i].ngay === ngayGiaoDich) {
            for (let j = 0; j < cacGiaoDich[i].giaoDich.length; j++) {
                if (cacGiaoDich[i].giaoDich[j].quyTaiChinh === "" && cacGiaoDich[i].giaoDich[j].theLoai === ""){
                    tongThuNhap += parseInt(cacGiaoDich[i].giaoDich[j].soTien)
                } else {
                    tongChiTieu += parseInt(cacGiaoDich[i].giaoDich[j].soTien)
                }
            }
            break
        }
    }

    return [tongThuNhap, tongChiTieu]
}

const TongCongGiaoDichThang = (cacGiaoDichThangNam) => {
    let tongThuNhap = 0
    let tongChiTieu = 0

    for (let i = 0; i < cacGiaoDichThangNam.length; i++) {
        tongThuNhap += parseInt(cacGiaoDichThangNam[i].tongThuNhap)
        tongChiTieu += parseInt(cacGiaoDichThangNam[i].tongChiTieu)
    }

    return [tongThuNhap, tongChiTieu]
}

const TongCongTaiChinh = (cacGiaoDich) => {
    let tongThuNhap = 0
    let tongChiTieu = 0

    for (let i = 0; i < cacGiaoDich.length; i++) {
        tongThuNhap += parseInt(cacGiaoDich[i].tongThuNhap)
        tongChiTieu += parseInt(cacGiaoDich[i].tongChiTieu)
    }

    return [tongThuNhap, tongChiTieu]
}

const TongGiaoDichTheoHu = (cacGiaoDich, huTaiChinh) => {
    let tongChiTieu = 0
    let soLuongGiaoDich = 0

    for (let i = 0; i < cacGiaoDich.length; i++) {
        for (let j = 0; j < cacGiaoDich[i].giaoDich.length; j++) {
            if (cacGiaoDich[i].giaoDich[j].quyTaiChinh === huTaiChinh) {
                tongChiTieu += parseInt(cacGiaoDich[i].giaoDich[j].soTien)
                soLuongGiaoDich += 1
            }
        }
    }

    return [tongChiTieu, soLuongGiaoDich]
}

export { TongCongGiaoDichNgay, TongCongGiaoDichThang, TongCongTaiChinh, TongGiaoDichTheoHu }