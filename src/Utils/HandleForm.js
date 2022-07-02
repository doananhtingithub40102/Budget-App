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
    if ($(".quyChiTieu").attr("hidden") === undefined){
        if ($(".selectQuyChiTieu").val() === ""){
            $(".errorQuyChiTieu").text("Vui lòng chọn quỹ chi tiêu")
            return false
        }
        $(".errorQuyChiTieu").text("")
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