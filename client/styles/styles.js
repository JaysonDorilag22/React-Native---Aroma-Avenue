import { StyleSheet, Platform, StatusBar } from "react-native";

export const colors = {
  color1: "#B7C1C2",
  color1_light: "rgba(227,25,99,1)",
  color1_light2: "rgba(199,0,73,0.8)",
  color2: "white",
  color3: "rgb(45,45,45)",
  color4: "transparent",
  color5: "#f2f2f2",
  color6: "#f7f7f7",
};

export const defaultStyle = StyleSheet.create({
  padding: 5,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  flex: 1,
  backgroundColor: colors.color2,
});

export const inputStyling = StyleSheet.create({
  height: 40,
  backgroundColor: colors.color2,
  marginVertical: 10,
  marginHorizontal: 20,
});

export const formHeading = {
  fontSize: 25,
  fontWeight: "500",
  textAlign: "center",
  color: colors.color3,
};

export const inputOptions = {
  style: inputStyling,
  mode: "outlined",
  activeOutlineColor: colors.color1,
};

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,

    borderRadius: 5,
    justifyContent: "center",

  },

  forget: {
    color: colors.color3,
    marginHorizontal: 20,
    marginVertical: 10,
    alignSelf: "flex-end",
    fontWeight: "500",
    fontSize: 12,


  },

  btn: {
    backgroundColor: colors.color3,
    margin: 20,
    padding: 10,
    borderRadius: 5,
    fontSize: 12,

  },

  or: {
    alignSelf: "center",
    fontSize: 12,
    color: colors.color3,
  },

  link: {
    color: colors.color3,
    marginHorizontal: 20,
    marginVertical: 10,
    alignSelf: "flex-start",
    fontWeight: "500",
    fontSize: 12,


  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,

  },
});

export const defaultImg =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
