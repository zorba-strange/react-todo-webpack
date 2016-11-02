const React = require('react');

export default class TodoItem extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            isEditing: false
        }
    }

    renderTaskSection(){
        const { task, isDone } = this.props;
        const taskStyle= {
            color: isDone ? 'green' : 'red',
            cursor: 'pointer'
        };
        if(this.state.isEditing){
            return(
                <td>
                    <form onSubmint={this.onSaveClick.bind(this)}>
                        <input type="text" defaultValue={task} ref='editInput' />
                    </form>
                </td>
            )
                
        }
        return(
                <td style={taskStyle} onClick={this.props.toggleTask.bind(this, task)}>{task}</td>
        )
    };

    renderActionSection() {
        if( this.state.isEditing ){
            return(
                <td>
                    <button onClick={this.onSaveClick.bind(this)}>Save</button>
                    <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
                </td>
            )
        } else {
            return (

                <td>
                    <button onClick={this.onEditClick.bind(this)}>Edit</button>
                    <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
                </td>
            )
        };
    };


    render() {
        return (
            <tr>
                {this.renderTaskSection()}
                {this.renderActionSection()}
            </tr>
        )
    }

    onEditClick() {
        this.setState({ isEditing: true });
    }

    onCancelClick() {
        this.setState({ isEditing: false });
    }

    onSaveClick(e){
        e.preventDefault
        const oldTask = this.props.task;
        const newTask = this.refs.editInput.value;
        this.props.saveTask(oldTask, newTask);
        this.setState({ isDone: false, isEditing: false });
    }
    
}
