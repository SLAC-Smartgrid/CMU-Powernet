import React from 'react';
import { render } from 'react-dom';
import SimpleExample from './simple';

import "../../bower_components/leaflet/dist/leaflet.css";
import "../../css/maps.css"

const examples = (
  <div>
    <SimpleExample />
  </div>
);

render(examples, document.getElementById('map-container'));
