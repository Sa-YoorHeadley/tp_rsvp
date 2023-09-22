import { useState } from "react";
import axios from "../../api/axios";

export const useSearch = () => {
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(null)

    const createListing = async (listingData, changeModal) => {
        setIsLoading(true)
        setErrors([])
        const url = `http://localhost:3001/search/${user._id}`
        await axios.post(url, listingData, {
            headers: {
              'Content-Type': 'multipart/form-data'
        }})
        .then(res => {
            console.log(res)
            dispatch({type: 'CREATE_LISTING', payload: res.data.listing || {}})
            localStorage.setItem('properties', JSON.stringify(properties))
            setIsLoading(false)
            alert(res?.data?.message)
            changeModal('')
        }).catch(error => {
            console.log(error)
            setErrors(prevErrors => {
                const newErrors = []
                if(error?.response?.data?.message && error.response.status !== 401) { 
                    if(Array.isArray(error.response.data.message)){
                        newErrors.push(...error.response.data.message) 
                    }
                    newErrors.push(error.response.data.message) 
                }
                    return [...prevErrors, ...newErrors]
            })
            setIsLoading(false)
            alert(error?.response?.data?.message)
        })
        return
    }

    const getListings = async (_id) => {
        setIsLoading(true)
        setErrors([])
        const url = !_id ? `http://localhost:3001/listings/${user._id}` : `http://localhost:3001/listings/${_id}`
        axios.get(url)
        .then(res => {
            console.log(res)
            localStorage.setItem('properties', JSON.stringify(res.data.listings))
            dispatch({type: 'SET_PROPERTIES', payload: res.data.listings})
            setIsLoading(false)
        }).catch(error => {
            console.log(error)
            if(error?.response?.status !== 401){
                localStorage.setItem('properties', JSON.stringify(error.response.data.listings)) 
                dispatch({type: 'SET_PROPERTIES', payload: error.response.data.listings})
                setErrors(prevErrors => {
                    const newErrors = []
                    if(error.response && error.response.data) { newErrors.push(...error.response.data) }
                    return [...prevErrors, ...newErrors]
                })
            }
            setIsLoading(false)
        })
    }

    const editListing = async (listingId, listingData, changeModal) => {
        console.log(listingId)
        console.log(listingData)
        setIsLoading(true)
        setErrors([])
        const url = `http://localhost:3001/listings/${user._id}/${listingId}`
        await axios.patch(url, listingData, {
            headers: {
              'Content-Type': 'multipart/form-data'
        }})
        .then(res => {
            console.log(res)
            dispatch({type: 'EDIT_LISTING', payload: res.data.listing || {}})
            localStorage.setItem('properties', JSON.stringify(properties))
            setIsLoading(false)
            alert(res?.data?.message)
            changeModal('')
        }).catch(error => {
            console.log(error)
            setErrors(prevErrors => {
                const newErrors = []
                if(error?.response?.data?.message && error.response.status !== 401) { 
                    if(Array.isArray(error.response.data.message)){
                        newErrors.push(...error.response.data.message) 
                    }
                    newErrors.push(error.response.data.message) 
                }
                return [...prevErrors, ...newErrors]
            })
            setIsLoading(false)
            alert(error?.response?.data?.message)
        })
        return 
    }

    const editStatus = async (listingId, status) => {
        console.log(listingId)
        setIsLoading(true)
        setErrors([])
        const url = `http://localhost:3001/listings/${user._id}/${listingId}/status`
        await axios.patch(url, {status})
        .then(res => {
            console.log(res)
            dispatch({type: 'EDIT_LISTING', payload: res.data.listing || {}})
            localStorage.setItem('properties', JSON.stringify(properties))
            setIsLoading(false)
            alert(res?.data?.message)
        }).catch(error => {
            console.log(error)
            setErrors(prevErrors => {
                const newErrors = []
                if(error?.response?.data?.message && error.response.status !== 401) { 
                    if(Array.isArray(error.response.data.message)){
                        newErrors.push(...error.response.data.message) 
                    }
                    newErrors.push(error.response.data.message) 
                }
                return [...prevErrors, ...newErrors]
            })
            setIsLoading(false)
            alert(error?.response?.data?.message)
        })
        return 
    }

    const deleteListing = async (listingId) => {
        setIsLoading(true)
        setErrors([])
        const url = `http://localhost:3001/listings/${user._id}/${listingId}`
        axios.delete(url)
        .then(res => {
            console.log(res)
            dispatch({type: 'DELETE_LISTING', payload: {_id: listingId}})
            localStorage.setItem('properties', JSON.stringify(properties))
            setIsLoading(false)
            alert(res?.data?.message)
        }).catch(error => {
            console.log(error)
            setErrors(prevErrors => {
                const newErrors = []
                if(error?.response?.data?.message && error.response.status !== 401) { 
                    if(Array.isArray(error.response.data.message)){
                        newErrors.push(...error.response.data.message) 
                    }
                    newErrors.push(error.response.data.message) 
                }
                return [...prevErrors, ...newErrors]
                
            })
            setIsLoading(false)
            alert(error?.response?.data?.message)
        })
    }


    return { createListing, getListings, editListing, editStatus, deleteListing, isLoading, errors}
}