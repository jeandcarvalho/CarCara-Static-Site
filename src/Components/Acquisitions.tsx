import { useEffect, useState } from 'react';
import { api } from '../Services/api';
import formatDuration from '../Classes/DateTimeFormat';
import { Link } from "react-router-dom";

interface FilesProps {
  id   : string ;
  TimeStemp : Date;
  Videoname : string;
  Bairro :string;
  Cidade :string;
  Estado :string;
  Link :string;
  Gps_y :number;
  Gps_X :number;
  Gps_Z :number;
}

export default function Acquisitions() {

  const [filesdata, setFiles] = useState<FilesProps[]>([]);
 
  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    const response = await api.get("/videofiles");
    setFiles(response.data);
  }





  

  const uniqueStates = [...new Set(filesdata.map(item => item.Estado))];

  console.log(uniqueStates.length)

  function countDocumentsByState(state: string): number {
    const count = filesdata.reduce((acc, curr) => {
      if (curr.Estado === state) {
        return acc + 1;
      }
      return acc;
    }, 0);
  
    return count*300;
  }




  
  
  window.onload = function() {
    window.scrollTo(0, 0);
}

  return (
    <body>
      <header className="bg-zinc-800 flex  px-3 ">
      <h1 className="text-4xl font-semibold italic mt-1  mr-7 text-yellow-400 text-left"> CarCara</h1>
      <Link to={"/"}> 
        <p className="text-xl font-semibold  ml-11 mr-5 mb-4 mt-3 text-neutral-400      rounded relative hover:scale-110 duration-200">Home</p>
      </Link>
      <Link to={"/About"}> 
        <p className="text-xl font-semibold  ml-5  mb-4 mt-3 text-neutral-400 rounded relative hover:scale-110 duration-200">About</p>
      </Link> 
 </header>
    <div className="bg-zinc-900 flex justify-center px-4  ">
      <main className="my-5 w-full md:max-w-2xl  h-screen bg-zinc-900">
      <div className="text-left">
      <h1 className="text-4xl font-medium mb-4 text-yellow-100 text-left mt-5">
      Change of <br /> Acquired <span className='font-medium text-yellow-300'> States</span>
</h1>
</div>
        <section className="grid grid-cols-2 gap-4 w-full">
          {uniqueStates.map((state, index) => {
            return (
              state !== "Not Found" ? (
                <Link to={`/state/${state}`} key={state}>
                <article key={index} className="bg-zinc-800 rounded p-2 relative hover:scale-105 duration-200">
                  <p>
                    <span className="font-medium text-neutral-300 text-xl">State: </span>
                    <span className="font-medium text-yellow-300 text-xl">{state} </span>
                  </p>
                  <p>
                    <span className="font-medium text-neutral-300">Country: </span>
                    <span className="font-medium text-yellow-200">{'Brazil'} </span>
                  </p>
                  <p>
                    <span className="font-medium text-neutral-300">Time recorded: </span>
                    <span className="font-medium text-gray-100 "> {formatDuration(countDocumentsByState(state))}  </span>
                   
                  </p>
                </article>
                </Link>
              ) : null
            );
          })}
        </section>
      </main>
    </div>
    </body>
  )
}