import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const Form = (props) => {

    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]); 

    const onSubmitHandler = (e) => {
        e.preventDefault()

        const newAuthor = {
            name
        }

        axios.post("http://localhost:8000/api/authors", newAuthor)
            .then(() => {
                console.log("Creation successful on backend")
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
            // console.log(err));
    };

    return (
        <div>
            <Link to={"/authors"}> Home</Link>
            <h5>Add a new author</h5>
            <form onSubmit = { onSubmitHandler }>

                {errors.map((err, index) => <p key={index}>{err}</p>)}
                
                <div>
                    <label>Name: </label>
                    <input 
                        onChange ={(e) => setName(e.target.value)} 
                        type="text" 
                    />
                </div>

                <button>Submit</button>
            </form>
        </div>
    );
};

export default Form;