import { Input, Modal, message, notification } from "antd";
import { useState } from "react";

interface IProps {
  access_token: string;
  getData: any;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

const CreateUserModal = (props: IProps) => {
  const { access_token, getData, isCreateModalOpen, setIsCreateModalOpen } =
    props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

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
    <Modal
      title="Add new user"
      open={isCreateModalOpen}
      onOk={handleOk}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
    >
      <div>
        <label>Name:</label>
        <Input value={name} onChange={(event) => setName(event.target.value)} />
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
        <Input value={role} onChange={(event) => setRole(event.target.value)} />
      </div>
    </Modal>
  );
};

export default CreateUserModal;
