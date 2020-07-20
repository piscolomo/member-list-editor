import React, { Component } from 'react';
import { default as usersData } from './members.json';
import UserItem from './UserItem';
import UserListAvailable from './UserListAvailable';
import UserListAssigned from './UserListAssigned';
import MemberList from './MemberList';
import User from "../User";

type State = Readonly<{
    availableUsers: User[],
    filtered: User[],
    usersSelected: User[],
    usersAssigned: User[],
    usersAssignedSelected: User[],
    editMode: boolean,
    isAllAvailableUsersSelected: boolean,
    isAllAssignedUsersSelected: boolean,
    valueSearch: string
}>

class MemberListEditor extends Component<{}, State>{
    state: State = {
        availableUsers: usersData,
        filtered: [],
        usersSelected: [],
        usersAssigned: [],
        usersAssignedSelected: [],
        editMode: false,
        isAllAvailableUsersSelected: false,
        isAllAssignedUsersSelected: false,
        valueSearch: ""
    }

    handleEdit(){
        this.setState({editMode: true});
    }

    handleDone(){
        this.setState({editMode: false, usersSelected: [], isAllAvailableUsersSelected: false, isAllAssignedUsersSelected: false});
    }

    onSelectUpdate(user: User){
        const isUserSelected = this.state.usersSelected.includes(user);
        if (isUserSelected){
            this.setState((prevState)=>{
                return {
                    usersSelected: prevState.usersSelected.filter(userSelected => userSelected["_id"] != user["_id"])
                }
            })
        }else{
            this.setState((prevState)=>{
                return {
                    usersSelected: prevState.usersSelected.concat(user)
                }
            })
        }
    }

    onSelectAssignedUpdate(user: User){
        const isUserSelected = this.state.usersAssignedSelected.includes(user);
        if (isUserSelected){
            this.setState((prevState)=>{
                return {
                    usersAssignedSelected: prevState.usersAssignedSelected.filter(userSelected => userSelected["_id"] != user["_id"])
                }
            })
        }else{
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
                filtered: [],
                usersSelected: [],
                usersAssigned: prevState.usersAssigned.concat(prevState.usersSelected),
                isAllAvailableUsersSelected: false,
                valueSearch: ""
            }
        });
    }
    
    removeUsers(){
        this.setState((prevState)=>{
            const updatedAssignedUsers = prevState.usersAssigned.filter(assignedUser => !prevState.usersAssignedSelected.includes(assignedUser));
            return {
                availableUsers: prevState.availableUsers.concat(prevState.usersAssignedSelected),
                usersAssignedSelected: [],
                usersAssigned: updatedAssignedUsers,
                isAllAssignedUsersSelected: false
            }
        })
    }

    onChangeListCheckbox(){
        this.setState((prevState)=>({
                isAllAvailableUsersSelected: !prevState.isAllAvailableUsersSelected,
                usersSelected: prevState.isAllAvailableUsersSelected ? [] : prevState.availableUsers
            }));
    }

    onChangeAssignedListCheckbox(){
        this.setState((prevState)=>({
                isAllAssignedUsersSelected: !prevState.isAllAssignedUsersSelected,
                usersAssignedSelected: prevState.isAllAssignedUsersSelected ? [] : prevState.usersAssigned
            }));
    }

    searchUsers(e: any) {
        this.setState({valueSearch: e.target.value});
        if (e.target.value === ""){
            this.setState({filtered: []});
        }else{
            const target = e.target.value.toLowerCase();
            this.setState((prevState)=>({
                filtered: prevState.availableUsers.filter(user =>{
                    return `${user.firstName} ${user.lastName}`.toLowerCase().includes(target)
                })
            }));
        }
    }

    render(){
        return (
            <div id="member-list-component">
                <div className="header">
                    <span>Team Members</span>
                    {!this.state.editMode && this.state.usersAssigned.length > 0 && <span className="count">{this.state.usersAssigned.length}</span>}
                    {!this.state.editMode && <button onClick={this.handleEdit.bind(this)}>EDIT</button>}
                    {this.state.editMode && <button onClick={this.handleDone.bind(this)}>DONE</button>}
                </div>
                {!this.state.editMode && <MemberList users={this.state.usersAssigned} />}
                {this.state.editMode &&
                    <div id="container">
                        <UserListAvailable users={this.state.valueSearch.length > 0 ? this.state.filtered: this.state.availableUsers} 
                            selectedUsers={this.state.usersSelected} 
                            selectAllUsers={this.state.isAllAvailableUsersSelected}
                            onSelectUpdate={this.onSelectUpdate.bind(this)} 
                            addUsers={this.addUsers.bind(this)} 
                            onChangeListCheckbox={this.onChangeListCheckbox.bind(this)}
                            onSearch={this.searchUsers.bind(this)}
                            valueSearch={this.state.valueSearch}
                            />

                        <UserListAssigned users={this.state.usersAssigned} 
                            selectedUsers={this.state.usersAssignedSelected} 
                            selectAllUsers={this.state.isAllAssignedUsersSelected}
                            onSelectUpdate={this.onSelectAssignedUpdate.bind(this)} 
                            removeUsers={this.removeUsers.bind(this)} 
                            onChangeListCheckbox={this.onChangeAssignedListCheckbox.bind(this)}/>
                    </div>
                }
            </div>
        );
    }
}

export default MemberListEditor;