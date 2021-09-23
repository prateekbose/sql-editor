interface TableProps{
    tables: Array<string>,
    tableIndex: number,
    setTableIndex: (e: number) => void
}

export default function SidebarTables({tables, tableIndex, setTableIndex}: TableProps){
    return (
        <div className="sidebar-tables">
        {tables.map((item, index) => <h3 className={(tableIndex === index)?'active':''} key={index} onClick={() => setTableIndex((tableIndex === index)?-1:index)}><span>{item}</span><span className="active-label">active</span></h3>)}
        </div>
        )
}