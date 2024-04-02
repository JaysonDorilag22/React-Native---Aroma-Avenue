import { View, ScrollView, Dimensions, Text } from "react-native";
import React from "react";
import { BarChart } from "react-native-chart-kit";
import { colors } from "../styles/styles";

const screenWidth = Dimensions.get("screen").width - 20 - 75;

const UserSalesChart = ({ data }) => {
    const randomColor = () => {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return `rgba(${red}, ${green}, ${blue}, 1)`;
    };

    const chartConfig = {
        // backgroundColor: "#e26a00",
        backgroundGradientFrom: "rgb(45,45,45)",
        backgroundGradientTo: "rgb(45,45,45)",
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1, index) => randomColor(),
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
    };

    // Check if data and data.ordersCountByProduct are defined and an array before trying to map over it
    const transformedData = data && Array.isArray(data.ordersCountByProduct) ? data.ordersCountByProduct.map(item => item.totalAmount) : [];
    const labels = data && Array.isArray(data.ordersCountByProduct) ? data.ordersCountByProduct.map(item => item._id) : [];
    // console.log(data)
    if (!transformedData.length) {
        return <Text>No orders to display</Text>;
    }

    return (
        <ScrollView horizontal={true}>
            <BarChart
                data={{
                    labels: labels,
                    datasets: [
                        { data: transformedData }
                    ]
                }}
                height={300}
                width={1000}
                yAxisLabel="$"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    ...chartConfig,
                    labelColor: () => colors.color1, // Change label color if needed
                    decimalPlaces: 0, // optional, defaults to 2dp
                    style: {
                        borderRadius: 16
                    },
                    propsForLabels: {
                        fontSize: 10, // Adjust font size as per your requirement
                        fontWeight: 'bold' // Optional: Adjust font weight
                    }
                }}
                style={{
                    marginVertical: 8,
                }}
                absolute
                bezier
            />
        </ScrollView>
    );
};

export default UserSalesChart;
