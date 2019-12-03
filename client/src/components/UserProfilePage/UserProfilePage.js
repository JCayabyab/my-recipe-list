import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { CssBaseline, Container, Button } from "@material-ui/core";
import styled from "styled-components";

const Body = styled(Container)`
  padding: 20px 0px;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-end;

  & > * {
    margin: 0px 10px;
  }
`;

const UserProfilePage = ({ location }) => {
  const [profileUser, setProfileUser] = useState(null);
  const [user] = useContext(UserContext);
  useEffect(() => {
    const getProfileUser = async () => {
      const userNameFromUrl = location.pathname.split("/").slice(-1)[0];

      const { data: theUser } = await axios.get("/api/profile", {
        params: {
          ownUserName: user.userName,
          userName: userNameFromUrl
        }
      });

      setProfileUser(theUser);
    };

    if (user !== null) {
      getProfileUser();
    }
  }, [user, location]);

  console.log(profileUser);

  /*
  this is the data
  {
    firstName: String,
    lastName: String,
    country: String,
    isFriend: boolean,
    profilePictureUrl: String
  }
  
  */

  return profileUser ? (
    <React.Fragment>
      <CssBaseline></CssBaseline>
      <Body>
        <Row>
          <img
            width='150px'
            height='150px'
            alt="profile picture"
            src={profileUser.profilePictureUrl}
          ></img>
          <div align="left">
            <span>
              <h2>
                {profileUser.firstName}, {profileUser.lastName}
              </h2>
            </span>
            <span>
              <h4>{profileUser.country}</h4>
            </span>
          </div>
          <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          <Button variant="contained" color="primary">
            {profileUser.isFriend ? "Unfriend" : "Send Friend Request" }
          </Button>
        </Row>
      </Body>
    </React.Fragment>
  ) : (
    <div>Loading...</div>
  );
};

export default withRouter(UserProfilePage);