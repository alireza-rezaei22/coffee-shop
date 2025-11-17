import React, { useState } from "react"
import { Switch, Accordion, AccordionSummary, AccordionDetails, ListItem } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useEffect, useReducer } from "react"
import { Drawer, List } from '@mui/material';

const filterReducer = (state, action) => {
    switch (action.type) {
        case ('FREE_DELIVERY'): {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    freeDelivery: !state.filters.freeDelivery
                },
                newFilter: {
                    type: action.type,
                    id: '',
                    filter: !state.filters.freeDelivery
                }
            }
        }
        case ('EXIST'): {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    exist: !state.filters.exist
                },
                newFilter: {
                    type: action.type,
                    id: '',
                    filter: !state.filters.exist
                }
            }
        }
        case ('SORT'): {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    sort: action.value
                },
                newFilter: {
                    type: action.type,
                    id: '',
                    filter: action.value
                }
            }
        }
        case ('PRICE'): {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    priceLimit: {
                        from: action.from,
                        to: action.to
                    }
                },
                newFilter: {
                    type: action.type,
                    id: '',
                    filter: {
                        from: action.from,
                        to: action.to
                    }
                }
            }
        }
        case ('BRAND'): {
            let brandIndex = state.filters.brands.findIndex(brand => {
                return brand == action.newBrand
            })
            if (brandIndex == -1) {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        brands: [...state.filters.brands, action.newBrand]
                    },
                    newFilter: {
                        type: action.type,
                        id: '',
                        filter: [...state.filters.brands, action.newBrand]
                    }
                }
            } else {
                const newBrands = [...state.filters.brands];
                newBrands.splice(brandIndex, 1);
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        brands: newBrands
                    },
                    newFilter: {
                        type: action.type,
                        id: '',
                        filter: newBrands
                    }
                }
            }
        }
        default:
            return state
    }
}

