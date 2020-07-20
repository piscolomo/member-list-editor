import React from 'react';
import { default as usersData } from './members.json';
import UserItem from './UserItem';
import UserListAvailable from './UserListAvailable';
import UserListAssigned from './UserListAssigned';

class MemberListEditor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            availableUsers: usersData,
            filtered: [],
            usersSelected: [],
            usersAssigned: [],
            usersAssignedSelected: [],
            editMode: false,
            isAllAvailableUsersSelected: false,
            isAllAssignedUsersSelected: false
        };
    }

    setSearchInputRef(input) {
        this.searchInput = input;
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
                filtered: [],
                usersSelected: [],
                usersAssigned: prevState.usersAssigned.concat(prevState.usersSelected),
                isAllAvailableUsersSelected: false
            }
        });
        this.searchInput.value = "";
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

    searchUsers(e) {
        if (e.target.value === ""){
            this.setState((prevState)=>({
                filtered: []
            }));
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
        const memberList = () => {
            const list = this.state.usersAssigned.map((user)=>{
                return <li key={user["_id"]}>
                    <span className="user-name">{user.firstName} {user.lastName}</span>
                    <span className="user-email">{user.email}</span>
                </li>
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
                {this.state.editMode &&
                    <div id="container">
                        <UserListAvailable users={this.state.filtered.length > 0 ? this.state.filtered: this.state.availableUsers} 
                            selectedUsers={this.state.usersSelected} 
                            selectAllUsers={this.state.isAllAvailableUsersSelected}
                            onSelectUpdate={this.onSelectUpdate.bind(this)} 
                            addUsers={this.addUsers.bind(this)} 
                            onChangeListCheckbox={this.onChangeListCheckbox.bind(this)}
                            onSearch={this.searchUsers.bind(this)}
                            setRef={this.setSearchInputRef.bind(this)}
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