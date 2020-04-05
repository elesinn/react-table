import React, {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Table} from "./components/table/Table";
import './App.css';
import Pagination from "./components/pagination/Pagination";

const SMALL_DATA_URL = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
const FULL_DATA_URL = 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'

function App() {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(true); // true - direct, false - reverse

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);

    const fetchUsers = async (url) => {
      setIsLoading(true)
      const response = await fetch(url)
      let fetchedUsers = await response.json()
      updateIds(fetchedUsers)
      setUsers(fetchedUsers)
      setIsLoading(false)
    }

    const updateIds = (users) => {
        let intId = 0
        users.forEach(user => {
            user.internalId = intId++
        })
    }

    const handleSort = (field) => {
        if (field === sortField) {
            setSortOrder(!sortOrder)
            sortUsers(field, sortOrder)
        } else {
            setSortField(field)
            sortUsers(field, true)
        }
    }

    if (isLoading) {
        return 'IS LOADING...'
    }

    const sortUsers = (fieldName, sortOrder) => {
        let sortedUsers = [...users.sort((a, b) => {
            if ( a[fieldName] < b[fieldName]) {
                if (sortOrder) {
                    return -1
                } else {
                    return 1
                }
            }
            if (a[fieldName] > b[fieldName]) {
                if (sortOrder) {
                    return 1
                } else {
                    return -1
                }
            }
            return 0;
        })]
        updateIds(sortedUsers)
        setUsers(sortedUsers)
    }

    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = [...users].slice(indexOfFirstUser, indexOfLastUser)

    return (
    <div className="container">
        <div className="buttons">
            <button type="button" className="btn btn-primary" onClick={() => fetchUsers(SMALL_DATA_URL)}>Small users data</button>
            <button type="button" className="btn btn-primary mt-2" onClick={() => fetchUsers(FULL_DATA_URL)}>Full users data</button>
        </div>
        <Table users={currentUsers} handleSort={handleSort}/>
        {users.length > 0 &&
         <Pagination
             postsPerPage={usersPerPage}
             currentPage={currentPage}
             totalPosts={users.length}
             pageClickHandler={(page) => setCurrentPage(page)}/>
        }
    </div>
  );
}

export default App;
