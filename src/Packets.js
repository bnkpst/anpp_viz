
import React, {useEffect, useState} from 'react';
import * as d3 from 'd3';

import { QuestionIcon } from './Icons';

// const URL = "https://gist.githubusercontent.com/bnkpst/b2e9b7891b2ef9726f7d0fb415375892/raw/864506462d1bb4e4a8ff49a625cd89d0e84eb2ef/packets.csv";
const URL = "data/packets.csv";

const DIR = "https://docs.advancednavigation.com/certus/ANPP/";

export const Packets = () => {

    const [packets, setPackets] = useState([]);

    useEffect(() => {

        d3.csv(URL)
        .then((data) => {
            setPackets(data);
        })
        .catch(() => {
            console.log("Error fetching CSV...")
        })

        
        
    }, []);


    return(
        <div className='packets-div scroll-styled'>
            {packets && packets.map((item, key) => <div key={key}>{item.packet} | {item.name}</div>)}
        </div>
    );
}