export default function Filter({ changeFilter, isDrawerShow, setIsDrawerShow }) {
    const [filterReduce, dispatch] = useReducer(filterReducer, {
        filters: {
            freeDelivery: false,
            exist: false,
            sort: '',
            priceLimit: {},
            brands: []
        },
        newFilter: {
            type: '',
            filter: null
        }
    })

    useEffect(() => {
        changeFilter(filterReduce.newFilter)
    }, [filterReduce])

    return (
        <>
            <Drawer
                open={isDrawerShow}
                anchor="right"
                onClose={()=> setIsDrawerShow(false)}
                className="relative pt-4"
            >
                <List className="relative pt-4">
                        <h2 className="w-full text-center p-3 text-xl text-zinc-600 font-bold">فیلتر ها</h2>
                        <div className="divide-y-2">
                            <div className="w-full text-center p-3 text-sm text-zinc-500 font-bold flex justify-between items-center">
                                <h2 className="text-sm text-zinc-500 font-bold">ارسال رایگان</h2>
                                <Switch checked={filterReduce.filters.freeDelivery} onChange={() => dispatch({ type: 'FREE_DELIVERY' })} />
                            </div>
                            <div className="w-full text-center p-3 text-sm text-zinc-500 font-bold flex justify-between items-center">
                                <h2 className="text-sm text-zinc-500 font-bold">فقط موجود</h2>
                                <Switch checked={filterReduce.filters.exist} onChange={() => dispatch({ type: 'EXIST' })} />
                            </div>
                            <Accordion className="w-full">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <h2 className="text-sm text-zinc-500 font-bold">ترتیب</h2>
                                </AccordionSummary>
                                <AccordionDetails
                                    className="text-sm text-zinc-400 font-normal space-y-2"
                                >
                                    <span className="flex justify-between">
                                        <h3>ارزان ترین</h3>
                                        <input type="radio" id="cheepest" value="cheepest" checked={filterReduce.filters.sort === 'cheepest'} onChange={() => dispatch({ type: 'SORT', value: 'cheepest' })} />
                                    </span>
                                    <span className="flex justify-between">
                                        <h3>گران ترین</h3>
                                        <input type="radio" id="expensivest" value="expensivest" checked={filterReduce.filters.sort === 'expensivest'} onChange={() => dispatch({ type: 'SORT', value: 'expensivest' })} />
                                    </span>
                                    <span className="flex justify-between">
                                        <h3>پرفروش ترین</h3>
                                        <input type="radio" id="Bestselling" value="Bestselling" checked={filterReduce.filters.sort === 'Bestselling'} onChange={() => dispatch({ type: 'SORT', value: 'Bestselling' })} />
                                    </span>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className="w-full">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}>
                                    <h2 className="text-sm text-zinc-500 font-bold">قیمت</h2>
                                </AccordionSummary>
                                <AccordionDetails className="text-sm text-zinc-400 font-normal space-y-2">
                                    <div className="flex items-center space-y-1 space-x-2 space-x-reverse">
                                        <h3 className="flex items-center space-y-1 space-x-2 space-x-reverse">from</h3>
                                        <input type="text"
                                            className="w-full px-2 py-1 bg-zinc-50 border border-zinc-100 outline-none rounded-full"
                                            onChange={(event) => {
                                                dispatch({
                                                    type: 'PRICE',
                                                    from: event.target.value, to: filterReduce.filters.priceLimit.to
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="flex items-center space-y-1 space-x-2 space-x-reverse">
                                        <h3 className="flex items-center space-y-1 space-x-2 space-x-reverse">to</h3>
                                        <input type="text" onChange={(event) => {
                                            dispatch({
                                                type: 'PRICE',
                                                from: filterReduce.filters.priceLimit.from, to: event.target.value
                                            })
                                        }}
                                            className="w-full px-2 py-1 bg-zinc-50 border border-zinc-100 outline-none rounded-full" />
                                    </div>

                                </AccordionDetails>
                            </Accordion>
                            <Accordion className="w-full">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <h2 className="text-sm text-zinc-500 font-bold">برند</h2>
                                </AccordionSummary>
                                <AccordionDetails
                                    className="text-sm text-zinc-400 font-normal space-y-2"
                                    onChange={(event) => {
                                        dispatch({
                                            type: 'BRAND',
                                            newBrand: event.target.value
                                        })
                                    }}
                                >
                                    <span className="flex justify-between">
                                        <h3>دولنگی</h3>
                                        <input type="checkbox" value={'دولنگی'} />
                                    </span>
                                    <span className="flex justify-between">
                                        <h3>مباشی</h3>
                                        <input type="checkbox" value={'مباشی'} />
                                    </span>
                                    <span className="flex justify-between">
                                        <h3>ولگا</h3>
                                        <input type="checkbox" value={'ولگا'} />
                                    </span>
                                    <span className="flex justify-between">
                                        <h3>واکاکو</h3>
                                        <input type="checkbox" value={'واکاکو'} />
                                    </span>
                                    <span className="flex justify-between">
                                        <h3>وان کافی</h3>
                                        <input type="checkbox" value={'وان کافی'} />
                                    </span>
                                    <span className="flex justify-between">
                                        <h3>وگاتی</h3>
                                        <input type="checkbox" value={'وگاتی'} />
                                    </span>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                </List>
            </Drawer>

            <div className="relative w-1/5 pt-4 border-l-2 hidden md:flex md:flex-col md:items-center">
                <h2 className="w-full text-center p-3 text-xl text-zinc-600 font-bold">فیلتر ها</h2>
                <div className="divide-y-2">
                    <div className="w-full text-center p-3 text-sm text-zinc-500 font-bold flex justify-between items-center">
                        <h2 className="text-sm text-zinc-500 font-bold">ارسال رایگان</h2>
                        <Switch checked={filterReduce.filters.freeDelivery} onChange={() => dispatch({ type: 'FREE_DELIVERY' })} />
                    </div>
                    <div className="w-full text-center p-3 text-sm text-zinc-500 font-bold flex justify-between items-center">
                        <h2 className="text-sm text-zinc-500 font-bold">فقط موجود</h2>
                        <Switch checked={filterReduce.filters.exist} onChange={() => dispatch({ type: 'EXIST' })} />
                    </div>
                    <Accordion className="w-full">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h2 className="text-sm text-zinc-500 font-bold">ترتیب</h2>
                        </AccordionSummary>
                        <AccordionDetails
                            className="text-sm text-zinc-400 font-normal space-y-2"
                        >
                            <span className="flex justify-between">
                                <h3>ارزان ترین</h3>
                                <input type="radio" id="cheepest" value="cheepest" checked={filterReduce.filters.sort === 'cheepest'} onChange={() => dispatch({ type: 'SORT', value: 'cheepest' })} />
                            </span>
                            <span className="flex justify-between">
                                <h3>گران ترین</h3>
                                <input type="radio" id="expensivest" value="expensivest" checked={filterReduce.filters.sort === 'expensivest'} onChange={() => dispatch({ type: 'SORT', value: 'expensivest' })} />
                            </span>
                            <span className="flex justify-between">
                                <h3>پرفروش ترین</h3>
                                <input type="radio" id="Bestselling" value="Bestselling" checked={filterReduce.filters.sort === 'Bestselling'} onChange={() => dispatch({ type: 'SORT', value: 'Bestselling' })} />
                            </span>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="w-full">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}>
                            <h2 className="text-sm text-zinc-500 font-bold">قیمت</h2>
                        </AccordionSummary>
                        <AccordionDetails className="text-sm text-zinc-400 font-normal space-y-2">
                            <div className="flex items-center space-y-1 space-x-2 space-x-reverse">
                                <h3 className="flex items-center space-y-1 space-x-2 space-x-reverse">from</h3>
                                <input type="text"
                                    className="w-full px-2 py-1 bg-zinc-50 border border-zinc-100 outline-none rounded-full"
                                    onChange={(event) => {
                                        dispatch({
                                            type: 'PRICE',
                                            from: event.target.value, to: filterReduce.filters.priceLimit.to
                                        })
                                    }}
                                />
                            </div>
                            <div className="flex items-center space-y-1 space-x-2 space-x-reverse">
                                <h3 className="flex items-center space-y-1 space-x-2 space-x-reverse">to</h3>
                                <input type="text" onChange={(event) => {
                                    dispatch({
                                        type: 'PRICE',
                                        from: filterReduce.filters.priceLimit.from, to: event.target.value
                                    })
                                }}
                                    className="w-full px-2 py-1 bg-zinc-50 border border-zinc-100 outline-none rounded-full" />
                            </div>

                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="w-full">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <h2 className="text-sm text-zinc-500 font-bold">برند</h2>
                        </AccordionSummary>
                        <AccordionDetails
                            className="text-sm text-zinc-400 font-normal space-y-2"
                            onChange={(event) => {
                                dispatch({
                                    type: 'BRAND',
                                    newBrand: event.target.value
                                })
                            }}
                        >
                            <span className="flex justify-between">
                                <h3>دولنگی</h3>
                                <input type="checkbox" value={'دولنگی'} />
                            </span>
                            <span className="flex justify-between">
                                <h3>مباشی</h3>
                                <input type="checkbox" value={'مباشی'} />
                            </span>
                            <span className="flex justify-between">
                                <h3>ولگا</h3>
                                <input type="checkbox" value={'ولگا'} />
                            </span>
                            <span className="flex justify-between">
                                <h3>واکاکو</h3>
                                <input type="checkbox" value={'واکاکو'} />
                            </span>
                            <span className="flex justify-between">
                                <h3>وان کافی</h3>
                                <input type="checkbox" value={'وان کافی'} />
                            </span>
                            <span className="flex justify-between">
                                <h3>وگاتی</h3>
                                <input type="checkbox" value={'وگاتی'} />
                            </span>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <img className="absolute bottom-5 -right-5 start-0 w-full -z-50" src="/src/assets/images/Path 8312.svg" alt="" />
            </div>
        </>
    )
}