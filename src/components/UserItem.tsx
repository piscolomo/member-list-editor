import React, { StatelessComponent } from 'react';
import User from "../User";

type Props = Readonly<{
    user: User,
    active: boolean,
    onSelectUpdate: (user: User) => void
}>

const UserItem: StatelessComponent<Props> = ({user, active, onSelectUpdate}) => (
    <li className={`${active ? "user-item selected" : "user-item"}`} onClick={() => onSelectUpdate(user)}>
        <input readOnly type="checkbox" checked={active} />
        {user.firstName} {user.lastName}
    </li>
);

export default UserItem;