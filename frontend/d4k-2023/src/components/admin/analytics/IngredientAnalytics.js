import React from "react";
import { Chart } from "react-google-charts";

const IngredientAnalytics = props => {

    const getColorType = (drinktype) => {
        switch (drinktype) {
            case 'liquor':
              return '#BC5090'
            case 'liqueur':
              return '#FF6361'
            case 'juice':
              return '#FFA600'
            default:
                return 'grey'
          }
    }

    var formattedData = props.data.map(x=> [
      x.name, 
      x.ingredient_totals_ml,
      `${getColorType(x.type)}`, 
      `${x.ingredient_totals_ml} mL`,
      Math.ceil(x.ingredient_totals_ml / 750) * 1000, 
      `#2F3F9F`, 
      `${Math.ceil(x.ingredient_totals_ml / 750)} Bottle${ x.ingredient_totals_ml > 750 ? 's' : ''}`,
      `${Math.ceil(x.ingredient_totals_ml / 750)} Bottle${ x.ingredient_totals_ml > 750 ? 's' : ''}`
    ])

    formattedData.unshift([
      'name', 
      'mL',
      { role: "style", type: "string" }, 
      { calc: "stringify", sourceColumn: 0, type: "string", role: "annotation" },
      'Bottles',
      { role: "style", type: "string" }, 
      { calc: "stringify", sourceColumn: 0, type: "string", role: "annotation" },
      { role: "tooltip", type: "string" }, 
    ])

      const options = {
        title: "Ingredient Totals",
        legend: { position: "none" },
        seriesType: "bars",
        series: { 1: { type: "steppedArea" } },
        hAxis: {
          title: "Ingredient"
        },
        vAxis: {
          title: "mL Amount",
        },
      };

    return (
        <>
            <div className="m-auto">
                <div>
                    <Chart
                        chartType="ComboChart"
                        width="100%"
                        height="600px"
                        data={formattedData}
                        options={options}
                        />
                </div>
            </div>
        </>
    )
}

export default IngredientAnalytics