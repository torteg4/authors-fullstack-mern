import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, Link, useNavigate } from 'react-router-dom';

const UpdateForm = (props) => {

    const {id} = useParams();
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]); 
    const [authorNotFound, setAuthorNotFound] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors/" + id)
            .then((res) => {
                setName(res.data.name)
            })
            .catch((err) => {
                console.log("Something went wrong with updating through button", err);
                setAuthorNotFound(true);
            });
    }, []);


    const onSubmitHandler = (e) => {
        e.preventDefault()

        const newAuthor = {
            name
        }

        axios.put("http://localhost:8000/api/authors/" + id, newAuthor)
            .then(() => {
                console.log("Update successful on backend");
                navigate("/authors")
            })
            .catch((err) => {
                const errorResponse = err.response.data.errors;

                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    };

    return (
        <div>
            <Link to={"/authors"}> Home</Link>
            <h5>Edit this Author</h5>
            
            {authorNotFound ? <h2>{authorNotFound} <Link to ={"/authors/new"}>Go here to create author!</Link></h2> : null}

            <form onSubmit = { onSubmitHandler }>
                {errors.map((err, index) => <p key={index}>{err}</p>)}
                

                <div>
                    <label>Name: </label>
                    <input 
                        onChange ={(e) => setName(e.target.value)} 
                        type="text" 
                        value= {name}
                    />
                </div>
                <div>
                    <button>Update</button>
                </div>
            </form>

        </div>
    );
};

export default UpdateForm;