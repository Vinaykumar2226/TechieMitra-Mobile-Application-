import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Database(props) {
  const [dbdata, setdbData] = useState();

  // useEffect(() =>{ datasent(dbdata)},[]);

  useEffect(() => {
    fetch(`http://10.68.21.244:3000/data?query=select * from logindtls`)
      .then((response) => response.json())
      .then((json) => setdbData(json))
      .catch((error) => alert(error));
    // .finally(() => alert("inserted succesfully"));

    // console.log(dbdata);
    // console.log(dbdata[0].username);
  }, []);

  // useEffect(
  //   (dbdata) => {
  //     this.props.setRetdata(dbdata);
  //   },
  //   [dbdata]
  // );

  // data();
  // console.log(dbdata, "lpop");

  // function abc() {
  //   fetch(`http://10.68.22.58:3000/data?query=select * from logindtls`)
  //     .then((response) => response.json())
  //     .then((json) => setdbData(json))
  //     .catch((eror) => alert(error))
  //     .finally(() => alert("inserted succesfully"));
  // }

  // abc();

  // // props.onRetrive(dbdata);
  // console.log(dbdata);

  //   useEffect(() => {
  //     fetch(`http://10.68.20.43:3000/data?query=${props.qeury}`)
  //       .then((response) => response.json()) // get response, convert to json
  //       // .then((json) => {
  //       //   setName(json[1].username);
  //       // })
  //       .catch((error) => alert(error)) // display errors
  //       .finally(() => setLoading(false)); // change loading state
  //   }, []);
}
