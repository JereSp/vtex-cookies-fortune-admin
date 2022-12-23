import React, {useEffect} from "react"
import { useLazyQuery } from 'react-apollo';
import random from './graphql/searchrandomcookie.gql'



const storeCookie = () => {
  const [getData, { data, loading }] = useLazyQuery(random, { fetchPolicy: 'network-only', notifyOnNetworkStatusChange: true })

 useEffect(() => {
  data?
  console.log(data)
  :
  null
 }, [data])


if(loading){
  return (
    <div>
      <span>Loading...</span>
    </div>
  )
}

const generateRandomNumber = () => {
  let initial = [];
  for (let i = 0; i < 4; i++){
    let number = Math.ceil(Math.random() * 90 + 10);
    initial.push(number)
  }
  let luckyNumbers = initial.join('-')
  console.log(console.log(luckyNumbers))
  return luckyNumbers
}

generateRandomNumber()

  return (
    <div>
      <button onClick={() => {getData()}}>
        clickeame
        </button>{
          data?
          <div>
            <p>
              {data.searchRandomCookie.text}
            </p>
            <p>
              {generateRandomNumber()}
            </p>
          </div>
          :
          null
        }
    </div>
  )
}

export default storeCookie
