import React, {useEffect} from "react"
import { useLazyQuery } from 'react-apollo';
import random from './graphql/searchrandomcookie.gql'
import { Spinner } from 'vtex.styleguide'


const storeCookie = () => {
  const [getData, { data, loading }] = useLazyQuery(random, { fetchPolicy: 'network-only', notifyOnNetworkStatusChange: true })

 useEffect(() => {
  data?
  console.log(data)
  :
  null
 }, [data])


// if(loading){
//   return (
//     <div>
//       < Spinner />
//     </div>
//   )
// }

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
    <div className={"flex justify-center mt3"}>
    <div>
      <button className={"bg-action-primary white bn h3 f1 br3 pointer:hover: pointer"} onClick={() => {getData()}}>
        Click me!
        </button>{
          data?
          <div>
            <h3>
              {data.searchRandomCookie.text}
            </h3>
            <h5>
              {generateRandomNumber()}
            </h5>
          </div>
          :
          loading?
          < Spinner />
          :
          null
        }
    </div>
    </div>
  )
}

export default storeCookie
