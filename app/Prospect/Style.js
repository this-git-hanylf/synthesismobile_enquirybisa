import { Platform, StyleSheet, Dimensions } from 'react-native';
import { Fonts, Metrics, Colors } from '../Themes/';
const dh = Dimensions.get("window").height;
const dw = Dimensions.get("window").width;

export default {
    //prospect

    sBtnHeadAdd: {
        padding: 2,
        backgroundColor: Colors.blueUrban,
        // color: Colors.fire,
        // color: '#e73536'
        color: Colors.blueUrban
      },
      sBtnHead: {
        padding: 2,
        backgroundColor: Colors.yellowsoft,
        // color: Colors.fire,
        color: '#e73536'
        // color: Colors.blueUrban
      },
    
      record: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#DDD",
        marginLeft: 0,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: "#FFF",
        justifyContent: "center",
    },

    sLinkHead: {
        // color: '#f3f3f3',
        color: Colors.redUrban,
        fontSize: 10,
        fontFamily: Fonts.type.sfuiDisplaySemibold,
      },

      infoItem: {
        alignItems: "flex-start",
        paddingVertical: 30
      },
      infoIcon: {
        marginRight: 10,
        width: 60,
        height: 60
      },
      infoHeader: {
        fontFamily: "Montserrat-Regular",
        color: "#333",
        marginBottom: 5,
        fontSize: 15,
        flexWrap: "wrap",
        width: dw * 0.65
      },
      infoDesc: {
        fontFamily: "Montserrat-Regular",
        color: "#999",
        fontSize: 12,
        flexWrap: "wrap",
        width: dw * 0.65
      },


      overview: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 5,
    
      },
      overview_detail: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    
      },
      city: {
        flex : 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        justifyContent: 'space-between'
    },
      cardshimmer: {
        width: 100,
        height: 100,
      
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor:'#f3f3f3',

    },
    badge: {
      position: 'absolute', 
      // left: 200,
      right: 5,
      // left: 0, 
      justifyContent: 'center', 
      alignItems: 'center', 
      top: 0, 
      bottom: 0, 
      backgroundColor: Colors.navyUrban,
      
      borderRadius: 15,
      // height: null,
      width: 50
    },
    accordionTab: {
      flexDirection: 'row',
      padding: 15,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      marginBottom: 1,
    },
    accordionTabText: {
      color: '#333',
      fontSize: 12,
      fontFamily: 'Montserrat-SemiBold',
    },
    accordionTabIcon: {
      fontSize: 14,
      color: '#666',
    },
    accordionContent: {
      paddingVertical: 10,
    },
    formBg: {
      width: '100%',
      paddingHorizontal: 15,
      paddingTop: 30,
      paddingBottom: 10,
    },
    accordion: {
      width: '100%',
    },
    textInputArea: {
      fontFamily: Fonts.type.sfuiDisplaySemibold,
      borderBottomWidth: 0,
      borderColor: '#DDD',
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 20,
      paddingVertical: 15,
      fontSize: 12,
      width: '100%',
      marginBottom: 10,
      borderRadius: 5,
      textAlignVertical: 'top',
    },
    textInput: {
      fontFamily: 'Montserrat-Regular',
      borderBottomWidth: 1,
      borderColor: '#CCC',
      fontSize: 14,
      width: '100%',
      borderRadius: 5,
      textAlignVertical: 'bottom',
      paddingVertical: .5,
      paddingHorizontal: 20,
      color: '#666',
    },


}