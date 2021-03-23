import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

const Profile = () => {
    const [values, setValues] = React.useState({ 
        password: "12345", //    This needs to change with the user's password.
        showPassword: false, 
    });

    const handleClickShowPassword = () => { 
        setValues({ ...values, showPassword: !values.showPassword }); 
    }; 
      
    const handleMouseDownPassword = (event) => { 
        event.preventDefault(); 
    }; 
      
    const handlePasswordChange = (prop) => (event) => { 
        setValues({ ...values, [prop]: event.target.value }); 
    }; 

    return (<div style={{
        textAlign:"center",
        margin:"10px auto",
        justifyContent:"center",
        alignItems:"center",
        WebkitAlignItems:"center"
    }}>
        <h1>Account Info</h1>
        <div>
            <img src="https://bestprofilepix.com/wp-content/uploads/2014/03/sad-and-alone-boys-facebook-profile-pictures.jpg" alt="PP" style={{width:"160px", height:"200px", borderRadius:"20px"}}/>
        </div>
        <br/>
        <div style={{width:"100%", display:'block'}}>
        <div style={{display:"flex"}}>
                <div style={{width:"40%"}}>
                    <text/>
                </div>
                <div style={{display:"flex", width:"20%", justifyContent:"space-evenly" }}>
                    <text style={{fontWeight:"bold", width:"100px"}}>Name:</text>
                    <text style={{borderWidth:"1px", borderColor:"black", borderStyle:"solid", width:"200px"}} id="userNameLabel" name="userName">John</text>
                </div>
                <div style={{width:"40%"}}>
                    <text/>
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div style={{width:"40%"}}>
                    <text/>
                </div>
                <div style={{display:"flex", width:"20%", justifyContent:"space-evenly" }}>
                    <text style={{fontWeight:"bold", width:"100px"}}>Surname:</text>
                    <text style={{borderWidth:"1px", borderColor:"black", borderStyle:"solid", width:"200px"}} id="userSurnameLabel" name="userSurname">Doe</text>
                </div>
                <div style={{width:"40%"}}>
                    <text/>
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div style={{width:"40%"}}>
                    <text/>
                </div>
                <div style={{display:"flex", width:"20%", justifyContent:"space-evenly" }}>
                    <text style={{fontWeight:"bold", width:"100px", alignSelf:"center"}}>Nickname:</text>
                    <text style={{borderWidth:"1px", borderColor:"black", borderStyle:"solid", width:"200px"}} id="userSurnameLabel" name="userSurname">JohnDoe1234</text>
                </div>
                <div style={{width:"40%"}}>
                    <text/>
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div style={{width:"40%"}}>
                    <text/>
                </div>
                <div style={{display:"flex", width:"20%", justifyContent:"space-evenly" }}>
                    <text style={{fontWeight:"bold", width:"100px"}}>Mail:</text>
                    <text style={{borderWidth:"1px", borderColor:"black", borderStyle:"solid", width:"200px"}} id="userSurnameLabel" name="userSurname">john.doe@gmail.com</text>
                </div>
                <div style={{width:"40%"}}>
                    <text/>
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div style={{width:"40%"}}>
                    <text/>
                </div>
                <div style={{display:"flex", width:"20%", justifyContent:"space-evenly" }}>
                    <text style={{fontWeight:"bold", width:"100px"}}>Phone:</text>
                    <text style={{borderWidth:"1px", borderColor:"black", borderStyle:"solid", width:"200px"}} id="userSurnameLabel" name="userSurname">+90 530 234 5678</text>
                </div>
                <div style={{width:"40%"}}>
                    <text/>
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div style={{width:"40%"}}>
                    <text/>
                </div>
                <div style={{display:"flex", width:"20%", justifyContent:"space-evenly" }}>
                    <text style={{fontWeight:"bold", width:"100px", alignSelf:"center"}}>Previous Orders:</text>
                    <text style={{borderWidth:"1px", borderColor:"black", borderStyle:"solid", width:"200px"}} id="userSurnameLabel" name="userSurname">20 ETH<br/>30 ETH<br/>USB Storage Device</text>
                </div>
                <div style={{width:"40%"}}>
                    <text/>
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div style={{width:"40%"}}>
                    <text/>
                </div>
                <div style={{display:"flex", width:"6%", justifyContent:"space-evenly" }}>
                    <text style={{fontWeight:"bold", width:"10px", alignSelf:"center"}}>Password:</text>
                </div>
                <Input 
                    type={values.showPassword ? "text" : "password"} 
                    onChange={handlePasswordChange("password")} 
                    value={values.password} 
                    endAdornment={
                        <InputAdornment position="end"> 
                            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}> {values.showPassword ? <Visibility /> : <VisibilityOff />} </IconButton> 
                        </InputAdornment> 
                    }
                    style={{margin:"0px 60px"}}
                />
            </div>
        </div>
    </div>)};

export default Profile;
