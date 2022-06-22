import { Tab } from "bootstrap";
import Tabs from "react-bootstrap/Tabs";
import FormThuChi from "./FormThuChi";
import { useState } from "react";
import { createContext } from "react";

export const KeyContext = createContext()

const TabsThuChi = () => {
    const [key, setKey] = useState("chiTieu")

    return (
        <KeyContext.Provider value={key}>
            <Tabs defaultActiveKey="chiTieu" className="mb-3" onSelect={(k) => setKey(k)}>
                <Tab eventKey="thuNhap" title="Thu nhập">
                    <FormThuChi />
                </Tab>
                <Tab eventKey="chiTieu" title="Chi tiêu">
                    <FormThuChi />
                </Tab>
            </Tabs>
        </KeyContext.Provider>
    )

}

export default TabsThuChi