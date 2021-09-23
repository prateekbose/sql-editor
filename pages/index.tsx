import { useState, useEffect } from 'react'
import CodeEditor from '../components/text-editor/editor'
import SidebarTables from '../components/table/table'
import TopBar from '../components/topBar/topbar'
import TypesTable from '../components/typesTable/tables'
import QueryResults from '../components/queryResults/results'
import { Database, Sidebar, Layout } from 'react-feather'
import Head from 'next/head'

interface TablesType{
  [index: string] : Array<{
    field: string,
    type: string
  }>
}

export default function Home(){

  const themes = ["vs-dark", "light"]

  const tables = [["products", "regions"], ["employees", "categories"]]
  const table:TablesType = {
    "categories": [{field: "ID", type: "integer"}, {field: "Name", type: "string"}, {field: "Description", type: "string"}],
    "employees": [{field: "employeeID", type: "integer"}, {field: "firstName", type: "string"}, {field: "lastName", type: "string"}, {field: "title", type: "string"}],
    "products": [{field: "productID", type: "integer"}, {field: "productName", type: "string"}, {field: "categoryID", type: "integer"}],
    "regions": [{field: "regionID", type: "integer"}, {field: "regionDescription", type: "string"}]
  }

  const sqlQueries = [
    ["SELECT * FROM 'products'", "SELECT 'regionID', 'regionDescription' FROM 'regions'"],
    ["SELECT * FROM 'employees'", "SELECT 'categoryID' as 'ID', 'categoryName' as 'Name', 'description' as 'Description' FROM 'categories'"]
  ]

  const res = [
    [[{"productID": 101, "productName": "Chai", "categoryID": 1}, {"productID": 102, "productName": "Chang", "categoryID": 1}, {"productID": 103, "productName": "Aniseed Soup", "categoryID": 2}, {"productID": 104, "productName": "Ikura", "categoryID": 8}], [{"regionID": 1, "regionDescription": "Eastern"}, {"regionID": 2, "regionDescription": "Western"}, {"regionID": 3, "regionDescription": "Northern"}, {"regionID": 4, "regionDescription": "Southern"}]],
    [[{"employeeID": 1, "lastName": "Davolio", "firstName": "Nancy", "title": "Sales Representative"}, {"employeeID": 2, "lastName": "Fuller", "firstName": "Andrew", "title": "Vice President Sales"}], [{"ID": 1, "Name": "Beverages", "Description": "Soft drinks coffees teas beers and ales"}, {"ID": 2, "Name": "Condiments", "Description": "Sweet and savory sauces relishes spreads and seasonings"}, {"ID": 3, "Name": "Confections", "Description": "Desserts candies and sweet breads"}]]
  ]

  const [space, setSpace] = useState<number>(0)
  const [code, setCode] = useState<string>("/*\nFor demonstration only:\n\nFor workspace \"Atlan Internship\" use these queries:\n\nTable 'products': \"SELECT * FROM 'products';\"\nTable 'regions': \"SELECT 'regionID', 'regionDescription' FROM 'regions';\"\n\nFor workspace \"Personal Work\" use these queries:\n\nTable 'employees': \"SELECT * FROM 'employees';\"\nTable 'categories': \"SELECT 'categoryID' as 'ID', 'categoryName' as 'Name', 'description' as 'Description' FROM 'categories';\"\n*/\n\n")
  const [theme, setTheme] = useState<number>(0)
  
  const [tableIndex, setTableIndex] = useState<number>(-1)

  const [query, setQuery] = useState<string>("")

  const [fetch, setFetch] = useState<boolean>(false)

  const [result, setResult] = useState<Array<any>>([])
  const [resultFields, setResultFields] = useState<Array<{field: string, type: string}>>([])

  useEffect(() => {
    setTableIndex(-1)
    setQuery("")
    setResult([])
    setResultFields([])
    setFetch(false)
  }, [space])

  useEffect(() => {
    const q = query.split("*/")
    // console.table({
    //   Query: (query.length == 0)?"":q[1]
    // })
    if(q.length > 1){
      setFetch(true)
    }
    if(query.length > 0 && q[1].includes(sqlQueries[space][tableIndex])){
      setResult(res[space][tableIndex])
      setResultFields(table[tables[space][tableIndex]])
      // console.table(res[space][tableIndex])
    } else {
      setQuery("")
    }
  }, [query])

  return [
    <TopBar theme={theme} setTheme={setTheme} space={space} setSpace={setSpace} key={-1}/>,
    <section className={`app-section ${(theme)?'light':'dark'}`} key={0}>
      <Head>
        <title>SQL Editor &#8212; Prateek Bose</title>
      </Head>
      <div className={`sidebar sidebar-${(theme)?'light':'dark'}`}>
        <h1><Sidebar size={20}/> Tables</h1>
        <div className="sidebar-content">
          <SidebarTables tables={tables[space]} tableIndex={tableIndex} setTableIndex={setTableIndex}/>
        </div>
      </div>
      <div className="code-section">
        <div className="code-editor-section">
          <CodeEditor themes={themes} theme={theme} code={code} setCode={setCode} setQuery={setQuery}/>
        <div className="exec">
          <h1><Database size={20}/> Table Schema</h1>
          <TypesTable table={table[tables[space][tableIndex]]}/>
        </div>
        </div>
        <div className={`bottom-bar bottom-bar-${(theme)?'light':'dark'}`}>
          <div className="bottom-bar-sections">
            <button><Layout size={20}/> Query Results &nbsp; <span className={`results-fetch${(fetch)?(result.length > 0)?' active':' error':''}`}>{(fetch && result.length>0)?result.length + ' rows selected':'Error: Invalid Query'}</span></button>
          </div>
          <QueryResults fields={resultFields} res={result}/>
        </div>
      </div>
    </section>
  ]

}
