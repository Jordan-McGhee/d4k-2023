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
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
      };

    return (
        <>
            <div className="w-full m-auto">
                <div>
                    <div className="rounded-lg shadow-md">
                    <Chart
                        chartType="ColumnChart"
                        width="100%"
                        height="400px"
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