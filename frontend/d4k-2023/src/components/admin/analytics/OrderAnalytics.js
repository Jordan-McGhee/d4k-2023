import React from "react";
import { Chart } from "react-google-charts";

const OrderAnalytics = props => {

    const getColorType = (drinktype) => {
        switch (drinktype) {
            case 'cocktail':
              return '#ffa600'
            case 'batched':
              return '#58508d'
            case 'shot':
              return '#bc5090'
            case 'mocktail':
                return '#ff6361'
            default:
                return 'grey'
          }
    }

    var formattedData = props.data.map(x=> [x.drink, x.total_orders, `${getColorType(x.type)}`, x.total_orders])
    formattedData.unshift(['Drink', 'Orders', { role: "style", type: "string" }, 
    { calc: "stringify",
    sourceColumn: 1,
    type: "string",
    role: "annotation" }])

      const options = {
        title: "Order Totals",
        subtitle: "2023",
        legend: { position: "none" },
        hAxis: {
          title: "Drink Orders",
          slantedText: true,
          slantedTextAngle: 45,
          textStyle: {
            fontSize: 11
          }
        },
        vAxis: {
          title: "Amount",
          textStyle: {
            fontSize: 11
          }
        },
        bar: { groupWidth: "60%" },
        chartArea: { width: "80%", height: "75%", left: 80, bottom: 100 },
        titleTextStyle: {
          fontSize: 14
        },
        annotations: {
          textStyle: {
            fontSize: 10,
            bold: true
          }
        }
      };

    return (
        <>
            <div className="w-full m-auto">
                <div>
                    <div className="rounded-lg shadow-md">
                    <Chart
                        chartType="ColumnChart"
                        width="100%"
                        height="600px"
                        data={formattedData}
                        options={options}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderAnalytics