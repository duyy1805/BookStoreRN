import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,SafeAreaView,
          Dimensions, TouchableOpacity,Button,
          FlatList,Image,ImageBackground,NativeModules,Animated,ScrollView
} from 'react-native';
import {WebView} from 'react-native-webview'
import { NavigationContainer } from '@react-navigation/native';
import {Ionicons, AntDesign} from "@expo/vector-icons"
import B from './BookDetail'
import Library from './Library'
import { ProgressBar, Colors, Searchbar} from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
const Dev_Height = Dimensions.get('window').height
const Dev_width = Dimensions.get('window').width
 
class Home extends React.Component {
 
  constructor(props){
    super(props);
    this.state={
      items:[]
    }
    // this.state=items;
    // this.state={
    //   items:[
    //     {
    //       title1: "Other world for home",
    //       title2: "Jasmine warga",
    //       id:1,
    //       rating:4,
    //       language: 'English',
    //       description:"",
    //       uri:"https://cdn.amightygirl.com/catalog/product/cache/1/image/602f0fa2c1f0d1ba5e241f914e856ff9/o/t/other_words.jpg"
    //     },
    //     {
    //       title1: "Dead is like a wind",
    //       title2: "Yasuo",
    //       id:2,
    //       rating:4,
    //       language: 'English',
    //       description:"",
    //       uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_25w8CXqZ_ntCxktCHE4qtlojdtS6zD9kODzSNR5X4_Uzq317xYv1EjdPLUT6oCfjkQ4&usqp=CAU"
    //     },
    //     {
    //       title1: "Đéo roll ra kayle d m nó",
    //       title2: "Kayle top 8",
    //       id:3,
    //       rating:4.9,
    //       language: 'English',
    //       description:`Như 1 định mệnh, Morgana và người chị gái của cô Kayle được sinh ra trong 1 thế giới đầy xung đột. Cuộc chiến tranh Cổ Ngữ tàn khốc lan ra khắp vùng Valoran và Shurima, và có chiều hướng lan ra đỉnh núi Targon xa xôi. Cha mẹ của Morgana, Mihira và Kilam, khi nghe về nguồn sức mạnh thần thánh nơi đỉnh ngọn núi vĩ đại - đã không còn lựa chọn nào khác ngoài tham gia vào một chuyến hành trình đằng đẵng và gian khổ, với hi vọng cứu rỗi bộ tộc của mình.

    //       Dù rằng MIhira đang mang thai trong người nhưng đôi vợ chồng vẫn không hề lùi bước. Cuối cùng khi Runeterra đã chạm đến thiên giới, Kilam đã vô cùng ngạc nhiên khi Mihira được lựa chọn làm vật chủ cho Thượng Nhân Công lý. Họ quay về bộ tộc với sức mạnh mà họ đã tìm thấy và sự ra đời cặp song sinh - Morgana và Kayle. Dù vậy, quyền năng thượng giới trong Mihira bắt đầu thay đổi con người phàm trần cũng như tình yêu thương của bà. Bà thường phó mặc hai đứa con gái cho người cha, và rời đi để đáp lại tiếng gọi của chiến trận.`,
    //       uri:"https://img.wattpad.com/4b7c49778cb165f86b718916782fbb737ae53e2b/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f4941436155554138655a345551513d3d2d3837353730343038332e313630616136313635333931393335663734323436363734373938362e6a7067"
    //     },
    //     {
    //       title1: "Long tộc",
    //       title2: "Heimerdinger",
    //       id:4,
    //       rating:4.8,
    //       language: 'English',
    //       description:"",
    //       uri:"https://lh3.googleusercontent.com/proxy/WmosZVK4LDeFMeB1TPj-yix9wl4HV-shVwlqK2sg2Mmlp5EuBuU8Ok74f9TIw8ucu5jCemLTXyXMHCCMU24S1H6TE4orXAIhmHiRqY9S0evUdzom5KF4W7q-sy3WBoPkS4jEfjtfjNi6pBnDIYtlMts_dkdlB9ZqTLx1Uca-Mw"
    //     },
    //     {
    //       title1: "Thần tài",
    //       title2: "Tahm Kench tinh anh thần tài",
    //       id:5,
    //       rating:4,
    //       language: 'English',
    //       description:"",
    //       uri:"https://lh3.googleusercontent.com/proxy/7XL6XZBXXF7ujB4WeXDmhL4bsl91hTRrCAoVbOinnPNonUocYg0dGraOS6sCZtg_GBz8Suw9Fe4Lrzbq92gj48IcScnfogH7j7fmWY_JKHvOd6i0D6fJNnZoCbvQ51yO8YigZUY1BH3XdkGtg2Xgl5Zub6IIdaP-Pg"
    //     },
    //     {
    //       title1: "Dead is like a wind",
    //       title2: "Yasuo",
    //       id:6,
    //       rating:4,
    //       language: 'English',
    //       description:"",
    //       uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_25w8CXqZ_ntCxktCHE4qtlojdtS6zD9kODzSNR5X4_Uzq317xYv1EjdPLUT6oCfjkQ4&usqp=CAU"
    //     }
    //   ]
    // }
  }
componentDidMount(){
  const getItem=()=>{
    fetch('http:192.168.8.100:5000/api/book/show')
      .then((res)=>res.json())
      .then((data)=>{
        // console.log(data)
        this.setState({
          items:data
        })
      }
    )
  }
  getItem();
  
};
  _render_item = ({item,index}) => {
    return(
      <TouchableOpacity onPress = {() => this.props.navigation.navigate("BookDetail", { book : item })}>
        <ImageBackground source= {{uri:item.image}} imageStyle={{borderRadius:25}} style={{height:"100%",width:140}}> 
          <Text style={{marginTop:"100%",color:"#FFF",fontSize:15,marginLeft:10,fontWeight:"bold"}}>{item.title1}</Text>     
          <Text style={{color:"#FFF",fontSize:14,marginLeft:10}}>{item.author}</Text>     
        </ImageBackground>
      </TouchableOpacity>
    )
  }

