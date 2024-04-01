import { View, Dimensions } from "react-native";
import React from "react";
import { PieChart } from "react-native-chart-kit";
import { colors } from "../styles/styles";

const screenWidth = Dimensions.get("screen").width - 20 - 75;

const Chart = ({ inStock = 0, outOfStock = 0 }) => {
    const data = [
        {
            name: "Out of Stock",
            population: outOfStock,
            color: "black",
            legendFontColor: "black",
        },
        {
            name: "In Stock",
            population: inStock,
            color: "grey",
            legendFontColor: "black",
        },
    ];

    const chartConfig = {
        color: (opacity = 1) => `rgba(26,255,146,${opacity})`,
    };

    return (
        <View >
            <PieChart
                data={data}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
                accessor={"population"}
                // backgroundColor={colors.color3}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                absolute
            />
        </View>
    );
};

export default Chart;