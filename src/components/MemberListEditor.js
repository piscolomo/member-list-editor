import React from 'react';
import { default as usersData } from './members.json';

class MemberListEditor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: usersData,
            editMode: false,
        };
    }

    componentDidMount(){
        //console.log(usersData);
    }

    handleEdit(){
        this.setState({editMode: true});
    }

    handleCancel(){
        this.setState({editMode: false});
    }

    handleSave(){
        this.setState({editMode: false});
    }

    render(){
        const listUsers = () => {
            const userItems = this.state.users.map((user)=>{
                return <li key={user["_id"]}>{user.firstName} {user.lastName}</li>
            });

            return <ul id="users-available">{userItems}</ul>;
        }
        return (
            <div>
                <h1>Team Members</h1>
                {!this.state.editMode && <button onClick={this.handleEdit.bind(this)}>EDIT</button>}
                {this.state.editMode && <button onClick={this.handleCancel.bind(this)}>CANCEL</button>}
                {this.state.editMode && <button onClick={this.handleSave.bind(this)}>SAVE</button>}
                {!this.state.editMode && <p>No users in this list</p>}
                {this.state.editMode && listUsers()}
            </div>
        );
    }
}

export default MemberListEditor;