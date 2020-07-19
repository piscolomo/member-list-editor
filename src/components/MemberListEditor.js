import React from 'react';
import { default as usersData } from './members.json';
import UserItem from './UserItem';
import UserListAvailable from './UserListAvailable';

class MemberListEditor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            availableUsers: usersData,
            usersSelected: [],
            usersAssigned: [],
            usersAssignedSelected: [],
            editMode: false,
        };
    }

    handleEdit(){
        this.setState({editMode: true});
    }

    handleDone(){
        this.setState({editMode: false, usersSelected: []});
    }

    onSelectUpdate(user){
        const isUserSelected = this.state.usersSelected.includes(user);
        if (isUserSelected){
            console.log("Unselecting user...");
            this.setState((prevState)=>{
                return {
                    usersSelected: prevState.usersSelected.filter(userSelected => userSelected["_id"] != user["_id"])
                }
            })
        }else{
            console.log("Selecting user...");
            this.setState((prevState)=>{
                return {
                    usersSelected: prevState.usersSelected.concat(user)
                }
            })
        }
    }

    onSelectAssignedUpdate(user){
        const isUserSelected = this.state.usersAssignedSelected.includes(user);
        if (isUserSelected){
            console.log("Unselecting user...");
            this.setState((prevState)=>{
                return {
                    usersAssignedSelected: prevState.usersAssignedSelected.filter(userSelected => userSelected["_id"] != user["_id"])
                }
            })
        }else{
            console.log("Selecting user...");
            this.setState((prevState)=>{
                return {
                    usersAssignedSelected: prevState.usersAssignedSelected.concat(user)
                }
            })
        }
    }

    addUsers(){
        this.setState((prevState)=>{
            const updatedAvailableUsers = prevState.availableUsers.filter(availableUser => !prevState.usersSelected.includes(availableUser));
            return {
                availableUsers: updatedAvailableUsers,
                usersSelected: [],
                usersAssigned: prevState.usersAssigned.concat(prevState.usersSelected),
            }
        })
    }
    
    removeUsers(){
        this.setState((prevState)=>{
            const updatedAssignedUsers = prevState.usersAssigned.filter(assignedUser => !prevState.usersAssignedSelected.includes(assignedUser));
            return {
                availableUsers: prevState.availableUsers.concat(prevState.usersAssignedSelected),
                usersAssignedSelected: [],
                usersAssigned: updatedAssignedUsers
            }
        })
    }

    render(){
        const listAssignedUsers = () => {
            const userItems = this.state.usersAssigned.map((user)=>{
                return <UserItem key={user["_id"]} user={user} active={this.state.usersAssignedSelected.includes(user)} onSelectUpdate={this.onSelectAssignedUpdate.bind(this)} />
            });

            return (<div>
                <span>{this.state.usersAssigned.length} Users Assigned</span>
                <ul id="users-assigned">{userItems}</ul>
                <button onClick={this.removeUsers.bind(this)}>REMOVE</button>
                </div>);
        }

        const memberList = () => {
            const list = this.state.usersAssigned.map((user)=>{
                return <li key={user["_id"]}>{user.firstName} {user.lastName}</li>
            });
            if (this.state.usersAssigned.length > 0){
                return <ul>{list}</ul>
            }else{
                return <p>No users in this list</p>
            }
        }
        return (
            <div id="member-list-component">
                <div className="header">
                    <span>Team Members</span>
                    {this.state.usersAssigned.length > 0 && <span className="count">{this.state.usersAssigned.length}</span>}
                    {!this.state.editMode && <button onClick={this.handleEdit.bind(this)}>EDIT</button>}
                    {this.state.editMode && <button onClick={this.handleDone.bind(this)}>DONE</button>}
                </div>
                {!this.state.editMode && memberList()}
                <div id="container">
                    {this.state.editMode && <UserListAvailable users={this.state.availableUsers} selectedUsers={this.state.usersSelected} onSelectUpdate={this.onSelectUpdate.bind(this)} addUsers={this.addUsers.bind(this)} />}
                    {this.state.editMode && listAssignedUsers()}
                </div>
            </div>
        );
    }
}

export default MemberListEditor;