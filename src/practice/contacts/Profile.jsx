/* eslint-disable */
import React from 'react';
import { Image, Panel, Well } from 'react-bootstrap';

import WithLoading from './loading.hoc';

const Profile = ({ name, date, text, comment }) => (
  <Well>
    <Image src="https://imagekit.androidphoria.com/wp-content/uploads/clash-royale-pajaro-simpsons.jpg" responsive circle />
    <br />
    <Panel>
      <Panel.Heading>{name}</Panel.Heading>
      <Panel.Body>
        <p>{`Date: ${date}`}</p>
        <p>{text}</p>
        <p>{comment}</p>
      </Panel.Body>
    </Panel>
  </Well>
);

export default WithLoading(
  Profile,
  props => props.hasOwnProperty('name') && props.name.length > 0
);
