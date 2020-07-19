import React from 'react';

class UserItem extends React.Component{
    constructor(props){
        super(props);
        // this.state = {
        //     active: false
        // };
    }

    // handleSelect(){
    //     this.setState((prevState)=> ({active: !prevState.active}));
    // }

    render(){
        const {user} = this.props;
        return (
            <li className={`${this.props.active ? "selected" : ""}`} onClick={this.props.onSelectUpdate.bind(this, user)}>{user.firstName} {user.lastName}</li>
        );
    }
}

export default UserItem;