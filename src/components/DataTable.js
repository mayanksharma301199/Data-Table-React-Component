import { useEffect, useState } from "react";
import Papa from "papaparse";
import MOCK_DATA from '../assets/MOCK_DATA.csv';

const DataTable = () => {

    const [tableHeaders, setTableHeaders] = useState([]);
    const [values, setValues] = useState([]);
    const [rowColor, setRowColor] = useState({});
    // let originalData = [];

    useEffect(() => {
        FetchMockData();
    }, []);

    const FetchMockData = () => {
        fetch(MOCK_DATA).then(response => response.text()).then(text => {
            Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                window.originalData = [...results.data]
                setTableHeaders([...Object.keys((results.data)[0])]);
                setValues([...results.data]);
            }})
        })
    }

    const SortMethod = (ColumnName, OrderName) => {
        if (OrderName === "ASC"){
            setValues([...values.sort((x, y) => x[ColumnName] > y[ColumnName] ? 1 : -1)])
            // setValues([...values.sort((x, y) => parseInt(x[ColumnName]) > parseInt(y[ColumnName]) ? 1 : -1)])
        }
        else if(OrderName === "DESC"){
            setValues([...values.sort((x, y) => x[ColumnName] < y[ColumnName] ? 1 : -1)])
            // setValues([...values.sort((x, y) => parseInt(x[ColumnName]) < parseInt(y[ColumnName]) ? 1 : -1)])
        }
        else{
            setValues([...window.originalData])
        }
        
    }

    const rowColorChange = (id, color) => {
        setRowColor({...rowColor, ...{[id] : color}})
    }

    return (
        <div style={{userSelect : 'none'}} className = "table-responsive">
            <table className = "table text-center text-nowrap table-striped table-sm table-bordered table-hover">
                <thead>
                    <tr>
                        <th>color</th>
                        {tableHeaders.map((colName, index) => {
                            return <th className="text-center" key={index}>
                                {colName}
                                <i className="dropdown bi-three-dots-vertical">
                                    <ul className="dropdown-menu">
                                        <li className="list-group-item list-group-item-action" onClick={() => {SortMethod(colName, "Unsorted")}}>Unsort</li>
                                        <li className="list-group-item list-group-item-action" onClick={() => {SortMethod(colName, "ASC")}}>Sort by ASC</li>
                                        <li className="list-group-item list-group-item-action" onClick={() => {SortMethod(colName, "DESC")}}>Sort by DESC</li>
                                    </ul>
                                </i>
                            </th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {values.map((value, index) => {
                        return (
                            <tr style={{backgroundColor : rowColor[(value['id'])] !== undefined ? rowColor[(value['id'])] : null}} key={index}>          
                            <td>
                                <i className="dropdown bi-palette">
                                    <ul className="dropdown-menu">
                                        <li className="list-group-item list-group-item-action" onClick={() => {rowColorChange(value['id'], 'LightBlue')}}>LightBlue</li>
                                        <li className="list-group-item list-group-item-action" onClick={() => {rowColorChange(value['id'], 'LightSalmon')}}>LightSalmon</li>
                                        <li className="list-group-item list-group-item-action" onClick={() => {rowColorChange(value['id'], 'Orange')}}>Orange</li>
                                    </ul>
                                </i>
                            </td>
                            
                            {(Object.values(value)).map((val, i) => {
                                if (i === 8){
                                    if (val === 'true'){
                                        return <td style={{backgroundColor : 'green'}} key={i}>{val}</td>;
                                    }
                                    else{
                                        return <td style={{backgroundColor : 'red'}} key={i}>{val}</td>;
                                    }
                                }
                                else{
                                    return <td key={i}>{val}</td>;
                                }
                            })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable; 