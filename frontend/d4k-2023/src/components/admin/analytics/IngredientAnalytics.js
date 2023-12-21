import React from "react";
import { Chart } from "react-google-charts";

const IngredientAnalytics = props => {

    const getColorType = (drinktype) => {
        switch (drinktype) {
            case 'liquor':
              return '#529e64'
            case 'liqueur':
              return '#d6a033'
            case 'juice':
              return '#a33939'
            default:
                return 'grey'
          }
    }

    var formattedData = props.data.map(x=> [x.name, x.ingredient_totals_ml, `${getColorType(x.type)}`, `${x.ingredient_totals_ml} mL`, `${Math.ceil(x.ingredient_totals_ml / 750)} bottles` ])
    formattedData.unshift([
      'name', 
      'mL', 
      { role: "style", type: "string" }, 
      { calc: "stringify", sourceColumn: 1, type: "string", role: "annotation" },
      {type: 'string', role: 'annotationText'}])

      const options = {
        title: "Ingredient Totals",
        subtitle: "2023",
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
        hAxis: {
          title: "Ingredient"
        },
        vAxis: {
          title: "mL Amount",
        },
        axes: {
          x: {
            0: { side: 'bottom', label: 'White to move'} // Top x-axis.
          }
        },
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

export default IngredientAnalytics