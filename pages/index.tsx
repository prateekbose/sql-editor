import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
// import CodeEditor from '../components/text-editor/editor'
import SidebarTables from '../components/table/table'
import TopBar from '../components/topBar/topbar'
import TypesTable from '../components/typesTable/tables'
import QueryResults from '../components/queryResults/results'
import { Database, Sidebar, Layout } from 'react-feather'
const CodeEditor = dynamic(
  () => import('../components/text-editor/editor'),
  { ssr: false }
)

interface TablesType{
  [index: string] : Array<{
    field: string,
    type: string
  }>
}

export default function Home(){

  // themes for the code editor
  const themes = ["vs-dark", "light"]

  // dummy tables and tables schema for the queries
  const tables = [["products", "regions"], ["employees", "categories"]]
  const table:TablesType = {
    "categories": [{field: "ID", type: "integer"}, {field: "Name", type: "string"}, {field: "Description", type: "string"}],
    "employees": [{field: "employeeID", type: "integer"}, {field: "firstName", type: "string"}, {field: "lastName", type: "string"}, {field: "title", type: "string"}],
    "products": [{field: "productID", type: "integer"}, {field: "productName", type: "string"}, {field: "categoryID", type: "integer"}],
    "regions": [{field: "regionID", type: "integer"}, {field: "regionDescription", type: "string"}]
  }

  // dummy queries
  const sqlQueries = [
    ["SELECT * FROM 'products'", "SELECT 'regionID', 'regionDescription' FROM 'regions'"],
    ["SELECT * FROM 'employees'", "SELECT 'categoryID' as 'ID', 'categoryName' as 'Name', 'description' as 'Description' FROM 'categories'"]
  ]

  // dummy data
  const res = [
    [[{"productID": 101, "productName": "Chai", "categoryID": 1}, {"productID": 102, "productName": "Chang", "categoryID": 1}, {"productID": 103, "productName": "Aniseed Soup", "categoryID": 2}, {"productID": 104, "productName": "Ikura", "categoryID": 8}], [{"regionID": 1, "regionDescription": "Eastern"}, {"regionID": 2, "regionDescription": "Western"}, {"regionID": 3, "regionDescription": "Northern"}, {"regionID": 4, "regionDescription": "Southern"}]],
    [[{"employeeID": 1, "lastName": "Davolio", "firstName": "Nancy", "title": "Sales Representative"}, {"employeeID": 2, "lastName": "Fuller", "firstName": "Andrew", "title": "Vice President Sales"}], [{"ID": 1, "Name": "Beverages", "Description": "Soft drinks coffees teas beers and ales"}, {"ID": 2, "Name": "Condiments", "Description": "Sweet and savory sauces relishes spreads and seasonings"}, {"ID": 3, "Name": "Confections", "Description": "Desserts candies and sweet breads"}]]
  ]

  // environment states

  // workspace index
  const [space, setSpace] = useState<number>(0)
  // code editor code
  const [code, setCode] = useState<string>("/*\nFor demonstration only; NOTE: RUN ONLY ONE QUERY AT A TIME AND AS FOLLOWS\n\nFor workspace \"Atlan Internship\" use these queries:\n\nTable 'products': \"SELECT * FROM 'products';\"\nTable 'regions': \"SELECT 'regionID', 'regionDescription' FROM 'regions';\"\n\nFor workspace \"Personal Work\" use these queries:\n\nTable 'employees': \"SELECT * FROM 'employees';\"\nTable 'categories': \"SELECT 'categoryID' as 'ID', 'categoryName' as 'Name', 'description' as 'Description' FROM 'categories';\"\n\nWorkspace can be changed from the top bar (top-left), while the theme can be changed from top-right button.\n\nThe left sidebar shows tables in the workspace, and once selected the right sidebar would show the Schema for the selected table.\n\nWrite your query below.\n*/\n\n")
  // code editor theme
  const [theme, setTheme] = useState<number>(0)
  // active table index
  const [tableIndex, setTableIndex] = useState<number>(-1)

  // query when the query is executed
  const [query, setQuery] = useState<string>("")
  // fetch state when the query is executed
  const [fetch, setFetch] = useState<boolean>(false)

  //result data and schema
  const [result, setResult] = useState<Array<any>>([])
  const [resultFields, setResultFields] = useState<Array<{field: string, type: string}>>([])

  // sets states to default when workspace is changed
  useEffect(() => {
    setTableIndex(-1)
    setQuery("")
    setResult([])
    setResultFields([])
    setFetch(false)
  }, [space])

  // validates the query
  useEffect(() => {
    if(query.length > 0){
      setFetch(true)
    }
    if(query.length > 0 && query.includes(sqlQueries[space][tableIndex])){
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
            <button><Layout size={20}/> Query Results &nbsp; <span className={`results-fetch${(fetch)?(result.length > 0 && tableIndex !== -1)?' active':' error':''}`}>{(fetch && result.length>0)?result.length + ' rows selected':(tableIndex !== -1)?'Error: Invalid Query':'Error: Select the table to run query'}</span></button>
          </div>
          <QueryResults fields={resultFields} res={result}/>
        </div>
      </div>
    </section>
  ]

}
