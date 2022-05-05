// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import './Login.css';
// import LoginButton from './LoginButton'

// class Login extends React.Component {
//   render() {
//     return (
//       <Card style={{ width: '18rem' }}>
//         <Card.Body>
//           <Card.Title>Log In</Card.Title>
//           <Card.Text>
//             Click Below to Log In
//           </Card.Text>
//           {/* TODO: add a `LoginButton` component here that will log the user in */}
//             <LoginButton loginHandler={this.props.loginHandler}/>
//         </Card.Body>
//       </Card>
//     )
//   }
// }

// export default Login;

import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from 'react-bootstrap/Button'



const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  function test (){
    loginWithRedirect();
  };
  return <Button onClick={() => test()}>Log In</Button>;
};

export default LoginButton;