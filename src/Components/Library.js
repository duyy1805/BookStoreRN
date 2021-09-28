import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,
          Dimensions, TouchableOpacity,Button,
          FlatList,Image,ImageBackground,RefreshControl,ActivityIndicator
} from 'react-native';
import {WebView} from 'react-native-webview'
import { NavigationContainer } from '@react-navigation/native';
import {Ionicons, AntDesign} from "@expo/vector-icons"
import B from './BookDetail'
import { ProgressBar, Colors, Searchbar} from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
const Dev_Height = Dimensions.get('window').height
const Dev_width = Dimensions.get('window').width
 
class Library extends React.Component {
 
  constructor(props){

    
    super(props);
    this.state={
      items:[],
      refreshing:true
    }
  }
  getItem=()=>{
    fetch('http:192.168.8.102:5000/api/book/show/downloaded')
      .then((res)=>res.json())
      .then((data)=>{
        // console.log(data)
        this.setState({
          items:data,
          refreshing:false       
        })
      }
    )
  }
  componentDidMount(){
    this.getItem();
  };
// componentDidUpdate(){
//   if(this.state.items == null){
//     const getItem=()=>{
//       fetch('http:192.168.8.102:5000/api/book/show/downloaded')
//         .then((res)=>res.json())
//         .then((data)=>{
//           console.log(data)
//           this.setState({
//             items:data
//           })
//         }
//       )
//     }
//     getItem();
//   }
// };

  onRefresh = () => {
    //Clear old data of the list
    this.state.items = null
    //Call the Service to get the latest data
    this.getItem();
  };

  _render_item = ({item,index}) => {
    return(
      <TouchableOpacity onPress = {() => this.props.navigation.navigate("BookDetail", { book : item })}>
        <ImageBackground source= {{uri:item.image}} imageStyle={{borderRadius:25}} style={{height:250,width:140,margin:10}}> 
          <Text style={{marginTop:"100%",color:"#FFF",fontSize:15,marginLeft:10,fontWeight:"bold"}}>{item.title1}</Text>     
          <Text style={{color:"#FFF",fontSize:14,marginLeft:10}}>{item.author}</Text>     
        </ImageBackground>
      </TouchableOpacity>
    )
  }
  render(){
    return (
      
      // <SafeAreaView style = {{
      //   height : Dev_Height,
      //   width : Dev_width
      // }}> 
      <>
        <View style = {{ height : "15%", width: "100%",paddingTop:20,flexDirection: "row",justifyContent:'center',alignItems:"center",backgroundColor:"#FFFFFF"}}>
          <Text style ={{fontSize:20,fontWeight:"bold"}}>Library</Text>
          {/* <TouchableOpacity onPress={() => this.setState({items: null})} style = {{marginLeft:"70%"}}>
                    <Ionicons name = "refresh-outline" size = {32} color= "#7FA1F8"/>
          </TouchableOpacity> */}
        </View>
        <View>
          {this.state.refreshing ? <ActivityIndicator /> : null}
          <FlatList 
            data={this.state.items}
            renderItem={this._render_item}
            keyExtractor={item => item._id.toString()}
            numColumns={2}
            style={{marginLeft:"7%", height:620,width:"100%"}}
            ItemSeparatorComponent={
              () => <View style={{width:13,height:13}}/>
            }
            refreshControl={
              <RefreshControl
                //refresh control used for the Pull to Refresh
                refreshing = {this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          />
        </View>
      </>
      // </SafeAreaView>
    )
  }
}


const Stack = createStackNavigator();
const readBook =() => {
  return(
  <WebView source={{ uri: "https://reactnativemaster.com/wp-content/uploads/2020/02/React-native-document-viewer-pdf-sample.pdf" }} />
  )
}
export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerMode: 'none'}} name="Library_1" component={Library} />
      <Stack.Screen options={{headerMode: 'none'}} name="BookDetail" component={B.BookDetail} />
      <Stack.Screen options={{headerMode: 'none'}} name="ReadBook" component={B.readBook} />
    </Stack.Navigator>
  );
}