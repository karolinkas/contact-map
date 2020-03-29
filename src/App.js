import React from 'react';
import './App.css';
import Tree from 'react-d3-tree';

const myTreeData = [
  {
    name: 'Cornelius Schmidt',
    attributes: {
      'contact date:': new Date().toDateString(),
      'confirmed case:': 'true',
    },
    children: [
      {
        name: 'Anthony Schmidt',
        attributes: {
          'relation:': 'son',
          'confirmed case:': 'true',
        },
      },
      {
        name: 'Steffi Schmidt',
        attributes: {
          'relation:': 'daughter',
          'confirmed case:': 'true',
        },
      },
    ],
  },
];

class NodeLabel extends React.PureComponent {
  render() {
    const {className, nodeData} = this.props
    console.log(nodeData)
    return (
      <div className={className}>
        <h2>{nodeData.name}</h2>
        {Object.keys(nodeData.attributes).map(key => <p className='attribute'><span>{key}</span><span>{nodeData.attributes[key]}</span></p>)}
        {nodeData._children && 
          <h2>{nodeData._children.name}</h2>
        }
      </div>
    )
  }
}

const App = () => {
  return (
    <div className="App">
      <div className="map-container"> 
        <Tree data={myTreeData} collapsible={false} translate={{x: '100', y: '200'}}
        separation={{siblings: 2, nonSiblings: 2}}
        allowForeignObjects
        nodeLabelComponent={{
          render: <NodeLabel className='info-box' />,
          foreignObjectWrapper: 
            { width: 150,
              height: 300
            }
        }} />
      </div>
    </div>
  );
}

export default App;
