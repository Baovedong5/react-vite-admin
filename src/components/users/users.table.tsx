import "../../styles/users.css";
import { useEffect, useState } from "react";

interface IUser {
  _id: string;
  email: string;
  name: string;
  role: string;
}

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    console.log(">>> check useEffect");
    getData();
  }, []);

  const getData = async () => {
    const access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjUxYmZhOTRhYjViYTA3Zjc4ODQxZjI0IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE2OTk3NzQxNTksImV4cCI6MTc4NjE3NDE1OX0.o4j3PFqYWBuayoEi-rJg_uZC98ZKa9H8xYICvd9ePcI";

    const res = await fetch("http://localhost:8000/api/v1/users/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    const d = await res.json();
    setListUsers(d.data.result);
  };

  console.log(">>> check render listUser", listUsers);

  return (
    <div>
      <h2>Table User</h2>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((item: IUser) => {
            return (
              <tr key={item._id}>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
