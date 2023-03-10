import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

// kaikkien numeroiden haku
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// uuden numeron lisääminen
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const delPerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, delPerson }