import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import BottomSheet from "../components/BottomSheet";
import { useDispatch, useSelector } from "react-redux";
import {
  isVisibleListTraj,
  isVisibleDeparture,
  isVisibleSelectTraj,
} from "../reducers/isVisible";
import { addDeparture } from "../reducers/trajets";

export default function ListTrajet() {
  const dispatch = useDispatch();

  const options = {
    headers: {
      Authorization: "3e7944d3-0cff-4af5-a721-a09dbfaa01bd",
    },
  };

  const url = useSelector((state) => state.url.value);

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

  const citySelected = (city, step) => {
    if (step === "depart") {
      setDepart("");
      setDepart(city.places);
      setCoordDepart(city.coord.stop_area.coord);
      dispatch(
        addDeparture({
          depLon: city.coord.stop_area.coord.lon,
          depLat: city.coord.stop_area.coord.lat,
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
  // console.log(depart);
  // console.log(departurePossible);
  const fetchAPI = async () => {
    await fetch(
      `https://api.navitia.io/v1/journeys?from=${coordSelected.depLon};${coordSelected.depLat}&to=${coordSelected.arrLon};${coordSelected.arrLat}`,
      options
    ).then((reponseAPI) =>
      reponseAPI.json().then((reponseAPIJson) => {
        if (reponseAPIJson) {
          // console.log('===================================================', reponseAPIJson.journeys[0].sections);
          // console.log(reponseAPIJson.journeys);
          let gettingJourney = reponseAPIJson.journeys[0].sections?.map(
            (data, i) => {
              return data;
              // console.log(data.from);
            }
          );
          // console.log(testMessage);
          setTrajet(gettingJourney);
        }
      })
    );
  }
  const writingOnDeparture = (value)=>{
    setDepart(value)
    setOnDepartureInput(true)
    // let journey = await fetch(`http://${url}:3000/displayJourney`)
    // let journeyJson = await journey.json()
    // setTrajet([...trajet, journeyJson])
    // console.log('here');
  };

  useEffect(() => {
    fetchAPI();
  }, []);
  // console.log(trajet);

  const goToSelectTrajet = () => {
    dispatch(isVisibleListTraj({ isVisibleListTrajet: false }));
    dispatch(isVisibleDeparture({ isVisibleDA: false }));
    dispatch(isVisibleSelectTraj({ isVisibleSelectTrajet: true }));
  };
  let affichageLigne = [];
  let value;

  const mapListAddress = trajet?.map((data, i) => {
    // console.log('================>', data.type, i);
    let path = "";

    if (data.type === "street_network") {
      // console.log(data.mode);
      path = `../assets/transport/${data.mode}.png`;
      // affichageLigne.push(<Image key={i} style={styles.image1} source={{uri:"../assets/transport/walking.png", width:200,height:200}} />)
      affichageLigne.push(data.mode);
      return affichageLigne;
    } else if (data.type === "public_transport") {
      affichageLigne.push(data.display_informations.code);
      // value = affichageLigne.push(<Image style={styles.image1} source={require(`../assets/${data.display_informations.code}.png`)} />)
      return affichageLigne;
    } else if (data.type === "transfer") {
      affichageLigne.push(data.transfer_type);

      // value = affichageLigne.push(<Image style={styles.image1} source={require(`../assets/${data.transfer_type}.png`)} />)
      return affichageLigne;
    } else if (data.type === "waiting") {
      affichageLigne.push(data.type);

      // value = affichageLigne.push(<Image style={styles.image1} source={require(`../assets/${data.type}.png`)} />)
      return affichageLigne;
    }
    setLigne(mapListAddress);
  });
  // console.log(mapListAddress[0]);
  // console.log(mapListAddress);
  // return (
  // <View key={i} style={styles.mapStyle}>
  //   <View style={styles.mapDirection}>
  //     <TouchableOpacity
  //       onPress={() =>
  //         goToSelectTrajet()
  //       }
  //     >
  //       <Text>affichageLigne</Text>
  //       <Text style={{ fontWeight: "600" }}>{data.nbrMembre}</Text>
  //       <Text>{data.timer}</Text>
  //     </TouchableOpacity>
  //   </View>
  // </View>
  //   )
  // })
  /* retour DepartureArrival*/

  const backToDA = () => {
    dispatch(isVisibleListTraj({ isVisibleListTrajet: false }));
    dispatch(isVisibleDeparture({ isVisibleDA: true }));
  };
  return (
    <View style={styles.globalContainer}>
      <View style={styles.container0}>
        <TouchableOpacity>
        <FontAwesome
              onPress={() => backToDA()}
              name={"arrow-circle-left"}
              size={40}
              color={"#f4a261"}
            />
         </TouchableOpacity>
        <TouchableOpacity>
        <FontAwesome
              name={"play-circle-o"}
              size={40}
              color={"#f4a261"}
            />
        </TouchableOpacity>
      </View>
      <View style={styles.container1}>
        
        <View style={styles.buttonDepart}>
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
        </View>
      </View>
      <View style={styles.container2}>
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
        <Text style={styles.suggests}>Suggérés</Text>
      </View>
      <View style={styles.container4}>
        <View style={styles.mapStyle}>
          <View style={styles.mapDirection}>
            <TouchableOpacity onPress={() => goToSelectTrajet()}>
              <View>
                {mapListAddress[0]?.map((data, i) => {
                  //Theo insert image
                  // console.log(data);
                  // let path = require(`../assets/transport/${data}.png`)
                  return (
                    <View key={i}>
                      {/* <Image source={path} style={styles.ligne} />  */}
                    </View>
                  );
                })}
                <Text>data</Text>
              </View>

              <Text style={{ fontWeight: "600" }}>
                {/* {data.nbrMembre} */}
              </Text>
              <Text>{/* {data.timer} */}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* {mapListAddress} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    width: "100%",
    justifyContent: "center",
    borderWidth:1,
    borderColor: "red"
  },
  container0:{
    
    marginBottom: 15,
    height: 40,
    borderWidth: 1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  container1: {
    flexDirection: "row",
    justifyContent:"center",
    width:"100%",
    
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
  },
  locationArrow: {
    marginLeft: 10,
  },
  container2: {
    flexDirection: "row",
    justifyContent:'center',
    width: '100%',
    borderColor: "red",

  },
  buttonArrivee: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
    width: "80%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    
  },
  pin: {
    marginLeft: 10,
  },
  container3: {
    marginBottom: 10,
    fontWeight: "600",
  },
  container4: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    height: "60%",
  },
  mapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mapDirection: {
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "space-between",
    borderColor: "grey",
  },
  suggests: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  ligne: {
    width: 40,
    height: 40,
  },
  popSuggest: {
    
  },
  buttonSuggere: {
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
    width: "80%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
  },
  input:{
    width: '100%'
  },
  resultSuggest:{
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    height: "60%",
    justifyContent:"center",
    alignItems: "center",
  }
});
