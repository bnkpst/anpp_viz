

import React, {useRef, useState, useEffect} from 'react';
import './App.css';

import {FileIcon} from './Icons'
import {LineChart} from './Charts'
import {Packets} from './Packets'







// function SelectFileButton(props) {

//   return (
//       <div>
//           <input directory="" webkitdirectory="" id="folder" type="file"  onChange={(e) => props.setFilesFunc(Array.from(e.target.files))}/>
//       </div>
//   )
// }

function SelectFileButton(props) {

  return (
      <div>
          <input type="file"  onChange={(e) => props.setFilesFunc(Array.from(e.target.files))}/>
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

const crc16_table =
	[
		0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7, 0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef, 0x1231, 0x0210, 0x3273,
		0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6, 0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c, 0xf3ff, 0xe3de, 0x2462, 0x3443, 0x0420, 0x1401, 0x64e6, 0x74c7, 0x44a4, 0x5485, 0xa56a, 0xb54b, 0x8528,
		0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d, 0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6, 0x5695, 0x46b4, 0xb75b, 0xa77a, 0x9719, 0x8738, 0xf7df, 0xe7fe, 0xd79d, 0xc7bc, 0x48c4, 0x58e5, 0x6886,
		0x78a7, 0x0840, 0x1861, 0x2802, 0x3823, 0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b, 0x5af5, 0x4ad4, 0x7ab7, 0x6a96, 0x1a71, 0x0a50, 0x3a33, 0x2a12, 0xdbfd, 0xcbdc, 0xfbbf,
		0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a, 0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03, 0x0c60, 0x1c41, 0xedae, 0xfd8f, 0xcdec, 0xddcd, 0xad2a, 0xbd0b, 0x8d68, 0x9d49, 0x7e97, 0x6eb6, 0x5ed5,
		0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70, 0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a, 0x9f59, 0x8f78, 0x9188, 0x81a9, 0xb1ca, 0xa1eb, 0xd10c, 0xc12d, 0xf14e, 0xe16f, 0x1080, 0x00a1, 0x30c2,
		0x20e3, 0x5004, 0x4025, 0x7046, 0x6067, 0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e, 0x02b1, 0x1290, 0x22f3, 0x32d2, 0x4235, 0x5214, 0x6277, 0x7256, 0xb5ea, 0xa5cb, 0x95a8,
		0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d, 0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405, 0xa7db, 0xb7fa, 0x8799, 0x97b8, 0xe75f, 0xf77e, 0xc71d, 0xd73c, 0x26d3, 0x36f2, 0x0691,
		0x16b0, 0x6657, 0x7676, 0x4615, 0x5634, 0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9, 0xb98a, 0xa9ab, 0x5844, 0x4865, 0x7806, 0x6827, 0x18c0, 0x08e1, 0x3882, 0x28a3, 0xcb7d, 0xdb5c, 0xeb3f,
		0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a, 0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0, 0x2ab3, 0x3a92, 0xfd2e, 0xed0f, 0xdd6c, 0xcd4d, 0xbdaa, 0xad8b, 0x9de8, 0x8dc9, 0x7c26, 0x6c07, 0x5c64,
		0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0x0cc1, 0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8, 0x6e17, 0x7e36, 0x4e55, 0x5e74, 0x2e93, 0x3eb2, 0x0ed1, 0x1ef0
  ];




function App() {

  const [files, setFiles] = useState([]);

  // useEffect(() => {
  //   const reader = new FileReader();
  //   reader.onload = function(e) {
  //     // binary data
  //     console.log("Bin read...");
  //   };
  //   reader.onerror = function(e) {
  //     // error occurred
  //     console.log('Error : ' + e.type);
  //   };
  //   reader.readAsBinaryString(bindata);
  // }, [])

  const calculate_header_lrc = (data) => {

    return ((data[1] + data[2] + data[3] + data[4]) ^ 0xFF) + 1;
  }

  const calculate_crc16 = (data, length) => 
{
	
	let crc = 0xFFFF;
	for(let i = 0; i < length; i++)
	{
		crc = ((crc << 8) ^ crc16_table[(crc >> 8) ^ data[i]]);
	}
	return crc;
}


  const setFilesFunc= ((data) => {
    console.log(data)
    // setFiles(data)

    const reader = new FileReader();
    reader.onload = function(e) {
      // binary data
      console.log("Bin read...");
      let arrayBuffer = new Uint8Array(reader.result);
      
      let b = 0;
      let first = 0;
      let last = 5;



      while(b < 100000) {

        let header = arrayBuffer.subarray(first, last);        
        let lrc = calculate_header_lrc(header);
       if(lrc === header[0]) {

        let packetData = arrayBuffer.subarray(first + 5, first + 5 + header[2] + 1);   
        // console.log("len: ", header[2])
        // console.log("PLEN: ", packetData.length)
        let crc = header[3]
        crc |= header[4] << 8;

        let calc_crc = calculate_crc16(packetData, header[2])

        console.log("cal: ", calc_crc)
        console.log("crc: ", crc)

          if(calc_crc == crc) {
            console.log("Packet: ", header[1], "Len: ", header[2])
          }
         
          
        }
        b++;
        first++;
        last++;

      }
      console.log("End file")
     
    };
    reader.onerror = function(e) {
      // error occurred
      console.log('Error : ' + e.type);
    };
    reader.readAsArrayBuffer(data[0]);
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
