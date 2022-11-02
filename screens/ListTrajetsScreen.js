import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState }  from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import BottomSheet from "../components/BottomSheet";
import { useDispatch, useSelector } from "react-redux";
import {
  isVisibleListTraj,
  isVisibleDeparture,
  isVisibleSelectTraj,
} from "../reducers/isVisible";

export default function ListTrajet() {
  const url = useSelector((state) => state.url.value);

  const [trajet, setTrajet] = useState([]);
  const [ligne, setLigne] = useState([]);

  const fetchAPI = async () => {
    const options = {
      headers: {
        Authorization: "a3241d36-8169-4f8b-840c-214b769f3771"
      }
    };

   await fetch(`https://api.navitia.io/v1/journeys?from=2.3036095;48.8877713&to=2.655400;48.542107`, options).then(
      reponseAPI => reponseAPI.json().then(
        reponseAPIJson =>{ 
          if(reponseAPIJson){
            // console.log('===================================================', reponseAPIJson.journeys[0].sections);
            // console.log(reponseAPIJson.journeys);
            let testMessage = reponseAPIJson.journeys[0].sections.map((data, i) => {
                return data
                // console.log(data.from);
            })
            // console.log(testMessage);
            setTrajet(testMessage)
          }}))
          

// let journey = await fetch(`http://${url}:3000/displayJourney`)
// let journeyJson = await journey.json()  
// setTrajet([...trajet, journeyJson])
console.log('here');


};

  useEffect(() => {
fetchAPI()
}, [])
// console.log(trajet);


  const dispatch = useDispatch();
  const goToSelectTrajet = () => {
    dispatch(isVisibleListTraj({ isVisibleListTrajet: false }));
    dispatch(isVisibleDeparture({ isVisibleDA: false }));
    dispatch(isVisibleSelectTraj({isVisibleSelectTrajet : true}))

  }
  let affichageLigne = []
  let value;

  const mapListAddress = trajet.map((data, i) => {
    // console.log('================>', data.type, i);
    let path = ''
   
if(data.type === 'street_network'){
  console.log(data.mode);
    path = `../assets/transport/${data.mode}.png`
      // affichageLigne.push(<Image key={i} style={styles.image1} source={{uri:"../assets/transport/walking.png", width:200,height:200}} />)
      affichageLigne.push(data.mode)
      return affichageLigne
    }else if(data.type === 'public_transport'){
      affichageLigne.push(data.display_informations.code)
      // value = affichageLigne.push(<Image style={styles.image1} source={require(`../assets/${data.display_informations.code}.png`)} />)
      return affichageLigne
    }else if(data.type === 'transfer'){
      affichageLigne.push(data.transfer_type)

      // value = affichageLigne.push(<Image style={styles.image1} source={require(`../assets/${data.transfer_type}.png`)} />)
      return affichageLigne
    }else if(data.type === 'waiting'){
      affichageLigne.push(data.type)

      // value = affichageLigne.push(<Image style={styles.image1} source={require(`../assets/${data.type}.png`)} />)
      return affichageLigne
      }
setLigne(mapListAddress)
  })
  console.log(mapListAddress[0]);
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
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => backToDA()}>
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
          <Text>56 boulevard Pereire, 75017 Paris</Text>
        </TouchableOpacity>
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

          <Text>41 Rue du Président Despatys, 77000 Melun</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container3}>
        <Text style={styles.suggests}>
          Suggérés
        </Text>
      </View>
      <View style={styles.container4}>
      <View style={styles.mapStyle}>
        <View style={styles.mapDirection}>
          <TouchableOpacity
            onPress={() =>
              goToSelectTrajet()
            }
          >
            <View>
              {mapListAddress[0]?.map(data=> { //Theo insert image
              return <Text>{data}</Text>})} 
              <Text>data</Text>
              </View>
             
            <Text style={{ fontWeight: "600" }}>
              {/* {data.nbrMembre} */}
              </Text>
            <Text>
              {/* {data.timer} */}
              </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* {mapListAddress} */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  globalContainer: {
    marginTop: -10,
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
  },
  locationArrow: {
    marginLeft: 10,
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
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
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
  suggests:{
   color: "white", 
   fontWeight: "600", 
   fontSize: 15 
  }
});
