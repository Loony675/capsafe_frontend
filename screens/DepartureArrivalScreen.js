import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

import React, {useState, useEffect} from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import BottomSheet from "../components/BottomSheet";
import { useDispatch, useSelector } from "react-redux";
import { isVisibleDeparture, isVisibleListTraj } from "../reducers/isVisible";
import { positionDeparture, positionArrival } from "../reducers/position";
import { addDeparture, addArrival } from "../reducers/trajets";

export default function DepartureArrival() {
  const dispatch = useDispatch();
  const rechercher =() => {
    dispatch(isVisibleDeparture({isVisibleDA:false}));
    dispatch(isVisibleListTraj({ isVisibleListTrajet: true }))
    dispatch(positionDeparture({positionDeparture : {latitude: 48.884674072265625, longitude: 2.2963457107543945} }))
    dispatch(positionArrival({positionArrival : {latitude: 48.54366683959961, longitude: 2.6590490341186523} }))
  }
  const pinPositionDeparture= useSelector((state) => state.position.pinDeparture)
  const pinPositionArrival= useSelector((state) => state.position.pinArrival)


  const [trajet, setTrajet] = useState([]);
  const [ligne, setLigne] = useState([]);
  const [depart, setDepart] = useState("");
  const [arrivee, setArrivee] = useState("");
  const [coordDepart, setCoordDepart] = useState();
  const [coordArrivee, setCoordArrivee] = useState();

  const [onDepartureInput, setOnDepartureInput] = useState(false);
  const [onArrivalInput, setOnArrivalInput] = useState();


  const [departurePossible, setDeparturePossible] = useState([]);
  const [arrivalPossible, setArrivalPossible] = useState([]);
  const coordSelected = useSelector((state) => state.trajets.value);


  const options = {
    headers: {
      Authorization: "3e7944d3-0cff-4af5-a721-a09dbfaa01bd",
    },
  };


  useEffect(() => {
    fetch(
      `https://api.navitia.io/v1/coverage/fr-idf/places?q=${depart}`,
      options
    ).then((data) =>
      data.json().then((data) => {
        let affichageDeparturePossible = data.places?.map((places) => {
          // console.log(places);
          return { places: places.name, coord: places };
        });
        // console.log(data.places[0].name);
        setDeparturePossible(affichageDeparturePossible);
      })
    );
  }, [depart]);

  useEffect(() => {
    fetch(
      `https://api.navitia.io/v1/coverage/fr-idf/places?q=${arrivee}`,
      options
    ).then((data) =>
      data.json().then((data) => {
        let affichageArrivalPossible = data.places?.map((places) => {
          console.log(places);
          return { places: places.name, coord: places };
        });
        // console.log(data.places[0].name);
        setArrivalPossible(affichageArrivalPossible);
      })
    );
  }, [arrivee]);

  // console.log(depart);
  // console.log(departurePossible);

  const writingOnDeparture = (value)=>{
    setDepart(value)
    setOnDepartureInput(true)
    // let journey = await fetch(`http://${url}:3000/displayJourney`)
    // let journeyJson = await journey.json()
    // setTrajet([...trajet, journeyJson])
    // console.log('here');
  };


  // console.log(trajet);

  const citySelected = (city, step) => {
    if (step === "depart") {
      setDepart("");
      setDepart(city?.places);
      setCoordDepart(city?.coord.stop_area.coord);
      console.log(city);
      dispatch(
        addDeparture({
          depLon: city?.coord.stop_area.coord.lon,
          depLat: city?.coord.stop_area.coord.lat,
        })
      );
      setOnDepartureInput(false)
    } else {
      setArrivee("");
      setArrivee(city.places);
      setCoordArrivee(city.coord.stop_area.coord);
      dispatch(
        addArrival({
          arrLon: city.coord.stop_area.coord.lon,
          arrLat: city.coord.stop_area.coord.lat,
        })
      );
    }
  };

  return (
    <View style={styles.globalContainer}>
      <View style={styles.container1}>
        <TouchableOpacity
          onPress={() => dispatch(isVisibleDeparture({ isVisibleDA: false }))}
        >
          <View style={styles.arrowLeft}>
            <FontAwesome
              name={"arrow-left"}
              size={20}
              color={"rgb(170,170,170)"}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDepart}>
          <FontAwesome
            name={"location-arrow"}
            size={25}
            color={"rgba(71, 139, 188, 1)"}
            style={styles.locationArrow}
          />
                    <TextInput
            placeholder="Départ"
            onChangeText={(value) => writingOnDeparture(value)}
            value={depart}
            style={styles.input}
          />
          <View style={styles.popSuggest}>
          {onDepartureInput && departurePossible?.map((city, i) => (
              <TouchableOpacity
                key={i}
                style={styles.buttonSuggere}
                onPress={() => citySelected(city, "depart")}
              >
              <View style={styles.resultSuggest}>
                 <Text>{city.places}</Text>
              </View>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        {/* element invisible servant au centrage du container1 */}
        <View style={styles.arrowLeftVoid}>
          <FontAwesome
            name={"arrow-left"}
            size={20}
            color={"rgba(255,255,255,0)"}
          />
        </View>
        <TouchableOpacity style={styles.buttonArrivee}>
          <FontAwesome
            name={"map-marker"}
            size={25}
            color={"rgba(71, 139, 188, 1)"}
            style={styles.pin}
          />

                    
<TextInput
            placeholder="Arrivée"
            onChangeText={(value) => setArrivee(value)}
            value={arrivee}
            style={styles.input}
          />
          <View style={styles.popSuggest}>
            {arrivalPossible?.map((city, i) => (
              <TouchableOpacity
                key={i}
                style={styles.buttonSuggere}
                onPress={() => citySelected(city, "arrivee")}
              >
                <View style={styles.resultSuggest}>
                  <Text>{city.places}</Text>
                  </View>
              </TouchableOpacity>

            ))}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container3}>
        <TouchableOpacity
          onPress={() =>
            rechercher()}
          style={styles.buttonRechercher}
        >
          <Text style={styles.textRechercher}>Rechercher</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    marginTop:20,
    height: "40%",
    width: "80%",
    justifyContent: "center",

  },
  container1: {
    flexDirection: "row",

  },
  arrowLeft: {
    marginRight: 10,
    marginTop: 10,
  },
  buttonDepart: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    width: "80%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    shadowOffset:{width:0, height:3},
    shadowColor:'black',
    shadowOpacity:0.7,
    shadowRadius:3,
  },
  locationArrow: {
    marginLeft: 10,
  },
  textDepart: {
    marginLeft: "30%",
    fontWeight:'600',
    fontSize: 16,

  },
  container2: {
    flexDirection: "row",
  },
  arrowLeftVoid: {
    marginRight: 10,
  },
  buttonArrivee: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    width: "80%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    shadowOffset:{width:0, height:3},
    shadowColor:'black',
    shadowOpacity:0.7,
    shadowRadius:3,
  },
  pin: {
    marginLeft: 10,
  },
  textArrivee: {
    marginLeft: "32%",
    fontWeight:'600',
    fontSize: 16,

  },
  container3: {

  },
  buttonRechercher:{
    width:'50%',
    marginLeft:'45%',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(195,227,163)",
    height: 40,
    borderRadius: 10,
    shadowOffset:{width:0, height:3},
    shadowColor:'black',
    shadowOpacity:0.7,
    shadowRadius:3,
  },
  textRechercher:{
    fontWeight:'600',
    fontSize: 16,
  },
  input:{
    width: '100%'
  },
});
