import React from 'react';
import UserItem from './UserItem';

class UserListAssigned extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { users, selectedUsers, selectAllUsers, onSelectUpdate, removeUsers, onChangeListCheckbox } = this.props;
        
        const userItems = users.map((user)=>{
            return <UserItem key={user["_id"]} user={user} active={selectedUsers.includes(user)} onSelectUpdate={onSelectUpdate} />
        });

        return (<div>
            <div className="list-title"><span>Users Assigned</span></div>
            <div className="list-head">
                <input type="checkbox" checked={selectAllUsers} onChange={onChangeListCheckbox} />
                <span>{selectedUsers.length} Users Selected</span>
                <span className="count">{users.length}</span>
            </div>
            <ul id="users-assigned">{userItems}</ul>
            <button className={`${selectedUsers.length > 0 ? "active" : ""}`} onClick={removeUsers}><i class="fa fa-arrow-left" aria-hidden="true"></i> REMOVE</button>
        </div>);
    }
}

export default UserListAssigned;