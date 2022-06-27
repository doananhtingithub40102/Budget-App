const TongCongGiaoDichNgay = (cacGiaoDich, ngayGiaoDich) => {
    let tongChiTieu = 0
    
    for (let i = 0; i < cacGiaoDich.length; i++) {
        if (cacGiaoDich[i].ngay === ngayGiaoDich) {
            for (let j = 0; j < cacGiaoDich[i].giaoDich.length; j++){
                tongChiTieu += parseInt(cacGiaoDich[i].giaoDich[j].soTien)
            }
            break
        }
    }

    return tongChiTieu
}

const TongCongGiaoDichThang = (cacGiaoDichThangNam) => {
    let tongChiTieu = 0
    
    for (let i = 0; i < cacGiaoDichThangNam.length; i++) {
        tongChiTieu += cacGiaoDichThangNam[i].tongChiTieu
    }

    return tongChiTieu
}

export { TongCongGiaoDichNgay, TongCongGiaoDichThang }