import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/socialmediapages/Home";
import Profile from "./components/socialmediapages/Profile";
import MyProfile from "./components/Profile/MyProfile";
import Post from "./components/post/Post";
import AddRoom from "./components/chat/AddRoom";
import RoomList from "./components/chat/RoomList";
import ChatRoom from "./components/chat/ChatRoom";
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Sidebar/>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/profile' exact component={Profile} />
            <Route path='/myprofile' exact component={MyProfile} />
            <Route path='/addroom' exact component={AddRoom} />
            <Route path='/roomlist' exact component={RoomList} />
            <Route path='/chatroom/:rooms' exact component={ChatRoom} />
            <Route path='/posts' exact component={Post} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
