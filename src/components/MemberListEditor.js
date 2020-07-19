import React from 'react';
import { default as usersData } from './members.json';
import UserItem from './UserItem';

class MemberListEditor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: usersData,
            usersSelected: [],
            usersAssigned: [],
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
        this.setState({editMode: false, usersSelected: [], usersAssigned: []});
    }

    handleSave(){
        this.setState({editMode: false});
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

    addUsers(){
        this.setState((prevState)=>{
            return {
                usersAssigned: prevState.usersAssigned.concat(prevState.usersSelected)
            }
        })
    }

    render(){
        const listUsers = () => {
            const userItems = this.state.users.map((user)=>{
                return <UserItem key={user["_id"]} user={user} onSelectUpdate={this.onSelectUpdate.bind(this)} />
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
                {this.state.editMode && <button onClick={this.addUsers.bind(this)}>ADD</button>}
            </div>
        );
    }
}

export default MemberListEditor;