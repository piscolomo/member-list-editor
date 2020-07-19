import React from 'react';
import UserItem from './UserItem';

class UserListAvailable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filtered: props.users
        }
    }

    searchUsers(e) {
        if (e.target.value === ""){
            this.setState({filtered: this.props.users});
        }else{
            const target = e.target.value.toLowerCase();
            this.setState({
                filtered: this.props.users.filter(user =>{
                    return `${user.firstName} ${user.lastName}`.toLowerCase().includes(target)
                })
            });
        }
    }

    render(){
        const { users, selectedUsers, selectAllUsers, onSelectUpdate, addUsers, onChangeListCheckbox } = this.props;
        
        const userItems = this.state.filtered.map((user)=>{
            return <UserItem key={user["_id"]} user={user} active={selectedUsers.includes(user)} onSelectUpdate={onSelectUpdate} />
        });

        return (<div>
            <input type="text" placeholder="Find User..." onChange={this.searchUsers.bind(this)}/>
            <span>{selectedUsers.length} Users Selected</span>
            <span className="count">{this.state.filtered.length}</span>
            <input type="checkbox" checked={selectAllUsers} onChange={onChangeListCheckbox} />
            <ul id="users-available">{userItems}</ul>
            <button onClick={addUsers}>ADD</button>
        </div>);
    }
}

export default UserListAvailable;