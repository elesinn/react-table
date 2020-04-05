import React, {useRef, useEffect,useState} from 'react';

import s from './table.module.css'

export const Table = ({users, handleSort}) => {
    const tableHead = useRef(null)

    const handleHeadClick = (e) => {
        handleSort(e.target.innerText)
    }

    useEffect(() => {
        tableHead.current.addEventListener('click',handleHeadClick)

        return () => {
            tableHead.current.removeEventListener('click',handleHeadClick)
        };
    }, [handleSort]);

    return (
        <table className={`table table-striped ${s.table}`} >
            <thead className="thead-dark" ref={tableHead}>
            <tr>
                <th>id</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>email</th>
                <th>phone</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => {
                return (
                    <tr key={user.internalId}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
};
