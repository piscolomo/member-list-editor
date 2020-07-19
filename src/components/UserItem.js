import React from 'react';

class UserItem extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { user, active } = this.props;
        return (
            <li className={`${active ? "selected" : ""}`} onClick={this.props.onSelectUpdate.bind(this, user)}>
                <input readOnly type="checkbox" checked={active} />
                {user.firstName} {user.lastName}
            </li>
        );
    }
}

export default UserItem;