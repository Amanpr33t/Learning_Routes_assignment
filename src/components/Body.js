import React from "react";
import './Body.css'
import { useState, useEffect } from "react";
import data from '../data.json'
import { useDispatch, useSelector } from "react-redux";
import { BlurActions } from "../store/slices/BlurSlice";
import { SelectedCollegeDataActions } from "../store/slices/SelectedCollegeDataSlice";
import { FilterDataActions } from "../store/slices/FilterDataSlice";


const Body = () => {
    const dispatch = useDispatch()
    const { courseType, duration, feesMin, feesMax, field } = useSelector(state => state.FilterData.filterData)
    const isBlur = useSelector(state => state.Blur.isBlur)
    const [selectedCollege, setSelectedCollege] = useState(null)
    const [coursesToBeShown, setCourseToBeShown] = useState(null)

    
   useEffect(() => {
        const inputData = data && data.colleges.find(college => college.name === selectedCollege)
        let dataToBeShown = []
        if (field) {
            dataToBeShown = inputData.courses.filter(course => {
                return field === course.field
            })
            let feesAny = feesMax || feesMin ? true : false
            if (courseType && duration && feesAny) {
                if (feesMax && feesMin) {
                    dataToBeShown = dataToBeShown.filter(course => {
                        return courseType === course.courseType && duration.toString() === course.duration.charAt(0) && feesMax >= parseInt(course.fees_per_semester) && feesMin <= parseInt(course.fees_per_semester)
                    })
                } else if (feesMax) {
                    dataToBeShown = dataToBeShown.filter(course => {
                        return courseType === course.courseType && duration.toString() === course.duration.charAt(0) && feesMax >= parseInt(course.fees_per_semester)
                    })
                } else if (feesMin) {
                    dataToBeShown = dataToBeShown.filter(course => {
                        return courseType === course.courseType && duration.toString() === course.duration.charAt(0) && feesMin <= parseInt(course.fees_per_semester)
                    })
                }
            } else if (courseType && duration) {
                dataToBeShown = dataToBeShown.filter(course => {
                    return courseType === course.courseType && duration.toString() === course.duration.charAt(0)
                })
            } else if (duration && feesAny) {
                if (feesMax && feesMin) {
                    dataToBeShown = dataToBeShown.filter(course => {
                        return duration.toString() === course.duration.charAt(0) && feesMax >= parseInt(course.fees_per_semester) && feesMin <= parseInt(course.fees_per_semester)
                    })
                } else if (feesMax) {
                    dataToBeShown = dataToBeShown.filter(course => {
                        return duration.toString() === course.duration.charAt(0) && feesMax >= parseInt(course.fees_per_semester)
                    })
                } else if (feesMin) {
                    dataToBeShown = dataToBeShown.filter(course => {
                        return duration.toString() === course.duration.charAt(0) && feesMin <= parseInt(course.fees_per_semester)
                    })
                }
            } else if (courseType && feesAny) {
                if (feesMax && feesMin) {
                    dataToBeShown = dataToBeShown.filter(course => {
                        return courseType === course.courseType && feesMax >= parseInt(course.fees_per_semester) && feesMin <= parseInt(course.fees_per_semester)
                    })
                } else if (feesMax) {
                    dataToBeShown = dataToBeShown.filter(course => {
                        return courseType === course.courseType && feesMax >= parseInt(course.fees_per_semester)
                    })
                } else if (feesMin) {
                    dataToBeShown = dataToBeShown.filter(course => {
                        return courseType === course.courseType && feesMin <= parseInt(course.fees_per_semester)
                    })
                }
            } else if (courseType) {
                dataToBeShown = dataToBeShown.filter(course => {
                    return courseType === course.courseType
                })
            } else if (duration) {
                dataToBeShown = dataToBeShown.filter(course => {
                    return duration.toString() === course.duration.charAt(0)
                })
            } else if (feesAny) {
                if (feesMax && feesMin) {
                    dataToBeShown = dataToBeShown.filter(course => {
                        return feesMax >= parseInt(course.fees_per_semester) && feesMin <= parseInt(course.fees_per_semester)
                    })
                } else {
                    if (feesMax) {
                        dataToBeShown = dataToBeShown.filter(course => {
                            return feesMax >= parseInt(course.fees_per_semester)
                        })
                    } else {
                        dataToBeShown = dataToBeShown.filter(course => {
                            return feesMin <= parseInt(course.fees_per_semester)
                        })
                    }
                }
            }
            setCourseToBeShown(dataToBeShown)
        }
    }, [courseType, duration, feesMin, feesMax, field, selectedCollege, dispatch])

    useEffect(() => {
        const inputData = data && data.colleges.find(college => college.name === selectedCollege)
        dispatch(SelectedCollegeDataActions.setSelectedCollegeData(inputData))
    }, [selectedCollege, dispatch])



    return (
        <React.Fragment>
            <div className={`${isBlur ? 'blur' : null}`}>
                <div className="dropdown_container">
                    <div className="college_dropdown">
                        <select name="college" id="college" defaultValue="Colleges" className="college-select" onChange={event => {
                            setSelectedCollege(event.target.value)
                            setCourseToBeShown(null)
                            dispatch(FilterDataActions.setFilterData({
                                courseType: null, duration: null, feesMin: null, feesMax: null, field: null
                            }))
                        }}>
                            <option value="Colleges" disabled >Colleges</option>
                            {data && data.colleges.map(college => {
                                return <option key={college.name} value={college.name}>{college.name}</option>
                            })}
                        </select>
                    </div>
                    {selectedCollege && <div className="filter_button">
                        <button onClick={() => dispatch(BlurActions.setBlur(true))}>Filters</button>
                    </div>}
                </div>


                {!selectedCollege && <div className="not_selected">
                    <h2>Select a college</h2>
                </div>}

                {selectedCollege && < div className="body_content">
                    <div className="course_card_container">
                        {field && coursesToBeShown && coursesToBeShown.length === 0 && <h2>No courses available</h2>}
                        {selectedCollege && !field && <h2>Apply filters</h2>}
                        {coursesToBeShown && coursesToBeShown.length > 0 && coursesToBeShown.map(course => {
                            return <div className="card" key={course.name}>
                                <h3>{course.name}</h3>
                                <div>
                                    <h4>Duration:</h4>
                                    <p>{course.duration}</p>
                                </div>
                                <div>
                                    <h4>Semester fees:</h4>
                                    <p>₹{course.fees_per_semester}</p>
                                </div>
                                <div>
                                    <button>Apply</button>
                                </div>
                            </div>
                        })}
                    </div>
                    </div>}
            </div>
        </React.Fragment >
    )
}

export default Body