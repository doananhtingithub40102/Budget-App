const FormatSoTien = (soTien) => {
    let arrHangtram = []
    let soTienDaduocPhantach = ""
    let strSo = soTien + ""
    let end = strSo.length
    let start = end - 3
    while (start > 0) {
        arrHangtram.unshift("." + strSo.slice(start, end))
        if (start - 3 <= 0) {
            arrHangtram.unshift(strSo.slice(0, start))
            break
        }
        end = start
        start = end - 3
    }
    if (arrHangtram.length !== 0){
        soTienDaduocPhantach = arrHangtram.join("") + "đ"
    } else {
        soTienDaduocPhantach = 0
    }
    return soTienDaduocPhantach
}

export {FormatSoTien}