import React from 'react'
import { PieChart } from 'react-native-svg-charts'

class PieChartCustom extends React.PureComponent {

    render() {

        const data = [
            {
                key: 1,
                value: 5,
                svg: { fill: '#664D04' },
                arc: { outerRadius: '130%', cornerRadius: 10,  }
            },
            {
                key: 2,
                value: 5,
                svg: { fill: '#2FBDE9' }
            },
            {
                key: 3,
                value: 10,
                svg: { fill: '#E9B72F' }
            },
            {
                key: 4,
                value: 80,
                svg: { fill: '#2F60E9' }
            },
        ]


        return (
            <PieChart
                style={{ height: 200, width:200 }}
                outerRadius={'70%'}
                innerRadius={10}
                data={data}
            />
        )
    }

}

export default PieChartCustom;