import React, { useState, useEffect } from 'react';
import './App.css';
import Tree from 'react-d3-tree';


/* This is the initial status of the contact map that will be loaded from some Api */
const myTreeData = {
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
  ]
};

const NodeLabel = (props) => {
  const {className, nodeData} = props
  return (
    <div className={className}>
      <h2>{nodeData.name}</h2>
      {Object.keys(nodeData.attributes).map(key => 
        <p className='attribute'><span>{key}</span><span>{nodeData.attributes[key]}</span></p>)}
      {nodeData._children && 
        <h2>{nodeData._children.name}</h2>
      }
    </div>
  )
}


const App = () => {

  const [treeState, setTreeState] = useState(myTreeData)

  const [translate, setTranslate] = useState({x: '100', y: '200'});

  const styles = {
    links: {
      'stroke-opacity': '0.25'
    },
    nodes: {
      node: {
        circle: { fill: 'tomato'},
      }
    }
  };

  const addNode = () => {
    const dup = {...treeState};
    
    dup.children.push(
      {
        name: 'Karolin Siebert',
        attributes: {
          'relation:': 'daughter',
          'confirmed case:': 'true',
        }
      }
      )
      
    setTreeState(dup)
  }
  let treeContainer;

  useEffect(() => {
    const dimensions = treeContainer.getBoundingClientRect();
    setTranslate({
        x: dimensions.width / 2,
        y: dimensions.height / 2
    });
  }, [treeContainer])
  
  return (
    <div className="App">
      <div className="map-container" ref={tc => (treeContainer = tc)}> 
        <Tree
          styles={styles}
          data={treeState} 
          collapsible={false} 
          translate={translate}
          separation={{siblings: 2, nonSiblings: 2}}
          allowForeignObjects
          onClick={addNode}
          nodeLabelComponent={{
          render: <NodeLabel className='info-box' />,
          foreignObjectWrapper: 
            { width: 150,
              height: 300
            }
        }} />
      </div>
      <h2>Add New Contact</h2>
      <button onClick={addNode}>Add Node</button>
    </div>
  );
}

export default App;
