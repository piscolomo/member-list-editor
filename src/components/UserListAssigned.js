import React from 'react';
import UserItem from './UserItem';

class UserListAssigned extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { users, selectedUsers, onSelectUpdate, removeUsers } = this.props;
        
        const userItems = users.map((user)=>{
            return <UserItem key={user["_id"]} user={user} active={selectedUsers.includes(user)} onSelectUpdate={onSelectUpdate} />
        });

        return (<div>
            <span>{users.length} Users Assigned</span>
            <ul id="users-assigned">{userItems}</ul>
            <button onClick={removeUsers}>REMOVE</button>
        </div>);
    }
}

export default UserListAssigned;