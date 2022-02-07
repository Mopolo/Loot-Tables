import React from "react";
import Table from "react-bootstrap/Table";
import {DataSave} from "../Util/Store";

interface Props {
    data: DataSave;
}

const DataTable: React.FC<Props> = (props) => {
    return <Table bordered hover>
        <tbody>
        <tr>
            <td>Items</td>
            <td>{props.data.items.length}</td>
        </tr>
        <tr>
            <td>Catégories</td>
            <td>{props.data.categories.length}</td>
        </tr>
        <tr>
            <td>Sous-catégories</td>
            <td>{props.data.subCategories.length}</td>
        </tr>
        <tr>
            <td>Types</td>
            <td>{props.data.types.length}</td>
        </tr>
        <tr>
            <td>Raretés</td>
            <td>{props.data.rarities.length}</td>
        </tr>
        </tbody>
    </Table>
};

export default DataTable;
