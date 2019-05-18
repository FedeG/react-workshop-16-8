import React from 'react';
import { Image, Panel, Well } from 'react-bootstrap';

const Profile = () => (
  <Well>
    <Image src="https://imagekit.androidphoria.com/wp-content/uploads/clash-royale-pajaro-simpsons.jpg" responsive circle />
    <br />
    <Panel>
      <Panel.Heading> Federico Gonzalez </Panel.Heading>
      <Panel.Body>
        <p>Date: fruta</p>
        <p>asdsad: asdas</p>
        <p>asdasd: asdasd</p>
      </Panel.Body>
    </Panel>
  </Well>
);

export default Profile;
