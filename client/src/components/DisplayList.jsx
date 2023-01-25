import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DisplayList = (props) => {

    const [authorList, setAuthorList] = useState([]);
    const [sortType, setSortType] = useState('name');

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
            .then((res) => setAuthorList(res.data))
            .catch((err) => console.log(err))
    }, []);


    const deleteAuthor = (authorId) => {
        axios.delete("http://localhost:8000/api/authors/" + authorId)
        .then(() => {
            console.log("Successfully deleted from the backend")
            removeFromDom(authorId)
        })
        .catch (err => console.log("Something went wrong with deleting on displayList", err))
    };

    const removeFromDom = (authorId) => {
        setAuthorList(authorList.filter( a => a._id !== authorId))
    };

    // !SORTING FUNCTION ATTEMPT----------------------------
    useEffect(() => {
        const sortAlphabetically = authorName => {
            const authorNames = {
                name: 'name',
            };
    
            const sortAuthors = authorNames[authorName];
            const sorted = [...authorList].sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                return 0;
            }
            )
            console.log(sorted)
            setAuthorList(sorted)
        };
        sortAlphabetically(sortType);
    }, [sortType])
        // b[sortAuthors] - a[sortAuthors]);
// ---------------------------------------------------------

    return (
        <div className="container ">
        <>
            <div>                      
                <select onChange={(e) => setSortType(e.target.value)}>
                        <option value="ascending">Sort A-Z</option>
                        <option value="descending">Sort Z-A</option>
                </select>
            </div>

            <Link to={"/authors/new"}> Add an author</Link>

            <table class="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                
                {authorList.length > 0 && authorList.map ((author, index) =>
                    <tbody>
                        <tr>
                            <td> {author.name} </td>
                            <td> 
                                <Link 
                                    className="btn btn-info" 
                                    to ={'/authors/update/' + author._id}> 
                                    Update 
                                </Link>
                                <button 
                                    onClick={() => deleteAuthor(author._id)}
                                    class="btn btn-warning">
                                        Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>

        </>
        </div>
    )
};

export default DisplayList;
