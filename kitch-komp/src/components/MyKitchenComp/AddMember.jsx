import { useState } from "react";

const AddMember = ({addMember, handleBack, id}) => {

    const [username, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const member = { username, firstName, lastName, id};
        console.log(member);
        addMember(member);
        setUserName('');
        setFirstName('');
        setLastName('');
        handleBack();
    }

    
    return (  
        <div className="adding">
            <h2>Add a new member</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                type="text" 
                required
                value={username}
                onChange={(e) => setUserName(e.target.value)}/>

                <br></br>
                <label>First Name:</label>
                <input
                type="text" 
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}/>
                
                <br></br>
                <label>Last Name:</label>
                <input
                type="text" 
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}/>

                <br></br>
                <button>Submit</button>
            </form>
            <br></br> 
            <button onClick={() => handleBack()}>Back</button>
        </div>
    );
}
 
export default AddMember;