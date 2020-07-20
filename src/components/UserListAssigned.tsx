import React, { StatelessComponent }  from 'react';
import UserItem from './UserItem';
import User from "../User";

type Props = Readonly<{
    users: User[],
    selectedUsers: User[],
    selectAllUsers: boolean,
    onSelectUpdate: (user: User) => void,
    removeUsers: () => void,
    onChangeListCheckbox: () => void
}>

const UserListAssigned: StatelessComponent<Props> = ({users, selectedUsers, selectAllUsers, onSelectUpdate, removeUsers, onChangeListCheckbox}) => (
    <div>
        <div className="list-title"><span>Users Assigned</span></div>
        <div className="list-head">
            <input type="checkbox" checked={selectAllUsers} onChange={onChangeListCheckbox} />
            <span>{selectedUsers.length} Users Selected</span>
            <span className="count">{users.length}</span>
        </div>
        <ul id="users-assigned">{users.map((user: User)=>(
            <UserItem key={user["_id"]} user={user} active={selectedUsers.includes(user)} onSelectUpdate={onSelectUpdate} />
        ))}</ul>
        <button className={`${selectedUsers.length > 0 ? "active" : ""}`} onClick={removeUsers}><i className="fa fa-arrow-left" aria-hidden="true"></i> REMOVE</button>
    </div>
);

export default UserListAssigned;