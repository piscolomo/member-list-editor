import React, { Component } from 'react';
import UserListAvailable from './UserListAvailable';
import UserListAssigned from './UserListAssigned';
import MemberList from './MemberList';
import User from "../User";

type Props = Readonly<{
    users: User[];
}>

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

class MemberListEditor extends Component<Props, State>{
    state: State = {
        availableUsers: this.props.users,
        filtered: [],
        usersSelected: [],
        usersAssigned: [],
        usersAssignedSelected: [],
        editMode: false,
        isAllAvailableUsersSelected: false,
        isAllAssignedUsersSelected: false,
        valueSearch: ""
    }

    handleEdit(): void{
        this.setState({editMode: true});
    }

    handleDone(): void{
        this.setState({editMode: false, usersSelected: [], isAllAvailableUsersSelected: false, isAllAssignedUsersSelected: false});
    }

    onSelectUpdate(user: User): void{
        const isUserSelected = this.state.usersSelected.includes(user);
        if (isUserSelected){
            this.setState((prevState)=>{
                return {
                    usersSelected: prevState.usersSelected.filter((userSelected: User) => userSelected["_id"] !== user["_id"])
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

    onSelectAssignedUpdate(user: User): void{
        const isUserSelected = this.state.usersAssignedSelected.includes(user);
        if (isUserSelected){
            this.setState((prevState)=>{
                return {
                    usersAssignedSelected: prevState.usersAssignedSelected.filter((userSelected: User) => userSelected["_id"] !== user["_id"])
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

    addUsers(): void{
        this.setState((prevState)=>{
            const updatedAvailableUsers = prevState.availableUsers.filter((availableUser: User) => !prevState.usersSelected.includes(availableUser));
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
    
    removeUsers(): void{
        this.setState((prevState)=>{
            const updatedAssignedUsers = prevState.usersAssigned.filter((assignedUser: User) => !prevState.usersAssignedSelected.includes(assignedUser));
            return {
                availableUsers: prevState.availableUsers.concat(prevState.usersAssignedSelected),
                usersAssignedSelected: [],
                usersAssigned: updatedAssignedUsers,
                isAllAssignedUsersSelected: false
            }
        })
    }

    onChangeListCheckbox(): void{
        this.setState((prevState)=>({
                isAllAvailableUsersSelected: !prevState.isAllAvailableUsersSelected,
                usersSelected: prevState.isAllAvailableUsersSelected ? [] : prevState.availableUsers
            }));
    }

    onChangeAssignedListCheckbox(): void{
        this.setState((prevState)=>({
                isAllAssignedUsersSelected: !prevState.isAllAssignedUsersSelected,
                usersAssignedSelected: prevState.isAllAssignedUsersSelected ? [] : prevState.usersAssigned
            }));
    }

    searchUsers(e: React.ChangeEvent<HTMLInputElement>): void{
        this.setState({valueSearch: e.target.value});
        if (e.target.value === ""){
            this.setState({filtered: []});
        }else{
            const target = e.target.value.toLowerCase();
            this.setState((prevState)=>({
                filtered: prevState.availableUsers.filter((user: User) =>{
                    return `${user.firstName} ${user.lastName}`.toLowerCase().includes(target)
                })
            }));
        }
    }

    render(): JSX.Element{
        const { editMode, usersSelected, usersAssigned, availableUsers, usersAssignedSelected, isAllAvailableUsersSelected, isAllAssignedUsersSelected, filtered, valueSearch  } = this.state;
        return (
            <div id="member-list-component">
                <div className="header">
                    <span>Team Members</span>
                    {!editMode && usersAssigned.length > 0 && <span className="count">{usersAssigned.length}</span>}
                    {!editMode && <button className="edit-button" onClick={this.handleEdit.bind(this)}>EDIT</button>}
                    {editMode && <button className="done-button" onClick={this.handleDone.bind(this)}>DONE</button>}
                </div>
                {!editMode && <MemberList users={usersAssigned} />}
                {editMode &&
                    <div id="container">
                        <UserListAvailable users={valueSearch.length > 0 ? filtered: availableUsers} 
                            selectedUsers={usersSelected} 
                            selectAllUsers={isAllAvailableUsersSelected}
                            onSelectUpdate={this.onSelectUpdate.bind(this)} 
                            addUsers={this.addUsers.bind(this)} 
                            onChangeListCheckbox={this.onChangeListCheckbox.bind(this)}
                            onSearch={this.searchUsers.bind(this)}
                            valueSearch={valueSearch}
                            />

                        <UserListAssigned users={usersAssigned} 
                            selectedUsers={usersAssignedSelected} 
                            selectAllUsers={isAllAssignedUsersSelected}
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