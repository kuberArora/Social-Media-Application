import React, { useState } from 'react';
import { Container } from 'reactstrap';
import {useSelector} from 'react-redux'
import {
    Redirect
} from "react-router-dom";
import {
    Alert,
    Jumbotron,
    Spinner,
    Form,
    Button,
    FormGroup, 
    Label, 
    Input
} from 'reactstrap';

import firebase from '../../config/fbConfig';
import RoomList from './RoomList';

const AddRoom=()=> {
    const auth = useSelector((state) => state.firebase.auth);
    const [room, setRoom] = useState({ roomname: '' });
    const [showLoading, setShowLoading] = useState(false);
    const ref = firebase.database().ref('rooms/');

    const save = (e) => {
        e.preventDefault();
        setShowLoading(true);
        ref.orderByChild('roomname').equalTo(room.roomname).once('value', snapshot => {
            if (snapshot.exists()) {
                return (
                    <div>
                        <Alert color="primary">
                            Freiend Already Exists
                        </Alert>
                    </div>
                );
            } else {
                const newRoom = firebase.database().ref('rooms/').push();
                newRoom.set(room);

                setShowLoading(false);
            }
        });
    };

    const onChange = (e) => {
        e.persist();
        setRoom({...room, [e.target.name]: e.target.value});
    }

    if(!auth.uid)return<Redirect to = '/'/>
    return (
        <Container className="addRoomContainer">
        <div>
            {showLoading &&
                <Spinner color="primary" />
            }
            <Jumbotron>
                <h2>Add Friend</h2>
                <Form onSubmit={save}>
                    <FormGroup>
                        <Label>Friend name</Label>
                        <Input type="text" name="roomname" id="roomname" placeholder="Enter friend name" value={room.roomname} onChange={onChange} />
                    </FormGroup>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Form>
            </Jumbotron>
            <RoomList/>
        </div>
        </Container>
    );
}

export default AddRoom;


 