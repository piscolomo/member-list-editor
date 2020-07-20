import React from 'react';
import UserItem from './UserItem';

class UserListAvailable extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { users, selectedUsers, selectAllUsers, onSelectUpdate, addUsers, onChangeListCheckbox, onSearch, setRef} = this.props;
        
        const userItems = users.map((user)=>{
            return <UserItem key={user["_id"]} user={user} active={selectedUsers.includes(user)} onSelectUpdate={onSelectUpdate} />
        });

        return (<div>
            <div className="search-wrapper">
                <input ref={setRef} type="text" placeholder="Find Available Users..." onChange={onSearch}/>
            </div>
            <span>{selectedUsers.length} Users Selected</span>
            <span className="count">{users.length}</span>
            <input type="checkbox" checked={selectAllUsers} onChange={onChangeListCheckbox} />
            <ul id="users-available">{userItems}</ul>
            <button className={`${selectedUsers.length > 0 ? "active" : ""}`} onClick={addUsers}>ADD <i class="fa fa-arrow-right" aria-hidden="true"></i></button>
        </div>);
    }
}

export default UserListAvailable;