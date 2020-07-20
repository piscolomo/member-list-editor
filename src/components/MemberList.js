import React from 'react';
import UserItem from './UserItem';

class MemberList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            valueSearch: "",
            filtered: []
        }
    }

    handleInputChange(e){
        this.setState({valueSearch: e.target.value});

        if (e.target.value === ""){
            this.setState({filtered: []});
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
        let users = this.props.users;
        if (this.state.valueSearch.length > 0){
            users = this.state.filtered;
        }
        const list = users.map((user)=>{
            return <li key={user["_id"]}>
                <span className="user-name">{user.firstName} {user.lastName}</span>
                <span className="user-email">{user.email}</span>
            </li>
        });

        if (this.props.users.length > 0){
            return <div className="member-list-wrapper">
                    <input type="text" placeholder="Find User member" onChange={this.handleInputChange.bind(this)} />
                    {users.length > 0 && <ul id="member-list">{list}</ul>}
                </div>
        }else{
            return <p>No users in this list. Click on Edit Button to add members.</p>
        }
    }
}

export default MemberList;