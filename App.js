import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button, ScrollView, ActivityIndicator } from "react-native";
import { useEffect } from 'react/cjs/react.development';


export default function App() {
const [loading, setLoading] = useState(true);
const [arrival, setArrival] = useState("");
const [busNo, setBusNo] = useState("");
const [arrivalTime, setArrivalTime] = useState("");
const onPress = () => loadBusStopData();


const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139"

function loadBusStopData() {

  setLoading(true);

fetch(BUSSTOP_URL)
.then((response) => response.json())
.then((responseData) => {
  console.log("Original data:");
  console.log(responseData);
  const myBus = responseData.services.filter(
  (item) => item.no === '155'
  ) [0];
  console.log ("My bus:");
  console.log (myBus.next.time);
  setArrival(myBus.next.time)
  setBusNo(myBus.no)
  setArrivalTime(myBus.next.duration_ms / 60000)
  setLoading(false);


  
});
}

useEffect(() => {
const interval = setInterval(loadBusStopData, 2000);
return () => clearInterval(interval);

}, []);

return (
<View style={styles.container}>
<Text style={styles.bustitle}>{busNo}</Text>
  <Text style={styles.title}>Bus arrival time:</Text>
   <Text style={styles.title}>{loading ? <ActivityIndicator size="large" /> : arrival}</Text>
   <br />
   <Text style={styles.title}> Bus Arrival in:</Text>
   <Text style={styles.title}>{arrivalTime} minutes</Text>

    <TouchableOpacity style={styles.button} onPress={onPress}>
<Text>refresh!</Text>
  </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
button: {
backgroundColor: "green",
padding: 10,
margin: 10,
},

title: {
fontSize: 20,
fontWeight: 10000,
  },

  bustitle: {
    fontSize: 70,
    color: "red",
    fontWeight: 40000,
      },

});
