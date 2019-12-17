import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const type = {
  base: "Avenir-Book",
  bold: "Avenir-Black",
  emphasis: "HelveticaNeue-Italic",
  sfuiDisplayBold: "SFUIDisplay-Bold",
  sfuiDisplaySemibold: "FontsFree-Net-proxima_nova_bold-webfont",
  sfuiDisplayRegular: "SFUIDisplay-Regular",
  sfuiDisplayLight: "SFUIDisplay-Light",
  sfuiDisplayMedium: "SFUIDisplay-Medium",
  helveticaNeueLight: "HelveticaNeue-Light",
  helveticaNeueBold: "HelveticaNeue-Bold",
  helveticaNeueRegular: "HelveticaNeue-Regular",
  helveticaRegular: "Helvetica",
  helveticaBold: "Helvetica-Bold",
  robotoRegular: "Roboto-Regular",
  robotoMedium: "Roboto-Medium",
  montserratSemiBold: "Montserrat-SemiBold",
  proximaNovaBoldWeb:    "FontsFree-Net-proxima_nova_bold-webfont",
  proximaNovaCondBold: "FontsFree-Net-proxima_nova_cond_bold-webfont",
  proximaNovaReg:      "FontsFree-Net-proxima_nova_reg-webfont",
  proximaNovaBlackIt:      "FontsFree-Net-Proxima-Nova-Black-It",
  proximaNovaBlack:     "FontsFree-Net-Proxima-Nova-Black",
  proximaNovaBoldIt:      "FontsFree-Net-Proxima-Nova-Bold-It",
  proximaNovaBold:      "FontsFree-Net-Proxima-Nova-Bold",
  proximaNovaThin:     "FontsFree-Net-Proxima-Nova-Thin",
  proximaNovaXBoldIt:      "FontsFree-Net-Proxima-Nova-Xbold-It"



};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: "bold",
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
};

export default {
  type,
  size,
  style,
  scale,
  verticalScale,
  moderateScale
};
