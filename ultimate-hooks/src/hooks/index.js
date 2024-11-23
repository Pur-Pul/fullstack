import axios from 'axios'
import { useState, useEffect } from 'react'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    let token = null
    const setToken = newToken => {
        token = `bearer ${newToken}`
    }
    
    const getAll = async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)
    }
    
    const create = async newObject => {
        const config = {
            headers: { Authorization: token },
        }
    
        const response = await axios.post(baseUrl, newObject, config)
        setResources([...resources, response.data])
    }
    
    const update = async (id, newObject) => {
        const response = await axios.put(`${ baseUrl }/${id}`, newObject)
        const index_to_update = resources.findIndex((element) => element.id === id)
        let new_resources = resources.splice()
        new_resources[index_to_update] = response.data
        setResources(new_resources)
    }
    useEffect(() => {
        getAll()
    }, [])

    const service =  { setToken, getAll, create, update }

    return [
        resources, service
    ]
}