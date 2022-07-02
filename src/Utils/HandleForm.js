import $ from "jquery"

function xuLiDuLieuDate(date){
    if (date === ""){
        $(".errorNgay").text("Ngày không được bỏ trống")
        return false
    }

    $(".errorNgay").text("")
    return true
}

function xuLiDuLieuTien(soTien){
    if (soTien === ""){
        $(".errorTien").text("Tiền không được bỏ trống")
        return false
    }
    if (soTien <= 999){
        $(".errorTien").text("Tiền phải từ 1.000đ trở lên")
        return false
    }

    $(".errorTien").text("")
    return true
}

function xuLiDuLieuMoTa(moTa){
    if (moTa === ""){
        $(".errorMoTa").text("Mô tả không được bỏ trống")
        return false
    }

    $(".errorMoTa").text("")
    return true
}

function xuLiSelectQuyChiTieu(){
    if ($(".quyTaiChinh").attr("hidden") === undefined){
        if ($(".selectQuyTaiChinh").val() === ""){
            $(".errorQuyTaiChinh").text("Vui lòng chọn quỹ tài chính")
            return false
        }
        $(".errorQuyTaiChinh").text("")
    }

    return true
}

function kiemTraDuLieuHopLe(data) {
    if (xuLiDuLieuDate(data.date) && xuLiDuLieuTien(data.soTien) && xuLiDuLieuMoTa(data.moTa) && xuLiSelectQuyChiTieu()){
        return true
    }
    return false
}

export { kiemTraDuLieuHopLe, xuLiDuLieuDate, xuLiDuLieuTien, xuLiDuLieuMoTa }