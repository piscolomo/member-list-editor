import React from 'react';
import UserItem from './UserItem';

class UserListAvailable extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { users, selectedUsers, onSelectUpdate, addUsers } = this.props;
        
        const userItems = users.map((user)=>{
            return <UserItem key={user["_id"]} user={user} active={selectedUsers.includes(user)} onSelectUpdate={onSelectUpdate} />
        });


        return (<div>
            <span>{selectedUsers.length} Users Selected</span>
            <span className="count">{users.length}</span>
            <ul id="users-available">{userItems}</ul>
            <button onClick={addUsers}>ADD</button>
        </div>);
    }
}

export default UserListAvailable;