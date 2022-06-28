const FormatSoTien = (soTien) => {
    let arrHangtram = []
    let soTienDaduocPhantach = ""
    let strSo = soTien + ""
    let isAm = false
    if (strSo.indexOf("-") === 0){
        isAm = true
        strSo = strSo.replace("-", "")
    }
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
        soTienDaduocPhantach = soTien + "đ"
    }

    if (isAm){
        soTienDaduocPhantach = "-" + soTienDaduocPhantach
    }

    return soTienDaduocPhantach
}

export {FormatSoTien}