import React from "react";
import './Filters.css'
import { useDispatch, useSelector } from "react-redux";
import { BlurActions } from "../store/slices/BlurSlice";
import { useState, useEffect } from "react";
import { FilterDataActions } from "../store/slices/FilterDataSlice";

const Filters = () => {
    const dispatch = useDispatch()
    const [courseType, setCourseType] = useState(null)
    const [duration, setDuration] = useState(null)
    const [feesMin, setFeesMin] = useState(null)
    const [feesMax, setFeesMax] = useState(null)
    const [field, setField] = useState(null)
    const [isEnable, setIsEnable] = useState(false)
    const selectedCollegeData = useSelector(state => state.SelectedCollegeData.selectedCollegeData)

    function fieldSetter() {
        let fieldList = []
        selectedCollegeData && selectedCollegeData.courses.forEach(course => {
            if (!fieldList.includes(course.field)) {
                fieldList.push(course.field)
            }
        })
        return fieldList
    }

    const filtersApply = () => {
        if (isEnable) {
            dispatch(FilterDataActions.setFilterData({
                courseType, duration, feesMin, feesMax, field
            }))
            dispatch(BlurActions.setBlur(false))
        }
    }

    useEffect(() => {
        if (!field) {
            setIsEnable(false)
        } else {
            setIsEnable(true)
        }
    }, [field])


    return (
        <React.Fragment>
            <div className="filter_box">
                <div className="filters">
                    <div className="course_type">
                        <h5>Course type:</h5>
                        <div>
                            <input type="radio" value="Bachelors" name="gender" onChange={(e) => setCourseType(e.target.value)} /> Bachelors
                            <input type="radio" value="Masters" name="gender" onChange={(e) => setCourseType(e.target.value)} /> Masters
                        </div>
                    </div>
                    <div className="duration">
                        <h5>Course duration in years:</h5>
                        <input type="number" id="duration" name="duration" min='1' max='6' onChange={(e) => setDuration(e.target.value)} />
                    </div>
                    <div className="fees">
                        <h5>Course fees:</h5>
                        <div className="fees_input_container">
                            <input type="number" id="fees1" name="fees" placeholder="₹ Min" onChange={(e) => setFeesMin(e.target.value)} />
                            <input type="number" id="fees2" name="fees" placeholder="₹ Max" onChange={(e) => setFeesMax(e.target.value)} />
                        </div>
                    </div>
                    <div className="select_field">
                        <h5>Select field:</h5>
                        <select name="field" id="field" defaultValue="Fields" className="college-select" onChange={(e) => setField(e.target.value)}>
                            <option value="Fields" disabled >Fields</option>
                            {fieldSetter().map(field => {
                                return <option key={field} value={field}>{field}</option>
                            })}
                        </select>
                        <p>*Field is mandatory</p>
                    </div>
                    <div className="apply_cancel_button">
                        <button onClick={filtersApply}>Apply</button>
                        <button onClick={() => dispatch(BlurActions.setBlur(false))}>Cancel</button>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default Filters