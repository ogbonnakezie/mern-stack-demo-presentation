import React from "react";
import axios from "axios";

import "./App.css";
class App extends React.Component {
  state = {
    title: "",
    body: "",
    posts: [],
  };

  componentDidMount = () => {
    this.getBlogPost();
  };
  getBlogPost = () => {
    axios
      .get("/api")
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retriving data!!!");
      });
  };
  handleChange = ({ target }) => {
    const { name, value } = target;
    // Updates the form
    this.setState({ [name]: value });
  };
  submit = (event) => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body,
    };

    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been sent to the Server");
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  resetUserInputs = () => {
    this.setState({
      title: "",
      body: "",
    });
  };

  displayBlogPost = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => {
      return (
        <div key={index} className="blog-post_display">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      );
    });
  };

  render() {
    console.log("State", this.state);
    //JSX
    return (
      <div className="app">
        <h2>Welcome to My React App </h2>
        <center>
          <form onSubmit={this.submit}>
            <div className="form-input">
              <input
                type="text"
                name="title"
                value={this.state.title}
                placeholder="Enter your title"
                onChange={this.handleChange}
              />{" "}
            </div>
            <div className="form-input">
              <textarea
                name="body"
                value={this.state.body}
                cols="30"
                rows="10"
                onChange={this.handleChange}
                placeholder="Write a message"
              ></textarea>
            </div>

            <button>Submit</button>
          </form>
        </center>
        <div className="blog-">{this.displayBlogPost(this.state.posts)}</div>
      </div>
    );
  }
}

export default App;
