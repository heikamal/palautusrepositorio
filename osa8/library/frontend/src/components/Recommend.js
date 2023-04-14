import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { USER } from "../queries"

const Recommend = (props) => {
    const [user, setUser] = useState(null)
    
    const result = useQuery(USER)
    useEffect(() => {
        if (result.data) {
            setUser(result.data)
        }
    }, [result.data])
    

    if (!props.show){
        return null
    }

    if (result.loading)  {
        return <div>loading...</div>
    }
    

    return (
        <div>
        <h2>recommendations</h2>
          {props.books.filter(book => book.genres.includes(user.favoriteGenre)).map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </div>
    )
}

export default Recommend