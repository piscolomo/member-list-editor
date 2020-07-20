import React, { StatelessComponent } from 'react';
import UserItem from './UserItem';
import User from "../User";

type Props = Readonly<{
    users: User[],
    selectedUsers: User[],
    valueSearch: string,
    selectAllUsers: boolean,
    onSelectUpdate: (user: User) => void,
    addUsers: () => void,
    onChangeListCheckbox: () => void,
    onSearch: (e: any) => void
}>

const UserListAvailable: StatelessComponent<Props> = ({users, selectedUsers, valueSearch, selectAllUsers, onSelectUpdate, addUsers, onChangeListCheckbox, onSearch}) => {    
    return (<div>
        <div className="search-wrapper">
            <input type="text" value={valueSearch} placeholder="Find Available Users..." onChange={onSearch}/>
        </div>
        <div className="list-head">
            <input type="checkbox" checked={selectAllUsers} onChange={onChangeListCheckbox} />
            <span>{selectedUsers.length} Users Selected</span>
            <span className="count">{users.length}</span>
        </div>
        <ul id="users-available">
            {users.map((user: User)=>(
                <UserItem key={user["_id"]} user={user} active={selectedUsers.includes(user)} onSelectUpdate={onSelectUpdate} />
            ))}
        </ul>
        <button className={`${selectedUsers.length > 0 ? "active" : ""}`} onClick={addUsers}>ADD <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
    </div>);
}

export default UserListAvailable;