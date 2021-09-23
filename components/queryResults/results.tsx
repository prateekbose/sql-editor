interface TypesTableProps{
    fields: Array<{
        field: string, 
        type: string
    }>,
    res: Array<any>
}

export default function QueryResults({fields, res} : TypesTableProps){
    if(res.length > 0){
        return (
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <div style={{gridTemplateColumns: `repeat(${fields.length}, 1fr)`}}>
                            {fields.map((item, index) => <th key={index}>{item.field}</th>)}
                        </div>
                    </tr>
                        {res.map((item: any, index: number) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <div style={{gridTemplateColumns: `repeat(${fields.length}, 1fr)`}}>
                                    {fields.map((field: any, index: number) =>
                                        <td key={index}>{item[field.field]}</td>
                                    )}
                                </div>
                            </tr>
                        ))}
                </tbody>
            </table>
        )
    }
    return <h1 className="annotation">Your Query Results appear here</h1>
}