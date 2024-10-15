import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  	const request = axios.get(baseUrl)
  	return request.then(response => response.data)
}

const post = async blog => {
	const config = {
		headers: { Authorization: token },
	}

    const response = await axios.post(baseUrl, blog, config)
  	return response.data
}

const setToken = new_token => {
	token = `Bearer ${new_token}`
}

export default { getAll, post, setToken}