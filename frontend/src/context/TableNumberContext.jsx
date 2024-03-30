import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const TableNumberContext = createContext();
const InitialiseTableNumberContext = createContext();

const useTableNumber = () => {
    return useContext(TableNumberContext);
}

const useInitialiseTableNumber = () => {
    return useContext(InitialiseTableNumberContext);
}

const TableNumberProvider = ({ children }) => {
    const [tablenumber, setTableNumber] = useState("");

    return (
        <TableNumberContext.Provider value={tablenumber}>
            <InitialiseTableNumberContext.Provider value={setTableNumber}>
                  {children}
            </InitialiseTableNumberContext.Provider>
        </TableNumberContext.Provider>
    );
}

TableNumberProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TableNumberProvider;
export { useTableNumber, useInitialiseTableNumber };
