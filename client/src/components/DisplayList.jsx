import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DisplayList = (props) => {

    const [authorList, setAuthorList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
            //!first do this to make sure you're pulling the correct data
            // .then((res) => console.log(res.data)) 
            //!once you confirm you are pulling the correct info from console.log, then setList
            .then((res) => setAuthorList(res.data))
            .catch((err) => console.log(err))
    }, []);

    const deleteAuthor = (authorId) => {
        axios.delete("http://localhost:8000/api/authors/" + authorId)
        .then(() => {
            console.log("Successfully deleted from the backend")
            // !HAVING THIS FUNCTION WILL UPDATE THE LIST IN REAL TIME SO YOU DONT NEED TO RELOAD
            removeFromDom(authorId)
        })
        .catch (err => console.log("Something went wrong with deleting on displayList", err))
    };

    const removeFromDom = (authorId) => {
        setAuthorList(authorList.filter( a => a._id !== authorId))
    };

    


    return (
        <div className="container ">
        <>
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
