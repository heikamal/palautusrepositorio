import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {
	const dispatch = useDispatch()
	const handleChange = (event) => {
	  // input-kentän arvo muuttujassa event.target.value
	  const input = event.target.value
	  dispatch(filterChange(input))
	}

	const style = {
	  marginBottom: 10
	}
  
	return (
	  <div style={style}>
		filter <input onChange={handleChange} />
	  </div>
	)
  }
  
  export default Filter