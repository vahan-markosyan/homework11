import React from 'react'
import { useFetch } from './useFetch'

const Child1 = () => {
    const { result, loading, error, refetch } = useFetch('https://fakestoreapi.com/products/1')

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>
            <h1>Product 1</h1>
            <div>
             <h3>{result.title}</h3>
             <p>Price: ${result.price}</p>
             <p>{result.description}</p>
            </div>

            <button onClick={refetch}>Refetch</button>
        </div>
    )
}

export default Child1
