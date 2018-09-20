import React , {Component} from 'react';
import Todos from '../../components/Todos/Todos';
import Input from '../../components/Input/Input';
import './Layout.css';

class Layout extends Component{
    constructor(){
        super();
        this.state = {
            input : '',
            todos : [],
            editing : false
        }
        this.editingIndex = null;
    }

    changeInputHandler = (input) => {
        this.setState({ input });
    } 

    saveTodoHandler = () => {
        const input = this.state.input;
        if(input !== ''){
            const todos = this.state.todos.slice();
            if(this.editingIndex !== null){
                todos[this.editingIndex] = input;
                this.setState({editing : false});
                this.editingIndex = null;
            }
            else{
                todos.push(input);
            }
            this.setState({
                todos,
                input : ''
            });
        }
    }

    deleteTodoHandler = (index) => {
        const todos = this.state.todos.slice();
        todos.splice(index,1);
        this.setState({ todos });
        if(index === this.editingIndex){
            this.editingIndex = null;
            this.setState ({
                input : '',
                editing : false});
        }
        index < this.editingIndex ? this.editingIndex-- : null;
    }

    deleteAllTodosHandler = () => {
        this.setState({ 
            todos : [],
            editing : false
        });
        this.editingIndex = null
    }

    editTodoHandler = (index) => {
        const todo = this.state.todos[index];
        this.setState({
            input : todo,
            editing : true
        });
        this.editingIndex = index;
    }
    
    render (){
        let btnValue = "Add";
        let btnClass = "primary";
        if(this.state.editing){
            btnValue = "Update";
            btnClass = "warning";
        }
        btnClass = "btn btn-"+btnClass;
        
        let deleteAllButton = null;
        if(this.state.todos.length > 1){
            deleteAllButton = 
            <Input 
                type= "button" 
                onClick={this.deleteAllTodosHandler} 
                value = "Delete All" 
                className="btn btn-danger"/>
        }

        return (
            <div className = "main-div">
                <h1 className="display-4 heading">Todo App</h1>
                <Input 
                    type = "text" 
                    value ={this.state.input} 
                    className="form-control input-field"
                    onChange ={(event) => this.changeInputHandler(event.target.value)} />

                <Input 
                    type= "button" 
                    onClick={this.saveTodoHandler} 
                    value = {btnValue} 
                    className={btnClass}/>

                {deleteAllButton}
                
                {this.state.todos.length > 0 ? <Todos
                    todos = {this.state.todos}
                    editTodo = {this.editTodoHandler}
                    deleteTodo = {this.deleteTodoHandler}/> : <p className = "no-todo-msg">No Recent Todos</p>}
            </div>
        )
    }
}

export default Layout;