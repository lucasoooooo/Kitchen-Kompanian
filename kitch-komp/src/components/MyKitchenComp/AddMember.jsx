import { useState } from "react";

const AddMember = ({addMember}) => {

    const [username, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const member = { username, firstName, lastName };
        console.log(member);
        addMember(member);
    }
    
    return (  
        <div className="Add">
            <h2>Add a new member</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                type="text" 
                required
                value={username}
                onChange={(e) => setUserName(e.target.value)}/>

                <label>First Name:</label>
                <input
                type="text" 
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}/>

                <label>Last Name:</label>
                <input
                type="text" 
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}/>

                <button>Submit</button>
            </form>
        </div>
    );
}
 
export default AddMember;