import React from 'react';
import {
  compose,
  withProps,
  withHandlers,
  withStateHandlers,
  lifecycle,
} from 'recompose';
import { connect } from 'react-redux';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { setPosition, setAddress } from 'actions/place';

const mapDispatchToProps = (dispatch) => ({
  onSetPosition(value) {
    dispatch(setPosition(value));
  },
  onSetAddress(value) {
    dispatch(setAddress(value));
  },
});

// AIzaSyCENTFB2N6sE7J1loR1kSxgkQsPnRsfWGw
export default compose(
  connect(null, mapDispatchToProps),
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCENTFB2N6sE7J1loR1kSxgkQsPnRsfWGw',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: window.innerHeight - 150 }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
  withStateHandlers(
    () => ({
      marker: null,
      geocoder: null,
    }),
    {
      onSetMarker: () => (latLng) => ({
        marker: {
          latLng,
        },
      }),
      onSetGeocoder: () => (geocoder) => ({
        geocoder,
      }),
    },
  ),
  withHandlers({
    decodeLocation: ({ onSetMarker, geocoder, onSetPosition, onSetAddress }) => (latLng) => {
      onSetMarker(latLng);
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK') {
          if (results[1]) {
            onSetAddress(results[1].formatted_address);
            onSetPosition({
              lat: latLng.lat(),
              lng: latLng.lng(),
            });
          } else {
            console.log('No results found');
          }
        } else {
          console.log(`Geocoder failed due to: ${status}`);
        }
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      const { onSetGeocoder } = this.props;
      const geocoder = new window.google.maps.Geocoder();
      onSetGeocoder(geocoder);
    },
  })
)(({ marker, decodeLocation }) => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 46.469391, lng: 30.740883 }}
    defaultOptions={{ gestureHandling: 'greedy' }}
    onClick={({ latLng }) => decodeLocation(latLng)}
  >
    {marker && <Marker position={{ lat: marker.latLng.lat(), lng: marker.latLng.lng() }} />}
  </GoogleMap>
));
