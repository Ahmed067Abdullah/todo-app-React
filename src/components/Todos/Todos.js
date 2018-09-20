import React from 'react';
import Todo from './Todo/Todo';
import './Todos.css';

const todos = (props) => {

    const todos = props.todos.map((todo,index) => {
            return( 
                <Todo 
                    key = {index}
                    todo = {todo}
                    edit = {() => props.editTodo(index)}
                    delete = {() => props.deleteTodo(index)}
                />)
        })
    return(
        <ol className="list-group todos">
            {todos}
        </ol>
    )
}

export default todos; 