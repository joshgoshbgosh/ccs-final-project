// MyGoogleMaps.js
import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';
import './map.css';
import styled from 'styled-components';

import AutoComplete from './Autocomplete';
import Marker from './Marker';

const Wrapper = styled.main`
  width: 100%;
  height: 500px;
`;

class MyGoogleMap extends Component {


    state = {
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        geoCoder: null,
        places: [],
        center: [],
        zoom: 9,
        address: '',
        draggable: true,
        lat: null,
        lng: null
    };

    componentWillMount() {
        this.setCurrentLocation();
    }


    onMarkerInteraction = (childKey, childProps, mouse) => {
        this.setState({
            draggable: false,
            lat: mouse.lat,
            lng: mouse.lng
        });
    }
    onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
        this.setState({ draggable: true });
        this._generateAddress();
    }

    _onChange = ({ center, zoom }) => {
        this.setState({
            center: center,
            zoom: zoom,
        });

    }

    _onClick = (value) => {
        this.setState({
            lat: value.lat,
            lng: value.lng
        });
    }

    apiHasLoaded = (map, maps) => {
        this.setState({
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        });

        this._generateAddress();
    };

    addPlace = (place) => {
        this.setState({
            places: [place],
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        });
        this._generateAddress()
    };

    _generateAddress() {
        const {
            mapApi
        } = this.state;

        const geocoder = new mapApi.Geocoder;

        geocoder.geocode({ 'location': { lat: this.state.lat, lng: this.state.lng } }, (results, status) => {
            console.log(results);
            console.log(status);
            if (status === 'OK') {
                if (results[0]) {
                    this.zoom = 12;
                    this.setState({ address: results[0].formatted_address });
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }

        });
    }

    // Get Current Location Coordinates
    setCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    center: [position.coords.latitude, position.coords.longitude],
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
    }

    render() {
        const {
            places, mapApiLoaded, mapInstance, mapApi,
        } = this.state;


        return (
            <Wrapper>
            <div className="map_bar_top col-lg-12 col-xs-12 ">
            <p className="map-label">MAP</p>
            </div>
                {mapApiLoaded && (
                    <div>
                        <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
                    </div>
                )}
                <GoogleMapReact
                    center={this.state.center}
                    zoom={this.state.zoom}
                    draggable={this.state.draggable}
                    onChange={this._onChange}
                    onChildMouseDown={this.onMarkerInteraction}
                    onChildMouseUp={this.onMarkerInteractionMouseUp}
                    onChildMouseMove={this.onMarkerInteraction}
                    onChildClick={() => console.log('child click')}
                    onClick={this._onClick}
                    bootstrapURLKeys={{
                        key: process.env.REACT_APP_GOOGLE_PLACES_API_KEY,
                        libraries: ['places', 'geometry'],
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
                >


                    <Marker
                        text={this.state.address}
                        lat={this.state.lat}
                        lng={this.state.lng}
                    />


                </GoogleMapReact>

                <div className="bottom">
                <div className="info-wrapper">
                    <div className="map-details">Latitude: <span>{this.state.lat}</span>, Longitude: <span>{this.state.lng}</span></div>
                    <div className="map-details">Zoom: <span>{this.state.zoom}</span></div>
                    <div className="map-details">Address: <span>{this.state.address}</span></div>
                </div>
                <div>
                <a className="home-button" href="/">HOME MENU</a>
                </div>
                </div>

                <div className="bottom_bar col-lg-12 col-xs-12 ">

                </div>
            </Wrapper >
        );
    }
}

export default MyGoogleMap;
