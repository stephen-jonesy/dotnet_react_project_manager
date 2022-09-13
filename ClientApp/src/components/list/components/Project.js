import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProject, toggleCompleted, togglePriority, toggleStatus, updateProjectName, updateNote, updateCreatedDate, updateDueDate, deletePropjectById, updatePropjectById } from '../../../projects/projectsSlice';
import { Calendar } from './Calendar';
import { Note } from './Note';
import {Button, OverlayTrigger, Overlay, Tooltip, Toast} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faGrip } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { GripVertical, Sticky, Trash, PencilSquare} from "react-bootstrap-icons";

export function Project({ id, projectList }) {
    const project = () => {
        return projectList.find((project) => project.id === id);
    };
    console.log(project());
    const {Id, name, dueDate, isComplete, createdAt, note, priority, status} = project();
    
    const dispatch = useDispatch();
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const [showNameInput, setShowNameInput] = useState(false);
    const toggleShowNameInput = () => setShowNameInput(!showNameInput);
    const [projectNameValue, setName] = useState(name);
    const [noteValue, setNote] = useState(note);
    const [startDate, setStartDate] = useState(new Date());
    const checkIcon = <FontAwesomeIcon icon={faCheck} />
    const gripIcon = <FontAwesomeIcon icon={faGrip} />
    const projectPropObject = {
        name: name,
        note: note,
        id: id
    }
    const projectObj = {
        Id: id,
        name: name,
        IsComplete: isComplete,
        createdAt: createdAt,
        dueDate: dueDate,
        priority: priority,
        status: status,
        note: note

    };
    
    const eventHandler = (e) => {

        if (e.id === "completed-btn") {
            console.log(projectObj);
            projectObj.IsComplete = !isComplete;
            dispatch(toggleCompleted(id));  
            dispatch(updatePropjectById(projectObj));  

        };

        if (e.id === "delete-btn") {
            dispatch(deletePropjectById(id));

        };

        if (e.id === "priority-toggle-btn") {
            projectObj.priority = e.innerText;
            dispatch(togglePriority([id, e.innerText]));
            dispatch(updatePropjectById(projectObj));  

        };
        if (e.id === "status-toggle-btn") {
            projectObj.status = e.innerText;
            dispatch(toggleStatus([id, e.innerText]));
            dispatch(updatePropjectById(projectObj));  

        };

    };

    const formSubmit = (e) => {
        e.preventDefault();     

        if (e.target.id === "project-name-submit") {
            projectObj.name = projectNameValue;
            dispatch(updateProjectName([id, projectNameValue]));
            toggleShowNameInput();
            dispatch(updatePropjectById(projectObj));  

        }
        
    }

    const updateCreatedAt = (date) => {
        setStartDate(date);
        const formatedDueDate = moment(date).format('YYYY/MM/DD');
        dispatch(updateCreatedDate([id, formatedDueDate]));

    }

    const updateDue = (date) => {
        setStartDate(date);
        const formatedDueDate = moment(date).format('YYYY/MM/DD').replaceAll("/","-");
        projectObj.dueDate = formatedDueDate;

        dispatch(updateDueDate([id, formatedDueDate]));
        dispatch(updatePropjectById(projectObj));  

    }

    const showNameInputFunct = () => {
        var strFirstThree = projectNameValue.substring(0,15);

        if (!showNameInput) {
            return <div className="col" >{strFirstThree}<div className="pencil-icon" onClick={toggleShowNameInput}>< PencilSquare /></div></div>;
        } else {
            return <form id="project-name-submit"type="submit" onSubmit={formSubmit} ><input className="project-name-input" value={projectNameValue} required onChange={(e) => {setName(e.target.value)}}></input></form>
        }
        
    }

    return (  

        <div className="project-container" style={isComplete ? {opacity: '0.6'} : {opacity: '1'}}>
            <div className="shadow-container"></div>

            <li className="project d-flex"  >

                {/* Completed column */}

                <div className="completed-btn-container col-1">
                    <button id="completed-btn" className="completed-btn btn btn-primary" onClick={(e) => eventHandler(e.target)}>{checkIcon}</button>
                </div>

                <div className="devider"></div>


                {/* Project Name column */}

                <div className="col-2 name-column">{showNameInputFunct()}</div>
                <div className="devider"></div>

                {/* Due column */}

                <div className="due-column col-3 "> <Calendar databaseDate={dueDate} updateDate={updateDue}/></div>
                <div className="devider"></div>

                {/* Priority column */}
                <div className="col-2">
                    <OverlayTrigger 
                        trigger="click" 
                        placement="bottom" 
                        rootClose="true"
                        overlay={
                            <Tooltip id="overlay" >
                                <Button id="priority-toggle-btn" style={{background: "#48484ecc"}} onClick={(e) => eventHandler(e.target)}>None</Button>
                                <Button id="priority-toggle-btn" style={{background: "#33CE71"}} onClick={(e) => eventHandler(e.target)}>Low</Button>
                                <Button id="priority-toggle-btn" style={{background: "#FA8035"}} onClick={(e) => eventHandler(e.target)}>Medium</Button>
                                <Button id="priority-toggle-btn" style={{background: "#e01414cc"}} onClick={(e) => eventHandler(e.target)}>High</Button>

                            </Tooltip>
                            
                        }
                    >
                        <button className="priority-btn col-6 btn-secondary" style={{background: priority === "None" ? "#48484ecc" : priority === "Low" ? "#33CE71" : priority === "Medium" ? "#FA8035" : priority === "High" ? "#e01414cc" : "#48484ecc" }}> {priority}</button>
                    </OverlayTrigger>
                </div>
                <div className="devider"></div>

                {/* Status column */}

                <div className="col-2">
                    <OverlayTrigger 
                        trigger="click" 
                        placement="bottom" 
                        rootClose="true"
                        overlay={
                            <Tooltip id="overlay" >
                                <Button id="status-toggle-btn" style={{background: "#48484ecc"}} onClick={(e) => eventHandler(e.target)}>None</Button>
                                <Button id="status-toggle-btn" style={{background: "#e01414cc"}} onClick={(e) => eventHandler(e.target)}>Stuck</Button>
                                <Button id="status-toggle-btn" style={{background: "#FA8035"}} onClick={(e) => eventHandler(e.target)}>Doing</Button>
                                <Button id="status-toggle-btn" style={{background: "#33CE71"}} onClick={(e) => eventHandler(e.target)}>Done</Button>
                            </Tooltip>
                            
                        }
                    >
                        <button className="priority-btn col-6 btn-secondary" style={{background: status === "None" ? "#48484ecc" : status === "Done" ? "#33CE71" : status === "Doing" ? "#FA8035" : status === "Stuck" ? "#e01414cc" : "#FA8035" }}> {status}</button>
                    </OverlayTrigger>
                </div>
                <div className="devider"></div>

                {/* Notes column */}

                < Note isNewProject={false} project={projectObj} />

                <div className="devider"></div>

                {/* Delete column */}

                <div className="col">
                    <button id="delete-btn" className="btn" onClick={(e) => eventHandler(e.target)}>
                        <Trash width="22" height="22" color="#48484e99"/>
                    </button>
                </div>

            </li>

            <div className="grab-icon">< GripVertical  /></div>

        </div>

    );
};
