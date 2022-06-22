import { Outlet} from "react-router-dom"
import Header from "../Layouts/Header/Header.js"

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Layout