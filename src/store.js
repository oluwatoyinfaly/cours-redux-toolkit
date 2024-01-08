import { createSlice, configureStore } from "@reduxjs/toolkit"


const todoSlice = createSlice({
    name: 'todos',
    initialState: [
        { id: 1, text: 'Learn React', done: true },
        { id: 2, text: 'Learn Redux', done: false },
        { id: 3, text: 'Learn Redux-ToolKit', done: false }
    ],
    reducers: {
        addTodo: (state, action) => {
            //{type: 'todos/addTodo', payload: 'New Todo'}
            const newTodo = {
                id: Date.now(),
                text: action.payload,
                done: false
            }
            state.push(newTodo)
        },
        toggleComplete: (state, action) => {
            // {type: 'todos/toggleComplete', payload: 123}
            //const index = state.findIndex(todo => todo.id === action.payload)
            //state[index].done = !state[index].completed
            const todo = state.find(todo => todo.id === action.payload)
            todo.done = !todo.done
        },
        deleteTodo: (state, action) => {
            // {type: 'todos/deleteTodo', payload: 123}
            return state.filter(todo => todo.id !== action.payload)
        },
        editTodo: (state, action) => {
            // {type: 'todos/editTodo', payload: {id: 123, text: 'New Text'}}
            const todo = state.find(todo => todo.id === action.payload.id)
            todo.text = action.payload.text
        }
    }
});

export const store = configureStore({
    reducer: {
        todo: todoSlice.reducer
    }
})

export const { addTodo, toggleComplete, deleteTodo, editTodo } = todoSlice.actions