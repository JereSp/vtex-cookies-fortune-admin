import React, { FC, useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from 'react-apollo'
import search from "./graphql/searchcookie.gql"
import addcookie from "./graphql/addcookie.gql"
import deletecookie from "./graphql/deletecookie.gql"

//useMutation
const CookiesFortune: FC = () => {
  const [ getData, { data, loading} ] = useLazyQuery(search, { fetchPolicy: 'network-only'})
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
  <div>
    {data?
    data.searchCookie.map((e: any) => <div key={e.id}>{e.text} <button onClick={() => {
      deleteCookie({variables: {id: e.id}})
      setChange(!change)
    }
    }>borrar</button></div>)
    :
    loading
    }
  <input type="text " onChange={handleChange}/>
  <button onClick={async () => {
    await addCookie({variables: {text: value}})
    setChange(!change)
    }}>
    Crear Cookie
    </button>
  </div>
    )
}

export default CookiesFortune
