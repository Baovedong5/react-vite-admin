import { Input, Modal, message, notification } from "antd";
import { useState, useEffect } from "react";
import { IUser } from "./users.table";

interface IProps {
  access_token: string;
  getData: any;
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: null | IUser;
  setDataUpdate: any;
}

const UpdateUserModal = (props: IProps) => {
  const {
    access_token,
    getData,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    dataUpdate,
    setDataUpdate,
  } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (dataUpdate) {
      setName(dataUpdate.name);
      setEmail(dataUpdate.email);
      setAge(dataUpdate.age);
      setGender(dataUpdate.gender);
      setAddress(dataUpdate.address);
      setRole(dataUpdate.role);
    }
  }, [dataUpdate]);

  const handleOk = async () => {
    const data = {
      _id: dataUpdate?._id,
      email,
      name,
      gender,
      age,
      role,
      address,
    };

    const res = await fetch("http://localhost:8000/api/v1/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(data),
    });

    const d = await res.json();
    if (d.data) {
      //success
      await getData();
      message.success("success");
      handleCloseUpdateModal();
    } else {
      notification.error({
        message: "Co loi xay ra",
        description: JSON.stringify(d.message),
      });
    }
  };

  const handleCloseUpdateModal = () => {
    setDataUpdate(null);
    setIsUpdateModalOpen(false);
    setName("");
    setEmail("");
    setAge("");
    setGender("");
    setAddress("");
    setRole("");
  };

  return (
    <Modal
      title="Update a user"
      open={isUpdateModalOpen}
      onOk={handleOk}
      onCancel={() => handleCloseUpdateModal()}
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

export default UpdateUserModal;
