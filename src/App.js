

import React, {useRef, useState, useEffect} from 'react';
import './App.css';

import {FileIcon} from './Icons'
import {LineChart} from './Charts'
import {Packets} from './Packets'





function SelectFileButton(props) {

  return (
      <div>
          <input directory="" webkitdirectory="" id="folder" type="file"  onChange={(e) => props.setFilesFunc(Array.from(e.target.files))}/>
      </div>
  )
}

const FileTable = (props) => {

    const rows =  props.files.map((e, key) => ["csv", "txt"].includes(e.name.split(".")[1]) ? <tr key={key}><td>{e.name}</td></tr> : <tr key={key} style={{"color": "#ccc", "userSelect": "none"}}><td>{e.name}</td></tr>)



  return(
    <div>
      <table>
        <tbody>
        {rows}
        </tbody>
  
      </table>
    </div>
  )
}

const DataContainer = (props) => {

  const files = props.files.map((file) => <option>{file.name}</option>)

  const xlabel = "Unix Time";
  const ylabel = "Acceleration"

  return(
    <div className='centre-div'>
      <div className='data-con-header'>
        <div className='data-con-dropdown'>
          <label for="file-select">Packet: </label>
          <select name={'file-select'}>
            {files}
          </select>
        </div>
        <div className='data-con-dropdown'>
          <label for="x-select">X: </label>
          <select name={'x-select'}>
            <option>{xlabel}</option>
          </select>
        </div>
        <div className='data-con-dropdown'>
          <label for="y-select">Y: </label>
          <select name={'y-select'}>
            <option>{ylabel}</option>
          </select>
        </div>


      </div>

  </div>
  )
}



function App() {

  const [files, setFiles] = useState([]);


  const setFilesFunc= ((data) => {
    console.log(data)
    setFiles(data)
  });

  return (
    <div className="App">

      <nav className='top-bar'>
        <div>ANPP Data Visualisation</div>
      </nav>
      <div className='left-bar'>
        <Packets></Packets>
      </div>
      <div className='right-bar'>
        <FileIcon></FileIcon>
        <FileIcon></FileIcon>
        <FileIcon></FileIcon>
        <FileIcon></FileIcon>
        <SelectFileButton setFilesFunc={setFilesFunc}></SelectFileButton>
      </div>
      <div className='centre-div-con'>
        <div className='centre-div'>
          <LineChart data={files} x={"name"} />
        </div>
        <DataContainer files={files}></DataContainer>

        <div className='centre-div'>
          <FileTable files={files}></FileTable>
        </div>
      </div>


        <div className='bottom-bar'> </div>
    </div>
  );
}

export default App;
