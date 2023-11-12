// import "../../styles/users.css";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, notification, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";

interface IUser {
  _id: string;
  email: string;
  name: string;
  role: string;
}

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjUxYmZhOTRhYjViYTA3Zjc4ODQxZjI0IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE2OTk3NzQxNTksImV4cCI6MTc4NjE3NDE1OX0.o4j3PFqYWBuayoEi-rJg_uZC98ZKa9H8xYICvd9ePcI";

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("http://localhost:8000/api/v1/users/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    const d = await res.json();
    setListUsers(d.data.result);
  };

  const columns: ColumnsType<IUser> = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];

  const handleOk = async () => {
    const data = {
      email,
      name,
      password,
      gender,
      age,
      role,
      address,
    };

    const res = await fetch("http://localhost:8000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ ...data }),
    });

    const d = await res.json();
    if (d.data) {
      //success
      await getData();
      message.success("success");
      handleCloseCreateModal();
    } else {
      notification.error({
        message: "Co loi xay ra",
        description: JSON.stringify(d.message),
      });
    }
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setName("");
    setEmail("");
    setAge("");
    setPassword("");
    setGender("");
    setAddress("");
    setRole("");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Table User</h2>
        <Button
          icon={<PlusOutlined />}
          type={"primary"}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add new
        </Button>
      </div>

      <Table columns={columns} dataSource={listUsers} rowKey={"_id"} />

      <Modal
        title="Add new user"
        open={isCreateModalOpen}
        onOk={handleOk}
        onCancel={() => handleCloseCreateModal()}
        maskClosable={false}
      >
        <div>
          <label>Name:</label>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <Input value={age} onChange={(event) => setAge(event.target.value)} />
        </div>
        <div>
          <label>Gender:</label>
          <Input
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          />
        </div>
        <div>
          <label>Address:</label>
          <Input
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div>
          <label>Role:</label>
          <Input
            value={role}
            onChange={(event) => setRole(event.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default UsersTable;
