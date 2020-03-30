import React, { useState } from 'react';
import './App.css';
import Tree from 'react-d3-tree';


/* This is the initial status of the contact map that will be loaded from some Api */
const myTreeData = {
  name: 'Cornelius Schmidt',
  attributes: {
    'contact date:': new Date().toDateString(),
    'confirmed case:': 'false',
  },
  children: [
    {
      name: 'Anthony Schmidt',
      attributes: {
        'relation:': 'son',
        'confirmed case:': 'false',
      },
    },
    {
      name: 'Steffi Schmidt',
      attributes: {
        'relation:': 'daughter',
        'confirmed case:': 'false',
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

  const [treeState, setTreeState] = useState(myTreeData);

  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [confirmed, setConfirmed] = useState(false);

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
        name: name,
        attributes: {
          'relation:': relation,
          'confirmed case:': confirmed ? 'true' : 'false',
        }
      }
      )
      
    setTreeState(dup)
  }
  
  return (
    <div className="Margin">
      <h2>Tracking Contacts of potential Covid-19 patients</h2>
      <div className="App">
        <div className="container" > 
          <div className="map-container"> 
            <Tree
              styles={styles}
              data={treeState} 
              collapsible={false} 
              translate={{x: '100', y: '200'}}
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
          <div className="form-container"> 
            <h2>Add New Contact</h2>
            <div></div>
            <div className="input-fields">
              <label>Name</label>
              <input type="text" onChange={e => setName(e.target.value)}></input>
            </div>
            <div>
              <label>Relation</label>
              <input type="text" onChange={e => setRelation(e.target.value)}></input>
            </div>
            <div>
              <label>Confirmed Case</label>
              <input 
                type = "checkbox"
                id="confirmed"
                onClick={() => setConfirmed(!confirmed)}c 
              />
            </div>
            <button onClick={addNode}>Add Contact</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
