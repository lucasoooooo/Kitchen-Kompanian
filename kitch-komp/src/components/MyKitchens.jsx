import React, { useState } from "react";
import AddMember from "./MyKitchenComp/AddMember";
import MemberList from "./MyKitchenComp/MemberList";

function MyKitchens() {

  const [members, setMembers] = useState([
    { firstName: 'Mark', lastName: 'McGraw', username: 'mmcgraw', id: 1 },
    { firstName: 'Brenton', lastName: 'Haliw', username: 'bhaliw', id: 2 },
    { firstName: 'Lucas', lastName: 'Balangero', username: 'lbalang', id: 3 },
    { firstName: 'Will', lastName: 'Reid', username: 'wreid', id: 4 }
  ])

  const handleDelete = (username) => {
    const newMembers = members.filter(member => member.username != username);
    setMembers(newMembers);
  }

  const addMember = (member) => {
    setMembers(members.concat(member));
  }

  return (
    <div className="kitchens">
      <div className="container">
          <h1 className="font-weight-light">My Kitchens</h1>
          <p>
            This is our My Kitchens List

            <MemberList members={members} title="Members" handleDelete={handleDelete} />
            <AddMember addMember={addMember}/>
          </p>
      </div>
    </div>
  );
}

export default MyKitchens;