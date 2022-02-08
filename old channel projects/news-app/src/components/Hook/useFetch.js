import axios from "axios";
import { useEffect, useState } from "react"


const useFetch = (api) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    useEffect(()=>{

        const fetchData = async () => {
            try {
                const res = await axios.get(api)
                //update data
                setData(res.data)
                setLoading(false)
              } catch (error) {
                setError(error)
              }
        }
         fetchData()
    },[api])

    return [data, loading, error]

}

export default useFetch