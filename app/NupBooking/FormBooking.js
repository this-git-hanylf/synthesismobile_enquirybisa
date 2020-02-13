//import liraries
import React from "react";
import {
    StatusBar,
    ActivityIndicator,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    StyleSheet,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    Platform,
    SafeAreaView,
    View,
    FlatList,
    Modal,
    ListView,
    Alert,
    // Picker
} from "react-native";
import {
    Container,
    Header,
    Content,
    Button,
    Icon,
    Text,
    Title,
    Left,
    Right,
    Body,
    Input,
    Item,
    Footer,
    FooterTab,
    Badge,
    Picker,
    Col,
    ListItem,
    Label
} from "native-base";

// import NavigationService from "@Service/Navigation";

import { Actions } from "react-native-router-flux";

import { Style, Colors, Fonts } from "../Themes/";
import Styles from "./Style";
import { _storeData, _getData, _navigate } from "@Component/StoreAsync";
import { urlApi } from "@Config/services";
import numFormat from '@Component/numFormat'
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
// import ImageViewer from 'react-native-image-zoom-viewer';

//const {width, height} = Dimensions.get('window')
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
//     "window"
// );
const { height, width } = Dimensions.get('window')
let isMount = false;


class FormBooking extends React.Component {
    constructor(props) {
        super(props);
        // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            fullname:'',
            mobilephone:'',
            email:'',
            nik:'',
            npwp:'',
            pictUrlKtp: '',
            pictUrlNPWP: '',
            replaceFoto: "file:///urbanAPI/images/noimage-min.png",
            isLoaded: true,

        };
        // console.log()
        isMount=true
      
