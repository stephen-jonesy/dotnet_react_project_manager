import {  createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { projects } from './projectsAPI';
import authService from '../components/api-authorization/AuthorizeService';

const initialState = {
    status: 'idle',
    projects: [],
    error: null,
  
  }

export const fetchUserById = createAsyncThunk(
    'todoitems',
    async () => {

        const token = await authService.getAccessToken();
        const user = await authService.getUser();
        console.log(user.sub);
        const response = await fetch(`todoitems/${user.sub}`, {
          headers: !token ? {} : { 
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log(data);
        return data

    }
)

export const deletePropjectById = createAsyncThunk(
    'todoitems/delete',
    async (id) => {
        const user = await authService.getUser();
        console.log(user.sub);
        const response = await fetch(`todoitems/${id}`, { method: 'DELETE' })
        const data = await response.json();
        console.log(data);
        return data;

    }
)

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action) => {
            
            const {name, id, dueDate, priority, status, createdAt, note} = action.payload;

            const project = {
				id: id,
                name: name,
                createdAt: createdAt,
                isComplete: false,
                dueDate: dueDate,
                priority: priority,
                status: status,
                note: note 
			};

			state.push(project);

        },

        removeProject: (state, action) => {
            console.log(current(state.projects))
            const filterProjects = state.projects.filter((project) => project.id !== action.payload);
            state.projects = filterProjects;
        },

        toggleCompleted: (state, action) => {
            return state.map((project) =>
                project.id === action.payload ? {...project, isComplete: !project.isComplete} : project);

        },

        togglePriority: (state, action) => {
            const [id, priority] = action.payload;

            return state.map((project) =>
                project.id === id ? {...project, priority: priority} : project);

        },

        toggleStatus: (state, action) => {
            const [id, status] = action.payload;

            return state.map((project) =>
                project.id === id ? {...project, status: status} : project);

        },

        updateProjectName: (state,action) => {
            const [id, projectName] = action.payload;


            return state.map((project) =>
                project.id === id ? {...project, projectName: projectName} : project);
        },

        updateCreatedDate: (state, action) => {
            const [id, createdAt] = action.payload;
            return state.map((project) =>
            project.id === id ? {...project, createdAt: createdAt} : project);
        },

        updateDueDate: (state, action) => {
            const [id, dueDate] = action.payload;
            return state.map((project) =>
            project.id === id ? {...project, dueDate: dueDate} : project);
        },

        updateNote: (state, action) => {
            const [id, note] = action.payload;

            return state.map((project) =>
            project.id === id ? {...project, note: note} : project);

        },

        calculateTimelinePercentage: (state) => {

            let arr = [];
        
            state.forEach((item, index) => {
                item.timeline = 0;
                const createdAt = new Date(item.createdAt);
                const dueDate = new Date(item.dueDate);
            
                const start = createdAt;
                const end = dueDate;
                const today = new Date();
            
                const q = Math.abs(today-start);
                const d = Math.abs(end-start);
        
                if(start > today) {
                    let rounded = 0;
                    arr.push(rounded);
        
                } else if (today > end) {
                    let rounded = 100;
                    arr.push(rounded);
            
                } else {
                    let rounded = Math.round((q/d)*100);
                    arr.push(rounded);
        
                    
                }
                item.timeline = arr[index];
        
            });
            return state;

        },


        sortProjects: (state, action) => {

            const sortType = action.payload;

            if(sortType === 'dueDate') {
                const sorted = [...state].sort(function(a, b) {
                    var dateA = new Date(a.dueDate), dateB = new Date(b.dueDate);
                    return dateA - dateB;
                });
        
                return sorted;

            } 
            if(sortType === 'Priority') {
                const sorted = [...state].sort((a, b) => {
                    const sorter = {
                      "None": 0,
                      "Low": 1,
                      "Medium": 2,
                      "High": 3,
                    }
                    return sorter[b.priority] - sorter[a.priority]
                });
    
    
                return sorted;

            } 
            if(sortType === 'Notes') {
                const sorted = [...state].sort((a, b) => {
                    return b.note.length - a.note.length;

                });
    
    
                return sorted;

            } 
            if(sortType === 'timeline') {
                const sorted = [...state].sort((a, b) => {
                    return b.timeline - a.timeline;
                });    
    
                return sorted;

            } 
            
            else {
                const sorted = [...state].sort(function(a, b){
                    if(a[sortType] < b[sortType]) { return -1; }
                    if(a[sortType] > b[sortType]) { return 1; }
                    return 0;
                });
    
                return sorted;

            }
            
        },

    },
    extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.pending, (state, action) => {
        // Add user to the state array
        state.status = 'loading';

    })
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
        // Add user to the state array
        state.status = 'loading';
        state.status = 'idle';
        state.projects = action.payload
        return state;

    })
    .addCase(fetchUserById.rejected, (state, action) => {
        return (state = {
            ...state,
            status: "failed",
          });

      })
      .addCase(deletePropjectById.fulfilled, (state, action) => {
          console.log(action.payload);
          
        return state;

      })
      .addCase(deletePropjectById.rejected, (state, action) => {
        return state;

      })
      
    }
});

export const { addProject, removeProject, toggleCompleted, togglePriority, toggleStatus, updateProjectName, updateCreatedDate, updateDueDate, updateNote, calculateTimelinePercentage, sortProjects } = projectsSlice.actions;

export default projectsSlice.reducer;


