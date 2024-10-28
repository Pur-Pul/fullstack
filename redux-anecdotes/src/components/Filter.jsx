import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
const Filter = () => {
    const dispatch = useDispatch()
    const filter_handler = (event) => {
        event.preventDefault()
        dispatch(filterChange(event.target.value))
    }
    
    return (
        <div>
            filter anecdotes    
            <input 
            name="filter" 
            onChange={filter_handler}
            />
        </div>
    )
}

export default Filter