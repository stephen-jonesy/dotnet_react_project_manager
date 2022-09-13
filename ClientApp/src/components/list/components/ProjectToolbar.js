import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateDueDate, sortProjects } from '../../../projects/projectsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

export function ProjectToolbar() {
    const chevron = <FontAwesomeIcon icon={faChevronUp} size="sm" />;
    const dispatch = useDispatch();
    const [SortType, setSortType] = useState('');

    const sortHandler = (e) => {
        setSortType(e.target.value);
        const payload = e.target.value;
        dispatch(sortProjects(payload));

    };

    return (  
        <ul className="project-toolbar ">
            <li className="d-flex mt-5 mb-4 ">
                <div className="col-1">
                    <button value="isComplete" onClick={(e) => sortHandler(e)} style={SortType === "isComplete" ? {opacity: '0.6'} : {opacity: '1'}}>
                        Complete {chevron}
                    </button>
                    
                </div>
                <div className="col-2">
                    <button value="name" onClick={(e) => sortHandler(e)} style={SortType === "name" ? {opacity: '0.6'} : {opacity: '1'}}>
                        Projects {chevron}
                    </button>
                </div>
                <div className="col-3">
                    <button value="dueDate" onClick={(e) => sortHandler(e)} style={SortType === "dueDate" ? {opacity: '0.6'} : {opacity: '1'}}>
                        Due {chevron}
                    </button>
                </div>
                <div className="col-2">
                    <button value="Priority" onClick={(e) => sortHandler(e)} style={SortType === "Priority" ? {opacity: '0.6'} : {opacity: '1'}}>
                        Priority {chevron}
                    </button>
                </div>
                <div className="col-2">
                    <button value="Status" onClick={(e) => sortHandler(e)} style={SortType === "Status" ? {opacity: '0.6'} : {opacity: '1'}}>
                        Status {chevron}
                    </button>
                </div>
                <div className="col-1">
                    <button value="Notes" onClick={(e) => sortHandler(e)} style={SortType === "Notes" ? {opacity: '0.6'} : {opacity: '1'}}>
                        Notes {chevron}
                    </button>
                </div>
                <div className="col-1"></div>

            </li>
        </ul>
    );
};

