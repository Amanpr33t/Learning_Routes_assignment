import React from "react";
import './Body.css'
import { useState } from "react";
import data from '../data.json'

const Body = () => {
    const [selectedCollege, setSelectedCollege] = useState(null)
    const [coursesToBeShown, setCourseToBeShown] = useState(null)
    const [listItemSelected, setListItemSelected] = useState(false)
    const selectedCollegeData = data && selectedCollege && data.colleges.find(college => college.name === selectedCollege)

    const listItemClick = (courseTitle) => {
        setListItemSelected(true)
        const courseData = selectedCollegeData && selectedCollegeData.courses.find(course => course.title === courseTitle)
        setCourseToBeShown(courseData)
    }

    return (
        <React.Fragment>

            <div className="college_dropdown">
                <select name="cars" id="cars" defaultValue="Colleges" className="college-select" onChange={event => {
                    setSelectedCollege(event.target.value)
                    setCourseToBeShown(null)
                    setListItemSelected(false)
                }}>
                    <option value="Colleges" disabled >Colleges</option>
                    {data && data.colleges.map(college => {
                        return <option key={college.name} value={college.name}>{college.name}</option>
                    })}
                </select>
            </div>

            {!selectedCollege && <div className="not_selected">
                <h2>Select a collage</h2>
            </div>}

            {selectedCollege && < div className="body_content">
                {selectedCollegeData && selectedCollegeData.courses.length > 0 && <div className="course_list">
                    <h3>Fields</h3>
                    <ul id='field_items'>
                        {selectedCollegeData.courses.map(course => {
                            return <li key={course.title} onClick={() => listItemClick(course.title)}>{course.title}</li>
                        })}
                    </ul>
                </div>}

                <div className="course_card_container">
                    {!listItemSelected && <h3>Select a field</h3>}
                    {listItemSelected && coursesToBeShown && coursesToBeShown.course_list.length === 0 && <h3>No courses available</h3>}
                    {listItemSelected && coursesToBeShown && coursesToBeShown.course_list.length > 0 && coursesToBeShown.course_list.map(course => {
                        return <div className="card" key={course.name}>
                            <h3>{course.name}</h3>
                            <div>
                                <h4>Duration:</h4>
                                <p>{course.duration}</p>
                            </div>
                            <div>
                                <h4>Semester fees:</h4>
                                <p>{course.fees_per_semester}</p>
                            </div>
                            <div>
                                <button>Apply</button>
                            </div>
                        </div>
                    })}
                </div>

            </div>}

        </React.Fragment >
    )
}

export default Body