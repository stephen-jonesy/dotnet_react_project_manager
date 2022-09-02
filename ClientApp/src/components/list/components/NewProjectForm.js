import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Button, OverlayTrigger, Tooltip, Toast} from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addProject,createPropjectById } from '../../../projects/projectsSlice.js';
import DatePicker from "react-datepicker";
import { Note } from './Note';
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuid } from 'uuid';
import moment from 'moment';
// import { Note } from '../../../common/Note';
import { GripVertical, Sticky, Trash, PencilSquare} from "react-bootstrap-icons";

export function NewProjectForm({ toggleShow }) {

    const dispatch = useDispatch();

    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const [name, setName] = useState('');
    const [priority, setPriority] = useState('None');
    const [status, setStatus] = useState('None');
    const [noteValue, setNote] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const projectPropObject = {
        name: 'New Project',
        note: '',
        id: null
    }
    
    moment().format();

    const changeNote = (newValue) => {
        setNote(newValue);
    }
    
	const addProjectButton = (e) => {
        e.preventDefault();        

        const createdAt = moment().format('YYYY/MM/DD').replaceAll("/","-");
        const unique_id = uuid();
        const small_id = unique_id.slice(0,8);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today  = new Date();
        const formatedDueDate = moment(dueDate).format('YYYY/MM/DD').replaceAll("/","-");
        console.log(createdAt);
        const projectObj = {
            name: name,
            IsComplete: false,
            createdAt: createdAt,
            dueDate: formatedDueDate,
            priority: priority,
            status: status,
            note: noteValue

        };

        dispatch(createPropjectById(projectObj));

        toggleShow();

    };           

    return (  
        <form className="" onSubmit={addProjectButton} >
            <div className="project-container new-project-container " >
                <div className="shadow-container"></div>

                <div className="project d-flex"  >

                    {/* Project Name column */}

                    <div className="col name-column">
                        <input 
                            placeholder="New Project"  
                            value={name}   
                            onChange={(e) => {setName(e.target.value)}} 
                            required
                            
                        />
                    </div>
                    <div className="devider"></div>

                    {/* Due column */}

                    <div className="due-column col-3 "> 
                        <DatePicker dateFormat="dd/MM/yyyy" selected={dueDate} onChange={(date) => setDueDate(date)} />
                    </div>
                    <div className="devider"></div>

                    {/* Priority column */}
                    <div className="col-2">
                        <OverlayTrigger 
                            trigger="click" 
                            placement="bottom" 
                            rootClose="true"
                            overlay={
                                <Tooltip id="overlay" >
                                    <Button id="priority-toggle-btn" onClick={() => setPriority('None')}>None</Button>
                                    <Button id="priority-toggle-btn" onClick={() => setPriority('Low')}>Low</Button>
                                    <Button id="priority-toggle-btn" onClick={() => setPriority('Medium')}>Medium</Button>
                                    <Button id="priority-toggle-btn" onClick={() => setPriority('High')}>High</Button>
                                </Tooltip>
                                
                            }
                        >
                            <Button className="priority-btn col-6 btn-secondary" style={{background: priority === "None" ? "#48484ecc" : priority === "Low" ? "#33CE71" : priority === "Medium" ? "#FA8035" : priority === "High" ? "#e01414cc" : "#FA8035" }}> {priority}</Button>
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
                                    <Button id="priority-toggle-btn" onClick={() => setStatus('None')}>None</Button>
                                    <Button id="priority-toggle-btn" onClick={() => setStatus('Done')}>Done</Button>
                                    <Button id="priority-toggle-btn" onClick={() => setStatus('Doing')}>Doing</Button>
                                    <Button id="priority-toggle-btn" onClick={() => setStatus('Stuck')}>Stuck</Button>
                                </Tooltip>
                                
                            }
                        >
                            <Button className="priority-btn col-6 btn-secondary" style={{background: status === "None" ? "#48484ecc" : status === "Done" ? "#33CE71" : status === "Doing" ? "#FA8035" : status === "Stuck" ? "#e01414cc" : "#FA8035" }}> {status}</Button>
                        </OverlayTrigger>
                    </div>
                    <div className="devider"></div>

                    {/* Notes column */}

                    {/* < Note isNewProject={true} project={null} /> */}
                    < Note isNewProject={true} project={projectPropObject} changeNote={changeNote} />


                    {/* submit column */}

                    <div className="col-1">
                        <Button className="create-btn" type="submit" value="Create" onClick={() => addProjectButton}>Create</Button>

                    </div>

                </div>

            </div>
        </form>
    );
};