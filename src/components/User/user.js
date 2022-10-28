import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./user.css";

function User() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [animation, setAnimation] = useState("user_card ");

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getUsers(params.page);
    setPageNum(params.page);
  }, [params.page]);

  console.log(params.page);

  const getUsers = async (val) => {
    setLoading(true);
    const api = await fetch(
      //We use the params.page that we defined in the app.js to check the
      //page the user is navigating to
      `https://randomuser.me/api/?page=${val}&results=12&seed=abc`
    );
    const data = await api.json();
    setUsers(data?.results);
    setLoading(false);
  };
  console.log(users);
  //function to update page when a number is clicked
  const updatePage = (val) => {
    navigate(`/users/page/${val}`);

    getUsers(val);
  };
  //function to add to the current page index
  const addPage = (val) => {
    navigate(`/users/page/${val + 1}`);

    getUsers(val + 1);
  };

  //function to remove from the current page index
  const subPage = (val) => {
    if (val > 1) {
      navigate(`/users/page/${val - 1}`);
      getUsers(val - 1);
    }
  };
  const animationHandler = () => {
    setAnimation("user_card animation_style");
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }
  console.log(users);
  return (
    <div className="user_body">
      <h1 className="Employee_header"> Employee Data-base</h1>
      <ul className="card_container">
        {users?.map((user, i) => (
          <li
            key={i}
            className={`user_card ${animation}`}
            onLoad={animationHandler}
          >
            <div className="image_box">
              <img src={user.picture.medium} alt="" className="user_picture" />
            </div>
            <div>
              <h4 className="username">
                {user.name.title} {user.name.first} {user.name.last}
              </h4>
              <div className="inner_card">
                <h5 className="user_gender">Gender:{user.gender}</h5>
                <h5 className="user_email">Email:{user.email}</h5>
                <h5 className="user_phone">Phone:{user.phone}</h5>
                <h5 className="user_age">Age:{user.dob.age}</h5>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="pagination_con">
        {/* create prev button */}
        <button onClick={() => subPage(+params.page)} className="prev pointer">
          Prev
        </button>
        {/* Start a loop to generate ten buttons  */}
        {[...Array(Math.round(users?.length + +params.page))].map((_, i) =>
          //display 1 - 10 initially and for numbers 1 - 5
          +params.page < 6 && i < 10 ? (
            <button
              key={i}
              onClick={() => updatePage(i + 1)}
              className={`${
                i + 1 === Number(pageNum) ? "red" : ""
              } page_numbers`}
            >
              {i + 1}
            </button>
          ) : (
            // makes sure to shift the buttons to always display 10 per page no
            //matter the index
            i >= +params.page - 6 &&
            i + 6 < +params.page + 10 && (
              <button
                className={`${
                  i + 1 === Number(pageNum) ? "red" : ""
                } page_numbers`}
                key={i}
                onClick={() => updatePage(i + 1)}
              >
                {i + 1}
              </button>
            )
          )
        )}
        {/* create next button */}
        <button onClick={() => addPage(+params.page)} className="next pointer">
          Next
        </button>
      </div>
    </div>
  );
}

export default User;
