import { useEffect, useState, useMemo, useCallback } from "react"

const cache = new Map()

export const useFetch = (url) => {
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [time, setTime] = useState(null)

    const cacheTime = useMemo(() => time, [time])

    const fetchData = useCallback(() => {
        setLoading(true)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                cache.set(url, data)
                const newTime = new Date().getTime()
                setTime(newTime)
                setResult(data)
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [url])

    const refetch = useCallback(() => {
        fetchData()
    }, [fetchData])

    useEffect(() => {
        const cachedData = cache.get(url)
        const currentTime = new Date().getTime()

        if (cachedData && cacheTime && (currentTime - cacheTime) < 4 * 60 * 1000) { //es pahy nayel em ???
            setResult(cachedData)
            setLoading(false)
        } else {
            fetchData()
        }
    }, [url, fetchData, cacheTime])

    return { result, error, loading, refetch }
}