        this.showAlert = this.showAlert.bind(this);

      

    }

    async componentDidMount() {
        isMount = true;
        // const dataPrev = this.props.prevItems;
        // console.log('dataprev',dataPrev);
       

        const data = {
            lot_type: this.props.prevItems.lot_type,
            nama_tower: this.props.prevItems.nama_tower,
            nama_unit: this.props.prevItems.nama_unit,
            project_descs: this.props.prevItems.project_descs,
            property_cd: this.props.prevItems.property_cd,
            qty: this.props.prevItems.qty,
            total: this.props.prevItems.total
        };
        console.log('data',data);

        this.setState(data, () => {
           
        });
    }

    componentWillUnmount(){
      // this.setState({isMount:false})
      isMount =false
    }

    validating = validationData => {
        const keys = Object.keys(validationData);
        const errorKey = [];
        let isValid = false;

        keys.map((data, key) => {
            if (validationData[data].require) {
                let isError =
                    !this.state[data] || this.state[data].length == 0
                        ? true
                        : false;
                let error = "error" + data;
                errorKey.push(isError);
                this.setState({ [error]: isError });
            }
        });

        for (var i = 0; i < errorKey.length; i++) {
            if (errorKey[i]) {
                isValid = false;
                break;
            }
            isValid = true;
        }

        return isValid;
    };

    // showAlert = (key) =>{
    //     alert('tes')
    // }
    showAlert = (key) => {
        Alert.alert(
            "Select a Photo",
            "Choose the place where you want to get a photo",
            [
                { text: "Gallery", onPress: () => this.fromGallery(key) },
                { text: "Camera", onPress: () => this.fromCamera(key) },
                {
                    text: "Cancel",
                    onPress: () => console.log("User Cancel"),
                    style: "cancel"
                }
            ],
            { cancelable: false }
        );
    };

    fromCamera(key) {
        ImagePicker.openCamera({
            cropping: true,
            width: 600,
            height: 500
        })
            .then(image => {
                console.log("received image", image);

                this.setState({ [key]: { uri: image.path } });
            })
            .catch(e => console.log("tag", e));
    }

    fromGallery(key) {
        ImagePicker.openPicker({
            multiple: false,
            width: 600,
            height: 500
        })
            .then(image => {
                console.log("received image", image);

                this.setState({ [key]: { uri: image.path } });
            })
            .catch(e => console.log("tag", e));
    }

    submit = () => {
        this.setState({ isLoaded: !this.state.isLoaded });
     
        let filektp = "";
        let filenpwp ="";
        // RNFetchBlob.wrap(
        //     this.state.pictUrlKtp.uri.replace("file://", "")
        // );
       
        if(this.state.pictUrlKtp.length == 0 ){
            console.log('replace',this.state.replaceFoto)
            // filektp = "@Asset/images/icon/dropdown.png";
            filektp = "./img/noimage.png";
            // "file:///data/user/0/com.ifcasoftware.urban/cache/react-native-image-crop-picker/image-7db81647-c261-4066-8e0e-46a4417e15e24941063510417621352.jpg"
            // "RNFetchBlob-file:///data/user/0/com.ifcasoftware.urban/cache/react-native-image-crop-picker/image-7db81647-c261-4066-8e0e-46a4417e15e24941063510417621352.jpg"
            // filektp = this.state.replaceFoto;
            // filektp = RNFetchBlob.wrap(
            //     this.state.replaceFoto
            // );
            console.log('pic nul',this.state.pictUrlKtp)
            // this.state.replaceFoto.uri.replace("file://", "")
        }else{
            // alert('not null')
            filektp = RNFetchBlob.wrap(
                this.state.pictUrlKtp.uri.replace("file://", "")
            );
            console.log('pic not nul',this.state.pictUrlKtp)
            // this.state.pictUrlKtp.uri.replace("file://", "")
        }

        if(this.state.pictUrlNPWP.length == 0 ){
            console.log('replace',this.state.replaceFoto)
            filenpwp = "./img/noimage.png";
            console.log('pic nul',this.state.pictUrlKtp)
        }else{
            filenpwp = RNFetchBlob.wrap(
                this.state.pictUrlNPWP.uri.replace("file://", "")
            );
            console.log('pic not nul',this.state.pictUrlNPWP)
        }
            
            // Do something

        // let filenpwp = RNFetchBlob.wrap(
        //     this.state.pictUrlNPWP.uri.replace("file://", "")
        // );

        const {
            fullname,
            mobilephone,
            email,
            nik,
            npwp,
            lot_type,
            nama_tower,
            nama_unit,
            project_descs,
            property_cd,
            qty,
            total
           
        } = this.state;

        const frmData = {
            fullname: fullname,
            mobilephone: mobilephone,
            email: email,
            nik: nik,
            npwp:npwp,
            //---------foto attachment
            pictUrlKtp: filektp, //ktp
            pictUrlNPWP: filenpwp,
            //---------end foto attachment
            lot_type: lot_type,
            nama_tower:nama_tower,
            nama_unit: nama_unit,
            project_descs: project_descs,
            property_cd: property_cd,
            qty: qty,
            total: total
        };
        

        const isValid = this.validating({
            // email: { require: true },
            // fullname: { require: true },
            // // nik: { require: true },
            // nohp: { require: true },
            // selectedType: { require: true },
            // selectedProject: { require: true }
        });

        let fileNameKtp = "";
        if(this.state.pictUrlKtp.length == 0){
            console.log(this.state.pictUrlKtp.length);
             fileNameKtp = "./img/noimage.png";
        }else{
             fileNameKtp = "KTP_BookingPriorty_"+nik+".png";
        }

        let fileNameNpwp = "";
        if(this.state.pictUrlNPWP.length == 0){
            console.log(this.state.pictUrlNPWP.length);
            fileNameNpwp = "./img/noimage.png";
        }else{
            fileNameNpwp = "npwp_BookingPriorty_" + nik + ".png";
        }
        

        
        // console.log('filenamektp', nik);
        
        // let fileNameBukuTabungan = "bukutabungan_RegisAgent_" + nik + ".png";
        // let fileNameSuratAnggota= "suratanggota_RegisAgent_" + nik + ".png";

       
        

        console.log('saveFormNUP', frmData);
        // console.log('leng nik',this.state.nik.length);
        console.log('leng foto ktp',this.state.pictUrlKtp.length);
        // if(this.state.pictUrlKtp.length == 7 || filektp.length == 7){
        //     console.log(this.state.pictUrlKtp.length)
        //     alert('panjang 7')
        // }else{
        //     console.log(this.state.pictUrlKtp.length)
        //     alert('lebih dari 7')
        // }

        

        // let fileName = "KTP_RegisAgent.png";
        // let fileImg = "";
        // console.log('pic ktp', pictUrlKtp);
        // if ( pictUrlKtp || pictUrlNPWP ) {
        //     // console.log('pic ktp', pictUrlKtp)
        //         this.setState({ errors: false })
        //         alert('gak error');
        //         console.log('gak error');
               
        //     } else {
        //         this.setState({ errors: true })
        //         alert("Please upload attachments")
        //         console.log('error')
        //     }
       
        // if(filektp != "" || filektp != null){
        //     console.log('filektp', filektp)
        // }
// 
        // if ( isValid ) {
        //     RNFetchBlob.fetch(
        //         "POST",
        //         urlApi + "c_auth/SignUpAgent",
        //         {
        //             "Content-Type": "multipart/form-data"
        //         },
        //         [
        //             // { name: "photo", filename: fileName, data: fileImg },
        //             { name: "photoktp", filename: fileNameKtp, data: filektp},
        //             { name: "photonpwp", filename: fileNameNpwp, data: filenpwp },
        //             // { name: "photobukutabungan", filename: fileNameBukuTabungan, data: filebukutabungan },
        //             // { name: "photosuratanggota", filename: fileNameSuratAnggota, data: filesuratanggota},
        //             { name: "data", data: JSON.stringify(frmData) }
        //         ]
        //     ).then(resp => {
        //         console.log("res_if", resp);
        //         const res = JSON.parse(resp.data);
        //         console.log('res',res);
        //         // const res = JSON.stringify(resp.data);
                
                 
        //         if(!res.Error){
        //             // Actions.pop()
        //             this.setState({ isLogin: true }, () => {
        //                 alert(res.Pesan);
        //                 // Actions.pop()
        //                 Actions.Login()
        //             });
        //         }else {
        //             this.setState({ isLoaded: !this.state.isLoaded }, () => {
        //                 alert(res.Pesan);
        //                 // console.log('url',this.state.pickUrlKtp.uri)
        //             });
        //         }
        //         alert(res.Pesan); 
        //     });
            
        // } else {
        //     this.setState({ isLoaded: !this.state.isLoaded }, () => {
        //         alert("Please assign your ID Picture");
        //         // alert(res.Pesan);
        //         // console.log('url',this.state.pickUrlKtp.uri)
        //     });
        //     // alert("Please assign your ID Picture");
        //     // console.log('url else',this.state.pickUrlKtp.uri)
           
        // }
    };
   
    render() {
      
        return (
           <Container style={Style.bgMain}>
                <StatusBar
                        backgroundColor={Colors.statusBarNavy}
                        animated
                        barStyle="light-content"
                    />
                {/* <Header style={[Style.navigation,{backgroundColor: 'transparent'}]}>
                    <StatusBar
                        backgroundColor={Colors.statusBarNavy}
                        animated
                        barStyle="light-content"
                    />

                    <View style={Style.actionBarLeft}>
                        <Button
                            transparent
                            style={Style.actionBarBtn}
                            onPress={Actions.pop}
                        >
                            <Icon
                                active
                                name="arrow-left"
                                style={Style.textWhite}
                                type="MaterialCommunityIcons"
                            />
                        </Button>
                    </View>
                    <View style={Style.actionBarMiddle}>
                        <Text style={Style.actionBarText}>
                         
                            {this.state.title}
                            
                        </Text>
                        <Text style={Style.actionBarText}>
                        
                            {this.state.towerDescs}
                            
                        </Text>
                        
                    </View>
                    <View style={Style.actionBarRight} />
                </Header> */}


                    <View style={{top:25, paddingBottom: 60}}>
                        <View style={{paddingLeft: 15,paddingTop: 15}}>
                            <Button
                            transparent
                            style={Style.actionBarBtn}
                            onPress={Actions.pop}
                        >
                            <Icon
                                active
                                name="arrow-left"
                                // style={[Style.textWhite,{fontSize: 28}]}
                                style={{color: '#000'}}
                                type="MaterialCommunityIcons"
                            />
                        </Button>
                        </View>
                        
                        <View>
                            <Text 
                            style={{
                                fontWeight:'900', 
                                color: Colors.goldUrban ,
                                fontSize: 16,
                                textAlign: 'center',
                                fontFamily: Fonts.type.proximaNovaBold,
                                letterSpacing: 1
                                 }}
                            // style={[Style.actionBarText,{fontWeight: 'bold', fontFamily:Fonts.type.proximaNovaBold}]}
                            >
                                BOOKING PRIORITY PASS
                                {/* {this.state.projectdesc} */}
                            </Text>
                        </View>

                        
                            
               
                    </View>
                    <ScrollView contentContainerStyle={{ paddingHorizontal: 50 }}>
                        <View style={{paddingBottom: 15,marginTop:8}}>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Text style={styles.overviewTitles}>Full Name</Text>
                                </View> */}
                                <Item floatingLabel style={Styles.marginround}>
                                    <Label style={{color: Colors.greyUrban, fontSize: 14}}>Full Name</Label>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                        <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                    </View> */}
                                    <Input 
                                        // placeholder='Full Name' 
                                        autoCapitalize="words"
                                        placeholderTextColor={Colors.greyUrban} 
                                        value={this.state.fullname} 
                                        onChangeText={val =>
                                            this.setState({ fullname: val })
                                        }
                                        style={Styles.positionTextInput}
                                        ref="fullname" />
                                        {this.state.errorfullname ? (
                                        <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                        ) : null}
                                    {/* <Icon name='close-circle' /> */}
                                </Item>
                                {this.state.errorfullname ? (<Text
                                    style={{
                                        position: "absolute",
                                        bottom:10,
                                        left: 15,
                                        color: "red",
                                        fontSize: 12
                                    }}
                                >
                                    Full Name Required
                                </Text>) : null}
                            </View>
                        
                        <View style={{paddingBottom: 15,marginTop:4}}>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Text style={styles.overviewTitles}>Full Name</Text>
                                </View> */}
                                <Item floatingLabel style={Styles.marginround}>
                                    <Label style={{color: Colors.greyUrban, fontSize: 14}}>Mobile Phone</Label>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                        <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                    </View> */}
                                    <Input 
                                        // placeholder='Full Name' 
                                        // autoCapitalize="numeric"
                                        keyboardType="numeric"
                                        placeholderTextColor={Colors.greyUrban} 
                                        value={this.state.mobilephone} 
                                        onChangeText={val =>
                                            this.setState({ mobilephone: val })
                                        }
                                        style={Styles.positionTextInput}
                                        ref="mobilephone" />
                                        {this.state.errormobilephone ? (
                                        <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                        ) : null}
                                    {/* <Icon name='close-circle' /> */}
                                </Item>
                                {this.state.errormobilephone ? (<Text
                                    style={{
                                        position: "absolute",
                                        bottom:10,
                                        left: 15,
                                        color: "red",
                                        fontSize: 12
                                    }}
                                >
                                    Mobile Phone Required
                                </Text>) : null}
                            </View>
                        
                        <View style={{paddingBottom: 15,marginTop:4}}>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text style={styles.overviewTitles}>Full Name</Text>
                            </View> */}
                            <Item floatingLabel style={Styles.marginround}>
                                <Label style={{color: Colors.greyUrban, fontSize: 14}}>Email</Label>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                    <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                </View> */}
                                <Input 
                                    // placeholder='Full Name' 
                                    autoCapitalize="words"
                                    placeholderTextColor={Colors.greyUrban} 
                                    value={this.state.email} 
                                    onChangeText={val =>
                                        this.setState({ email: val })
                                    }
                                    style={Styles.positionTextInput}
                                    ref="email" />
                                    {this.state.erroremail ? (
                                    <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                    ) : null}
                                {/* <Icon name='close-circle' /> */}
                            </Item>
                            {this.state.erroremail ? (<Text
                                style={{
                                    position: "absolute",
                                    bottom:10,
                                    left: 15,
                                    color: "red",
                                    fontSize: 12
                                }}
                            >
                                Email Required
                            </Text>) : null}
                        </View>
                    
                        <View style={{paddingBottom: 15,marginTop:4}}>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text style={styles.overviewTitles}>Full Name</Text>
                            </View> */}
                            <Item floatingLabel style={Styles.marginround}>
                                <Label style={{color: Colors.greyUrban, fontSize: 14}}>NIK</Label>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                    <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                </View> */}
                                <Input 
                                    // placeholder='Full Name' 
                                    // autoCapitalize="numeric"
                                    keyboardType="numeric"
                                    placeholderTextColor={Colors.greyUrban} 
                                    value={this.state.nik} 
                                    onChangeText={val =>
                                        this.setState({ nik: val })
                                    }
                                    style={Styles.positionTextInput}
                                    ref="nik" />
                                    {this.state.errornik ? (
                                    <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                    ) : null}
                                {/* <Icon name='close-circle' /> */}
                            </Item>
                            {this.state.errornik ? (<Text
                                style={{
                                    position: "absolute",
                                    bottom:10,
                                    left: 15,
                                    color: "red",
                                    fontSize: 12
                                }}
                            >
                                NIK Required
                            </Text>) : null}
                        </View>
                    
                        <View style={{paddingBottom: 15,marginTop:4}}>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text style={styles.overviewTitles}>Full Name</Text>
                            </View> */}
                            <Item floatingLabel style={Styles.marginround}>
                                <Label style={{color: Colors.greyUrban, fontSize: 14}}>NPWP</Label>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon solid name='star' style={styles.iconSub} type="FontAwesome5" />
                                    <Icon name='id-card-alt' type="FontAwesome5" style={styles.iconColor} />
                                </View> */}
                                <Input 
                                    // placeholder='Full Name' 
                                    // autoCapitalize="numeric"
                                    keyboardType="numeric"
                                    placeholderTextColor={Colors.greyUrban} 
                                    value={this.state.npwp} 
                                    onChangeText={val =>
                                        this.setState({ npwp: val })
                                    }
                                    style={Styles.positionTextInput}
                                    ref="npwp" />
                                    {this.state.errornpwp ? (
                                    <Icon style={{color: "red", bottom: 3, position: "absolute", right: 0}} name='close-circle' />
                                    ) : null}
                                {/* <Icon name='close-circle' /> */}
                            </Item>
                            {this.state.errornpwp ? (<Text
                                style={{
                                    position: "absolute",
                                    bottom:10,
                                    left: 15,
                                    color: "red",
                                    fontSize: 12
                                }}
                            >
                               NPWP Required
                            </Text>) : null}
                        </View>
                    
                        {/* KTP */}
                        <View style={{paddingTop: 10}}>
                            {this.state.pictUrlKtp == null || this.state.pictUrlKtp == '' ?
                                <Item regular style={[{borderRadius: 5}, Styles.inputAttach]} 
                                onPress={() => this.showAlert("pictUrlKtp")} 
                                pointerEvents={this.state.isLoaded ? "auto" : "none"}> 
                                    <Text style={Styles.textAttach}>Attach KTP</Text>
                                    <Image style={{width: 25, height: 25, position:'absolute', right: 10}} 
                                    source={require('@Asset/images/icon/image_blue.png')}></Image>
                                </Item>
                                :
                                <Item regular style={[{borderRadius: 5}, Styles.inputAttachLarge]} 
                                onPress={() => this.showAlert("pictUrlKtp")} 
                                pointerEvents={this.state.isLoaded ? "auto" : "none"}> 
                                    <View style={[Styles.containImageTop_no]}>
                                    <Image
                                        // resizeMode="cover"
                                        style={{ width: 200, height: 130, alignContent:'center' }}
                                        source={
                                            this.state.pictUrlKtp
                                        }
                                    />
                                    </View>
                                    
                                    <Image style={{width: 25, height: 25, position:'absolute', right: 10}} source={require('@Asset/images/icon/image.png')}></Image>
                                </Item>
                            }
                        </View>
                                
                        {/* NPWP */}
                        <View style={{paddingTop: 25,paddingBottom: 10}}>
                            {this.state.pictUrlNPWP == null || this.state.pictUrlNPWP == '' ?
                                <Item regular style={[{borderRadius: 5}, Styles.inputAttach]} 
                                onPress={() => this.showAlert("pictUrlNPWP")} 
                                pointerEvents={this.state.isLoaded ? "auto" : "none"}> 
                                    <Text style={Styles.textAttach}>Attach NPWP</Text>
                                    <Image style={{width: 25, height: 25, position:'absolute', right: 10}} 
                                    source={require('@Asset/images/icon/image_blue.png')}></Image>
                                </Item>
                                :
                                <Item regular style={[{borderRadius: 5}, Styles.inputAttachLarge]} 
                                onPress={() => this.showAlert("pictUrlNPWP")} 
                                pointerEvents={this.state.isLoaded ? "auto" : "none"}> 
                                    <View style={[Styles.containImageTop_no]}>
                                    <Image
                                        // resizeMode="cover"
                                        style={{ width: 200, height: 130, alignContent:'center' }}
                                        source={
                                            this.state.pictUrlNPWP
                                        }
                                    />
                                    </View>
                                    
                                    <Image style={{width: 25, height: 25, position:'absolute', right: 10}} source={require('@Asset/images/icon/image.png')}></Image>
                                </Item>
                            }
                        </View>
                   
                       
                        <View >
                            <View style={{paddingTop: 50}} >
                                <Button style={Styles.btnMedium}
                                onPress={()=>this.submit()}>
                                <Text style={{width: '100%', fontSize: 14, alignItems:'center',textAlign:'center', fontFamily: Fonts.type.proximaNovaBold, letterSpacing:1}}>
                                    Next
                                </Text>
                                </Button>
                            </View>   
                        </View>
                    </ScrollView>
                {/* <ScrollView style={{height: '100%'}}>
                    
                </ScrollView> */}
               
           </Container>
        );
    }
}

//make this component available to the app
export default FormBooking;
