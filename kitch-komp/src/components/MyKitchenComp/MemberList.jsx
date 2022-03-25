const MemberList = ({members, title, handleDelete, handleAdd}) => {
    return ( 
        <div className="members">
            <h2>{ title }</h2>
            <br></br>
            <button onClick={() => handleAdd()}>Add Member</button>
            <br></br>
            {members.map((member) => (
            <div className="member-list" key={member.username}>
              <h4>{ member.firstName } { member.lastName }</h4>
              <p>{member.username}</p>

              <button onClick={() => handleDelete(member.id)}>Remove</button>
         </div>
         ))} 
      </div>
      );
}
 
export default MemberList;