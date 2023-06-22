// import React, { useState } from "react";

// const SelectComponent = () => {
//   const [bgItem, setBgItem] = useState();
//   const data = [
//     {
//       id: 1,
//       name: "Attack on titan",
//       background:
//         "https://storage.googleapis.com/my-image-products/attack.webm",
//     },
//     {
//       id: 2,
//       name: "Joker",
//       background: "https://storage.googleapis.com/my-image-products/joker.webm",
//     },
//     {
//       id: 3,
//       name: "Gojo",
//       background: "https://storage.googleapis.com/my-image-products/gojo.webm",
//     },
//   ];

//   const handleChangeSelect = (e) => {
//     const value = e.target.value;
//     if (value) {
//       setBgItem(data.filter((da) => da.id === +value));
//     }
//   };

//   console.log(bgItem);
//   return (
//     <div>
//       <select
//         name="bgs"
//         id="bgs"
//         className="z-10 absolute"
//         onChange={handleChangeSelect}
//       >
//         {data.map((item) => {
//           return <option value={item.id}>{item.name}</option>;
//         })}
//       </select>
//     </div>
//   );
// };

// export default SelectComponent;