  _render_item2 = ({item,index}) => {
    return(
      <View style={{ flexDirection:"row", width:"100%"}}>
        <View style= {{height:"100%", width:"20%",marginLeft:"7%"}}>
          <TouchableOpacity onPress = {() => this.props.navigation.navigate("BookDetail", { book : item })}>
            <ImageBackground source={{uri:item.image}} imageStyle={{borderRadius:15}} style={{height:100,width:"100%"}}/>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{fontWeight:"bold", fontSize:20, marginLeft:"10%", marginTop:"5%"}}>{item.title1}</Text>
          <Text style={{marginLeft:"10%", marginTop:"5%"}}>{item.author}</Text>
          <ProgressBar style={{height:3, width:100,marginLeft:"13%",marginTop:"8%"}} progress = {0.1}/>
        </View>
      </View>
    )
  }

  render(){
    return (
      
      <SafeAreaView style = {{
        height : Dev_Height,
        width : Dev_width
      }}> 
        <View style = {{ height : "7%", width: "100%",flexDirection: "row", alignItems:"center",marginTop:"5%"}}>
          <TouchableOpacity style = {{marginLeft:"6%"}}>
                    <Ionicons name = "ios-menu" size = {32} color= "#7FA1F8"/>
          </TouchableOpacity>
          <TouchableOpacity style = {{marginLeft:"70%"}}>
                    <Ionicons name = "refresh-outline" size = {32} color= "#7FA1F8"/>
          </TouchableOpacity>
        </View>

        <View style={{height : "8%", width: "100%"}}>
          <Text style ={{fontSize:20,fontWeight:"bold",marginLeft:"6%", marginTop:"2%"}}>Books IU hot!!</Text>
        </View>

        <View>
          <FlatList 
            data={this.state.items}
            renderItem={this._render_item}
            keyExtractor={item => item._id.toString()}
            horizontal={true}
            style={{marginLeft:"7%", height:"30%",width:"100%"}}
            ItemSeparatorComponent={
              () => <View style={{width:13,height:"30%"}}/>
            }
          />
        </View>
        
        <View>
          <View style={{marginTop:10, flexDirection:"row", width:"100%"}}>
            <FlatList 
              data={this.state.items}
              renderItem={this._render_item2}
              keyExtractor={item => item._id.toString()}
              style={{marginLeft:"7%", height:300,width:"100%"}}
              ItemSeparatorComponent={
                () => <View style={{width:"30%",height:20}}/>
              }
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}



const LineDivider = () => {
  return (
      <View style={{ width: 1, paddingVertical: 5 }}>
          <View style={{ flex: 1, borderLeftColor: "#EFEFF0", borderLeftWidth: 1 }}></View>
      </View>
  )
}
const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerMode: 'none'}} name="Home1" component={Home} />
      <Stack.Screen options={{headerMode: 'none'}} name="BookDetail" component={B.BookDetail} />
      <Stack.Screen options={{headerMode: 'none'}} name="ReadBook" component={B.readBook} />
    </Stack.Navigator>
  );
}