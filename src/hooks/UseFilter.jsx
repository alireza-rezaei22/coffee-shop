import { useEffect, useReducer } from "react"

const filterReducer = (state, action) => {
    switch (action.type) {
        case ('FREE_DELIVERY'): {
            if (action.filter) {
                return {
                    ...state,
                    filters: [
                        ...state.filters.slice(0, 0),
                        state.products.filter(product => {
                            return product.deliveryCost == 0
                        }),
                        ...state.filters.slice(1)
                    ]
                }
            } else {
                return {
                    ...state,
                    filters: [
                        ...state.filters.slice(0, 0),
                        [...state.filters[0], ...state.products.filter(product => {
                            return product.deliveryCost != 0
                        })],
                        ...state.filters.slice(1)
                    ]
                }
            }
        }
        case ('EXIST'): {
            if (action.filter) {
                return {
                    ...state,
                    filters: [
                        ...state.filters.slice(0, 1),
                        state.products.filter(product => {
                            return product.price != 0
                        }),
                        ...state.filters.slice(2)
                    ]
                }
            } else {
                return {
                    ...state,
                    filters: [
                        ...state.filters.slice(0, 1),
                        [...state.filters[1], ...state.products.filter(product => {
                            return product.price == 0
                        })],
                        ...state.filters.slice(2)
                    ]
                    // filters: {
                    //     ...state.filters,
                    //     justExist: [...state.filters.justExist, ...state.products.filter(product => {
                    //         return product.price == 0
                    //     })]
                    // }
                }
            }
        }
        case ('PRICE'): {
            let maxPrice = Math.max(...state.products.map(product => product.price))
            return {
                ...state,
                filters: [
                    ...state.filters.slice(0, 3),
                    state.products.filter(product => {
                        return (product.price >= (action.filter.from || 0)) &&
                            (product.price <= (action.filter.to || maxPrice))
                    }),
                    ...state.filters.slice(4)
                ]
                // filters: {
                //     ...state.filters,
                //     priceLimit: state.products.filter(product => {
                //         return (product.price >= action.filter.from || 0) &&
                //             (product.price <= action.filter.to || maxPrice)
                //     })
            }
        }
        case ('BRAND'): {
            if (action.filter.length > 0) {
                return {
                    ...state,
                    filters: [
                        ...state.filters.slice(0, 4),
                        state.products.filter(product => {
                            return action.filter.includes(product.brand)
                        }),
                    ]
                }
            } else {
                return {
                    ...state,
                    filters: [
                        ...state.filters.slice(0, 4),
                        state.products
                    ]
                }

            }
        }
        case ('SORT'): {
            let sortProduct = action.value || state.products
            console.log(sortProduct);
            if (action.filter == 'cheepest') {
                return{
                    ...state,
                    filteredProducts : [...sortProduct.sort((a, b) => {
                        return a.price - b.price
                    })]
                }
            }
            else if (action.filter == 'expensivest') {
                return{
                    ...state,
                    filteredProducts : [...sortProduct.sort((a, b) => {
                        return b.price - a.price
                    })]
                }
            }
            else if (action.filter == 'Bestselling') {
                return{
                    ...state,
                    filteredProducts : [...sortProduct.sort((a, b) => {
                        return b.sell - a.sell
                    })]
                }
            }
            else {
                return{
                    ...state,
                    filteredProducts : sortProduct
                }
            }
        }
        default:{
            return state
        }
    }
    
}

export const UseFilter = (initFilter) => {
    const [filterState, dispatch] = useReducer(filterReducer, {
        products: initFilter.allProducts,
        filters: [
            undefined,
            undefined,
            undefined,
            undefined,
            undefined
        ],
        filteredProducts: []
    })
    useEffect(() => {
        let abstracted = filterState.filters.filter(item => {
            return Array.isArray(item)
        })
        if (abstracted.length > 0) {
            let unSorted = abstracted.reduce((prev, current) => {
                return prev.filter(item => current.includes(item))
            })
            dispatch({
                type: 'SORT',
                value: unSorted
            })

        } else {
            dispatch({
                type: 'SORT',
                value: null
            })
        }
    }, [filterState.filters])
    const changeFilter = (newFilter) => {
        const { type, id, filter } = newFilter
        dispatch({
            type,
            id,
            filter
        })
    }
    return [filterState.filteredProducts, changeFilter]
}