import React, { FC, useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from 'react-apollo'
import search from "./graphql/searchcookie.gql"
import addcookie from "./graphql/addcookie.gql"
import deletecookie from "./graphql/deletecookie.gql"
import { Spinner, Layout, PageBlock, PageHeader } from 'vtex.styleguide'

//useMutation
const CookiesFortune: FC = () => {
  const [ getData, { data} ] = useLazyQuery(search, { fetchPolicy: 'network-only'})
  const [value, setValue] = useState(null)
  const [change, setChange] = useState(false)

  useEffect(() => {
    setTimeout(() => { //agregue este timeout para que no fetchee la data antes de que este creada la nueva cookie
      getData()
    }, 700)
  }, [change])
// borre el data del observer del useEffect

const handleChange = (e:any) => {
  setValue(e.target.value)
}

 const [addCookie,] = useMutation(addcookie);
 const [deleteCookie] = useMutation(deletecookie);




  return (
    <Layout pageHeader={<PageHeader title="Cookies Fortune" />}>
      <PageBlock>

  <div>
    {data?
    data.searchCookie.map((e: any) => <div className={"flex w-100 justify-between mb4"} key={e.id}>{e.text} <button className={"bg-red br2 bn white pointer:hover: pointer"} onClick={() => {
      deleteCookie({variables: {id: e.id}})
      setChange(!change)
    }
  }>Borrar</button></div>)
  :
    <Spinner/>

}
  <input className={"w-50 h2"} type="text " onChange={handleChange}/>
  <button className={"bg-action-primary white ml2 br2 bn h2 pointer:hover: pointer"} onClick={async () => {
    await addCookie({variables: {text: value}})
    setChange(!change)
  }}>
    Crear Cookie
    </button>
  </div>
    </PageBlock>
      </Layout>
    )
}

export default CookiesFortune
