import React, { useEffect, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import Search from "../../components/search/Search";
import { useParams } from "react-router";
import "./Profile.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useLoginContext } from "../../contexts/LoginProvider";
import PostCard from "../../components/postCard/PostCard";
import { useUserContext } from "../../contexts/UserProvider";
import FollowerList from "../../components/followerList/FollowerList";
import { usePostContext } from "../../contexts/PostProvider";
import { RxCross1 } from "react-icons/rx";

const Profile = () => {
    const { profileId } = useParams();
    const { userDetails } = useLoginContext();
    const { logoutHandler } = useLoginContext();
    const [editProfile, setEditProfile] = useState(false);
    const [followerList, setFollowerList] = useState(false);
    const [followingList, setFollowingList] = useState(false);
    const { posts } = usePostContext();
    const {
        getUser,
        user,
        editProfileHandler,
        users,
        followHandler,
        unFollowHandler,
        getUserPosts,
        userPosts,
    } = useUserContext();
    useEffect(() => {
        getUser(profileId);
    }, [profileId, users, posts]);

    useEffect(() => {
        getUserPosts(user.username);
    }, [user, userDetails, posts]);

    const {
        _id,
        username,
        avatarUrl,
        firstName,
        lastName,
        following,
        followers,
        bio,
        website,
    } = user;
    const followersWithUsername = user?.followers?.map(
        ({ username }) => username
    );
    const [newUserDetails, setNewUserDetails] = useState({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        bio: userDetails.bio,
        avatarUrl: userDetails.avatarUrl,
        website: userDetails.website,
    });
    const followed = followersWithUsername?.includes(userDetails?.username);
    return (
        <div className="main-layout">
            <Navigation />
            <div className="profile-box">
                <div className="container-1-1">
                    <Link to="/">
                        <AiOutlineArrowLeft />
                    </Link>
                    <div className="container-5">
                        <h3>
                            {firstName} {lastName}
                        </h3>
                        <div>
                            <small>{userPosts.length} posts</small>
                        </div>
                    </div>
                </div>
                <div className="container-3">
                    <div className="container-2">
                        <div>
                            <img
                                className="profile-pic big"
                                src={avatarUrl}
                                alt="profile pic"
                            />
                        </div>
                        <div className="user-details">
                            <strong>
                                {firstName} {lastName}
                            </strong>
                            <div>
                                <small>@{username}</small>
                            </div>
                            <div>{bio}</div>
                            <div>
                                URL: <Link to={website}>{website}</Link>
                            </div>
                            <div>
                                <div>
                                    <div
                                        onClick={() => {
                                            setFollowerList(!followerList);
                                            setFollowingList(false);
                                        }}
                                    >
                                        Followers: {followers?.length}
                                    </div>
                                    <div
                                        onClick={() => {
                                            setFollowingList(!followingList);
                                            setFollowerList(false);
                                        }}
                                    >
                                        Following:
                                        {following?.length}
                                    </div>
                                </div>
                            </div>
                            {followerList && (
                                <FollowerList
                                    followers={followers}
                                    setFollowerList={setFollowerList}
                                    setFollowingList={setFollowingList}
                                />
                            )}
                            {followingList && (
                                <FollowerList
                                    followers={following}
                                    setFollowerList={setFollowerList}
                                    setFollowingList={setFollowingList}
                                    following
                                />
                            )}
                        </div>
                    </div>
                    <div className="edit-section">
                        {userDetails._id === user._id ? (
                            <>
                                <button
                                    className="dark-btn"
                                    onClick={() => setEditProfile(true)}
                                >
                                    Edit Profile
                                </button>
                                <button
                                    className="dark-btn"
                                    onClick={logoutHandler}
                                >
                                    Log Out
                                </button>
                                {editProfile && (
                                    <div className="edit-profile">
                                        <div className="container-4">
                                            <RxCross1
                                                className="cross-btn"
                                                onClick={() =>
                                                    setEditProfile(false)
                                                }
                                            >
                                                Close
                                            </RxCross1>
                                            <strong>Edit Profile</strong>
                                            <button
                                                className="dark-btn"
                                                onClick={() => {
                                                    editProfileHandler(
                                                        newUserDetails
                                                    );
                                                    setEditProfile(false);
                                                }}
                                            >
                                                Save
                                            </button>
                                        </div>
                                        <div className="field">
                                            <label>First Name </label>
                                            <input
                                                onChange={(e) =>
                                                    setNewUserDetails({
                                                        ...newUserDetails,
                                                        firstName:
                                                            e.target.value,
                                                    })
                                                }
                                                defaultValue={
                                                    newUserDetails.firstName
                                                }
                                                type="text"
                                            />
                                        </div>
                                        <div className="field">
                                            <label>Last Name </label>
                                            <input
                                                onChange={(e) =>
                                                    setNewUserDetails({
                                                        ...newUserDetails,
                                                        lastName:
                                                            e.target.value,
                                                    })
                                                }
                                                defaultValue={
                                                    newUserDetails.lastName
                                                }
                                                type="text"
                                            />
                                        </div>
                                        <div className="field">
                                            <label>Bio </label>
                                            <input
                                                onChange={(e) =>
                                                    setNewUserDetails({
                                                        ...newUserDetails,
                                                        bio: e.target.value,
                                                    })
                                                }
                                                defaultValue={
                                                    newUserDetails.bio
                                                }
                                                type="text"
                                            />
                                        </div>
                                        <div className="field">
                                            <label>Website </label>
                                            <input
                                                onChange={(e) =>
                                                    setNewUserDetails({
                                                        ...newUserDetails,
                                                        website: e.target.value,
                                                    })
                                                }
                                                defaultValue={
                                                    newUserDetails.website
                                                }
                                                type="text"
                                            />
                                        </div>
                                        <div className="field">
                                            <label>Profile URL </label>
                                            <input
                                                onChange={(e) =>
                                                    setNewUserDetails({
                                                        ...newUserDetails,
                                                        avatarUrl:
                                                            e.target.value,
                                                    })
                                                }
                                                defaultValue={
                                                    newUserDetails.avatarUrl
                                                }
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {followed ? (
                                    <button
                                        className="dark-btn"
                                        onClick={() => unFollowHandler(_id)}
                                    >
                                        UnFollow
                                    </button>
                                ) : (
                                    <button
                                        className="dark-btn"
                                        onClick={() => followHandler(_id)}
                                    >
                                        Follow
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div>
                    <h3>Posts</h3>
                    <br></br>
                    {userPosts.map((post) => (
                        <PostCard post={post} />
                    ))}
                </div>
            </div>
            <Search />
        </div>
    );
};

export default Profile;
