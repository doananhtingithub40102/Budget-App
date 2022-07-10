const DateFormat = () => {
    // Ngày hiện tại
    let dateHienTai = ""
    const dHienTai = new Date()
    let ngayHienTai = dHienTai.getDate()
    if ((ngayHienTai + "").length === 1) {
        ngayHienTai = "0" + ngayHienTai
    }
    let thangHienTai = dHienTai.getMonth() + 1
    if ((thangHienTai + "").length === 1) {
        thangHienTai = "0" + thangHienTai
    }
    const namHienTai = dHienTai.getFullYear()

    // Thời gian hiện tại
    let gioHienTai = dHienTai.getHours()
    if ((gioHienTai + "").length === 1) {
        gioHienTai = "0" + gioHienTai
    }
    let phutHienTai = dHienTai.getMinutes()
    if ((phutHienTai + "").length === 1) {
        phutHienTai = "0" + phutHienTai
    }
    let giayHienTai = dHienTai.getSeconds()
    if ((giayHienTai + "").length === 1) {
        giayHienTai = "0" + giayHienTai
    }

    dateHienTai = ngayHienTai + "/" + thangHienTai + "/" + namHienTai + " " + gioHienTai + ":" + phutHienTai + ":" + giayHienTai

    return dateHienTai
}

const ThangNamFormat = () => {
    const dHienTai = new Date()
    const thangHienTai = dHienTai.getMonth() + 1
    const namHienTai = dHienTai.getFullYear()

    return [thangHienTai, namHienTai]
}

const ArrDateValueFormat = () => {
    const dateHienTai = DateFormat()
    const ngayHienTai = dateHienTai.split(" ")[0]
    const gioHienTai = dateHienTai.split(" ")[1]
    const nam = ngayHienTai.split("/")[2]
    const thang = ngayHienTai.split("/")[1]
    const ngay = ngayHienTai.split("/")[0]
    const gio = gioHienTai.split(":")[0]
    const phut = gioHienTai.split(":")[1]

    return [nam, thang, ngay, gio, phut]
}

const DayOfWeek = (myDate) => {
    const dayOfWeek = new Date(myDate).getDay()
    let day = ""
    switch (dayOfWeek) {
        case 0:
            day = "CN"
            break;
        case 1:
            day = "T2"
            break;
        case 2:
            day = "T3"
            break;
        case 3:
            day = "T4"
            break;
        case 4:
            day = "T5"
            break;
        case 5:
            day = "T6"
            break;
        case 6:
            day = "T7"
            break;

        default:
            break;
    }
    return day
}

const NgayThangNam = (myDate) => {
    const arrDate = myDate.split("-")
    const date = arrDate[2] + "/" + arrDate[1] + "/" + arrDate[0]
    return date
}

const NamThangNgay = (myDate) => {
    const arrDate = myDate.split("/")
    const date = arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0]
    return date
}

export { DateFormat, ThangNamFormat, ArrDateValueFormat, DayOfWeek, NgayThangNam, NamThangNgay }