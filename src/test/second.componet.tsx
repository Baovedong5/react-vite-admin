const PhuongComponent = () => {
  const name = "Phuong";
  const age = 21;
  const info = {
    name: "Eric",
    age: 21,
  };
  const arr = [1, 2, 3];
  return (
    <div>
      <h1>Hello {arr}</h1>
      {/* <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      /> */}
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene </li>
        <li>Improve the spectrum technology</li>
      </ul>
    </div>
  );
};

export default PhuongComponent;
