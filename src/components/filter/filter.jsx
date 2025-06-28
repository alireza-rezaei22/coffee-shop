import React, { useState } from "react"
import styles from './filter.module.css'
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
                    sort: event.target.value
                },
                newFilter: {
                    type: action.type,
                    id: '',
                    filter: event.target.value
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
                state.filters.brands.splice(brandIndex, 1)
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        brands: state.filters.brands
                    },
                    newFilter: {
                        type: action.type,
                        id: '',
                        filter: state.filters.brands
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
                className={styles.drawer}
            >
                <List className={styles.filterDrawerBox}>
                        <h2 className={styles.filterTitles}>فیلتر ها</h2>
                        <div className="divide-y-2">
                            <div className={`${styles.filter}, ${styles.filterSwich}`}>
                                <h2 className={styles.filterTitle}>ارسال رایگان</h2>
                                <Switch checked={filterReduce.filters.freeDelivery} onChange={() => dispatch({ type: 'FREE_DELIVERY' })} />
                            </div>
                            <div className={`${styles.filter}, ${styles.filterSwich}`}>
                                <h2 className={styles.filterTitle}>فقط موجود</h2>
                                <Switch checked={filterReduce.filters.exist} onChange={() => dispatch({ type: 'EXIST' })} />
                            </div>
                            <Accordion className={styles.filter}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <h2 className={styles.filterTitle}>ترتیب</h2>
                                </AccordionSummary>
                                <AccordionDetails
                                    className={styles.filterListBox}
                                >
                                    <span className={styles.orderItem}>
                                        <h3>ارزان ترین</h3>
                                        <input type="radio" id="cheepest" value="cheepest" checked={filterReduce.filters.sort === 'cheepest'} onChange={() => dispatch({ type: 'SORT' })} />
                                    </span>
                                    <span className={styles.orderItem}>
                                        <h3>گران ترین</h3>
                                        <input type="radio" id="expensivest" value="expensivest" checked={filterReduce.filters.sort === 'expensivest'} onChange={() => dispatch({ type: 'SORT' })} />
                                    </span>
                                    <span className={styles.orderItem}>
                                        <h3>پرفروش ترین</h3>
                                        <input type="radio" id="Bestselling" value="Bestselling" checked={filterReduce.filters.sort === 'Bestselling'} onChange={() => dispatch({ type: 'SORT' })} />
                                    </span>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className={styles.filter}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}>
                                    <h2 className={styles.filterTitle}>قیمت</h2>
                                </AccordionSummary>
                                <AccordionDetails className={styles.filterListBox}>
                                    <div className={styles.priceItem}>
                                        <h3 className={styles.priceHint}>from</h3>
                                        <input type="text"
                                            className={styles.priceInput}
                                            onChange={(event) => {
                                                dispatch({
                                                    type: 'PRICE',
                                                    from: event.target.value, to: filterReduce.filters.priceLimit.to
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className={styles.priceItem}>
                                        <h3 className={styles.priceHint}>to</h3>
                                        <input type="text" onChange={(event) => {
                                            dispatch({
                                                type: 'PRICE',
                                                from: filterReduce.filters.priceLimit.from, to: event.target.value
                                            })
                                        }}
                                            className={styles.priceInput} />
                                    </div>

                                </AccordionDetails>
                            </Accordion>
                            <Accordion className={styles.filter}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <h2 className={styles.filterTitle}>برند</h2>
                                </AccordionSummary>
                                <AccordionDetails
                                    className={styles.filterListBox}
                                    onChange={(event) => {
                                        dispatch({
                                            type: 'BRAND',
                                            newBrand: event.target.value
                                        })
                                    }}
                                >
                                    <span className={styles.brandItem}>
                                        <h3>دولنگی</h3>
                                        <input type="checkbox" value={'دولنگی'} />
                                    </span>
                                    <span className={styles.brandItem}>
                                        <h3>مباشی</h3>
                                        <input type="checkbox" value={'مباشی'} />
                                    </span>
                                    <span className={styles.brandItem}>
                                        <h3>ولگا</h3>
                                        <input type="checkbox" value={'ولگا'} />
                                    </span>
                                    <span className={styles.brandItem}>
                                        <h3>واکاکو</h3>
                                        <input type="checkbox" value={'واکاکو'} />
                                    </span>
                                    <span className={styles.brandItem}>
                                        <h3>وان کافی</h3>
                                        <input type="checkbox" value={'وان کافی'} />
                                    </span>
                                    <span className={styles.brandItem}>
                                        <h3>وگاتی</h3>
                                        <input type="checkbox" value={'وگاتی'} />
                                    </span>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                </List>
            </Drawer>

            <div className={styles.filterBox}>
                <h2 className={styles.filterTitles}>فیلتر ها</h2>
                <div className="divide-y-2">
                    <div className={`${styles.filter}, ${styles.filterSwich}`}>
                        <h2 className={styles.filterTitle}>ارسال رایگان</h2>
                        <Switch checked={filterReduce.filters.freeDelivery} onChange={() => dispatch({ type: 'FREE_DELIVERY' })} />
                    </div>
                    <div className={`${styles.filter}, ${styles.filterSwich}`}>
                        <h2 className={styles.filterTitle}>فقط موجود</h2>
                        <Switch checked={filterReduce.filters.exist} onChange={() => dispatch({ type: 'EXIST' })} />
                    </div>
                    <Accordion className={styles.filter}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h2 className={styles.filterTitle}>ترتیب</h2>
                        </AccordionSummary>
                        <AccordionDetails
                            className={styles.filterListBox}
                        >
                            <span className={styles.orderItem}>
                                <h3>ارزان ترین</h3>
                                <input type="radio" id="cheepest" value="cheepest" checked={filterReduce.filters.sort === 'cheepest'} onChange={() => dispatch({ type: 'SORT' })} />
                            </span>
                            <span className={styles.orderItem}>
                                <h3>گران ترین</h3>
                                <input type="radio" id="expensivest" value="expensivest" checked={filterReduce.filters.sort === 'expensivest'} onChange={() => dispatch({ type: 'SORT' })} />
                            </span>
                            <span className={styles.orderItem}>
                                <h3>پرفروش ترین</h3>
                                <input type="radio" id="Bestselling" value="Bestselling" checked={filterReduce.filters.sort === 'Bestselling'} onChange={() => dispatch({ type: 'SORT' })} />
                            </span>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.filter}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}>
                            <h2 className={styles.filterTitle}>قیمت</h2>
                        </AccordionSummary>
                        <AccordionDetails className={styles.filterListBox}>
                            <div className={styles.priceItem}>
                                <h3 className={styles.priceHint}>from</h3>
                                <input type="text"
                                    className={styles.priceInput}
                                    onChange={(event) => {
                                        dispatch({
                                            type: 'PRICE',
                                            from: event.target.value, to: filterReduce.filters.priceLimit.to
                                        })
                                    }}
                                />
                            </div>
                            <div className={styles.priceItem}>
                                <h3 className={styles.priceHint}>to</h3>
                                <input type="text" onChange={(event) => {
                                    dispatch({
                                        type: 'PRICE',
                                        from: filterReduce.filters.priceLimit.from, to: event.target.value
                                    })
                                }}
                                    className={styles.priceInput} />
                            </div>

                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.filter}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <h2 className={styles.filterTitle}>برند</h2>
                        </AccordionSummary>
                        <AccordionDetails
                            className={styles.filterListBox}
                            onChange={(event) => {
                                dispatch({
                                    type: 'BRAND',
                                    newBrand: event.target.value
                                })
                            }}
                        >
                            <span className={styles.brandItem}>
                                <h3>دولنگی</h3>
                                <input type="checkbox" value={'دولنگی'} />
                            </span>
                            <span className={styles.brandItem}>
                                <h3>مباشی</h3>
                                <input type="checkbox" value={'مباشی'} />
                            </span>
                            <span className={styles.brandItem}>
                                <h3>ولگا</h3>
                                <input type="checkbox" value={'ولگا'} />
                            </span>
                            <span className={styles.brandItem}>
                                <h3>واکاکو</h3>
                                <input type="checkbox" value={'واکاکو'} />
                            </span>
                            <span className={styles.brandItem}>
                                <h3>وان کافی</h3>
                                <input type="checkbox" value={'وان کافی'} />
                            </span>
                            <span className={styles.brandItem}>
                                <h3>وگاتی</h3>
                                <input type="checkbox" value={'وگاتی'} />
                            </span>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <img className={styles.filterShape} src="/src/assets/images/Path 8312.svg" alt="" />
            </div>
        </>
    )
}