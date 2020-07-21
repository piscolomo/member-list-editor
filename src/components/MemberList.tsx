import React, { Component } from 'react';
import User from "../User";

type Props = Readonly<{
    users: User[];
}>

type State = Readonly<{
    valueSearch: string;
    filtered: User[];
}>

class MemberList extends Component<Props, State>{
    state: State = {
        valueSearch: "",
        filtered: []
    }

    handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void{
        this.setState({valueSearch: e.target.value});

        if (e.target.value === ""){
            this.setState({filtered: []});
        }else{
            const target = e.target.value.toLowerCase();
            this.setState({
                filtered: this.props.users.filter((user: User) =>{
                    return `${user.firstName} ${user.lastName}`.toLowerCase().includes(target)
                })
            });
        }
    }

    render(): JSX.Element{
        const { valueSearch, filtered } = this.state;
        let users = valueSearch.length > 0 ? filtered : this.props.users;

        if (this.props.users.length > 0){
            return <div className="member-list-wrapper">
                    <input type="text" className="search-assigned" placeholder="Find User member" onChange={this.handleInputChange.bind(this)} />
                    {users.length > 0 && <ul id="member-list">{
                        users.map((user: User)=>(
                            <li key={user["_id"]}>
                                <span className="user-name">{user.firstName} {user.lastName}</span>
                                <span className="user-email">{user.email}</span>
                            </li>
                        ))
                    }</ul>}
                </div>
        }else{
            return <p>No users in this list. Click on Edit Button to add members.</p>
        }
    }
}

export default MemberList;