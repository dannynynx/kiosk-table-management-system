import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const TableContext = createContext(undefined);
const InitialiseTableContext = createContext(undefined)

const useTable = () => {
    return useContext(TableContext);
}

const useInitialiseTable = () => {
    return useContext(InitialiseTableContext);
}

const TableProvider = ({ children }) => {
    const [Table, setTable] = useState(null);
    return (
        <TableContext.Provider value={Table}>
            <InitialiseTableContext.Provider value={setTable}>
                { children }
            </InitialiseTableContext.Provider>
        </TableContext.Provider>
    );
}

TableProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TableProvider;
export { useTable, useInitialiseTable };
