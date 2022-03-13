const MemberList = ({members, title, handleDelete}) => {
    return ( 
        <div>
            <h2>{ title }</h2>
            {members.map((member) => (
            <div className="member-list" key={member.username}>
              <h4>{ member.firstName } { member.lastName }</h4>
              <p>{member.username}</p>

              <button onClick={() => handleDelete(member.username)}>Remove</button>
         </div>
         ))} 
      </div>
      );
}
 
export default MemberList;