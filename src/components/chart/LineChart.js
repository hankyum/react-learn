import React, { Component } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
  Label, LabelList } from 'recharts';

const data = [
  { name: 'Page A', uv: 1000, pv: 2400, amt: 2400, uvError: [75, 20] },
  { name: 'Page B', uv: 300, pv: 4567, amt: 2400, uvError: [90, 40] },
  { name: 'Page C', uv: 280, pv: 1398, amt: 2400, uvError: 40 },
  { name: 'Page D', uv: 200, pv: 9800, amt: 2400, uvError: 20 },
  { name: 'Page E', uv: 278, pv: 3908, amt: 2400, uvError: 28 },
  { name: 'Page F', uv: 189, pv: 4800, amt: 2400, uvError: [90, 20] },
  { name: 'Page G', uv: 189, pv: 4800, amt: 2400, uvError: [28, 40] },
  { name: 'Page H', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
  { name: 'Page I', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
  { name: 'Page J', uv: 189, pv: 4800, amt: 2400, uvError: [15, 60] },
];

const initilaState = {data};
const changeNumberOfData = {};

export default class extends Component {

  static displayName = 'LineChartDemo';

  state = initilaState;

  handleChangeData = () => {
    this.setState(() => _.mapValues(initilaState, changeNumberOfData));
  };

  handleClick = (data, e) => {
    console.log(data);
  };

  handleLegendMouseEnter = () => {
    this.setState({
      opacity: 0.5,
    });
  };

  handleLegendMouseLeave = () => {
    this.setState({
      opacity: 1,
    });
  };

  handleChangeAnotherState = () => {
    this.setState({
      anotherState: !this.state.anotherState,
    })
  };

  render() {
    return (
      <div className='line-charts'>
        <p>LineChart with three y-axes</p>
        <div className='line-chart-wrapper' style={{ margin: 40 }}>
          <LineChart width={600} height={400} data={data}>
            <YAxis type='number' yAxisId={0} domain={[0, 1020]}/>
            <YAxis type='number' orientation='right' yAxisId={1}/>
            <YAxis type='number' orientation='right' yAxisId={2}/>
            <XAxis dataKey='name'/>
            <Tooltip position={{y: 200}} />
            <CartesianGrid stroke='#f5f5f5'/>
            <Line dataKey='uv' stroke='#ff7300' strokeWidth={2} yAxisId={0}/>
            <Line dataKey='pv' stroke='#387908' strokeWidth={2} yAxisId={1}/>
            <Line dataKey='amt' stroke='#38abc8' strokeWidth={2} yAxisId={2}/>
          </LineChart>
        </div>
      </div>
    );
  }
}

