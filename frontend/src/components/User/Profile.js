import React, { useEffect } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import "./Profile.css";
const Profile = () => {
  const navigate = useNavigate();
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />

          <div className="profileContainer">
            <div className="leftConatiner">
              <h1>My Profile</h1>
              {user.avatar.url && <img src={user.avatar.url} alt={user.name} />}

              <Link to="/me/update">Edit Profile</Link>
            </div>

            <div className="rightContainer">
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined on</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>
              <div className="rightConatiner-2">
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
