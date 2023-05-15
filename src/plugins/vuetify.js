import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    light: true,
    themes: {
      light: {
        secondary: "#f5f8ff",

        //Neutral
        neutral10: "#F8FAFC",
        neutral20: "#EEF2F6",
        neutral30: "#E3E8EF",
        neutral40: "#CDD5DF",
        neutral50: "#9AA4B2",
        neutral70: "#4B5565",
        Neutral80: "#4D4B49",
        neutral100: "#121926",

        //Primary
        primary: "#2970FF",
        primary5: "#F5F8FF",
        primary10: "#EFF4FF",
        primary20: "#D1E0FF",
        primary30: "#B2CCFF",
        primary40: "#FFE474",
        primary50: "#528BFF",
        primary60: "#2970FF",
        primary70: "#155EEF",
        primary80: "#004EEB",

        //Green
        green10: "#F0FDF3",
        green20: "#DAF7E1",
        green40: "#8FDFA8",
        green60: "#53B06C",

        //Red
        red20: "#FAE5E3",
        red60: "#DE5242",
        red70: "#C83E2E",
        red80: "#A53224",

        //Yellow
        yellow40: "#F9E283",

        //TODO: Remove unnecessary colors
        introbtn: "#5752E3",
        footer: "#F7F6FF",
        expired: "#E7E7E7",
        grey1: "#D9D9D9",
        grey: "#9E9E9E",
        darkgrey: "#626262",
        cream: "#F2F2F2",
        cyan: "#00BCD9",
        lightcyan: "#F5F9FF",
        blue1: "#1B379A",
        lightblue: "#516FFD",
        blue: "#516FFD",
        indigo: "#3E49BC",
        purple: "#7F4FC9",
        deeppurple: "#682CBF",
        teal: "#009889",
        bluegrey: "#607D8F",
        lime: "#CEE000",
        lightgreen: "#87C735",
        green: "#34C02B",
        black: "#000000",
        white: "#F5F5F5",
        violet: "#5E6BE9",
        yellow: "#F9E283",
        amber: "#FFCD00",
        orange: "#FF9A00",
        deeporange: "#FF5500",
        lightred: "#EC4C32",
        red: "#D40C00",
        brown: "#7C5546",
        deepbrown: "#50332B",
        background: "#EAEEF4",
        greyblack: "#191919",
      },
    },
  },
});
