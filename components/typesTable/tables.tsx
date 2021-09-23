interface TypesTableProps{
    table: Array<{
        field: string,
        type: string
    }>
}

export default function TypesTable({table} : TypesTableProps){
    if(table != null){
        return (
            <table>
                <tbody>
                    <tr>
                        <th>Field</th>
                        <th>Type</th>
                    </tr>
                    {table.map((item, index) => (
                        <tr key={index}>
                            <td>{item.field}</td>
                            <td>{item.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
    return <h1 className="annotation">Select a table to see Table Schema</h1>
}