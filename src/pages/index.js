import React, { useState, useEffect } from 'react';

function DogTinder() {
    const [dog, setDog] = useState();
    const [loading, setLoading] = useState(false);
    const [acceptedDogs, setAcceptedDogs] = useState([]);
    const [rejectedDogs, setRejectedDogs] = useState([]);
    const [showDescription, setShowDescription] = useState(false);


    async function fetchDog() {
        setLoading(true);
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            setDog({ id: Date.now(), imgSrc: data.message, name: generateRandomName() });
            setLoading(false);
        } catch (error) {
            console.error('Fallo en obtener el perro :', error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!loading) {
            fetchDog();
        }
    }, [acceptedDogs, rejectedDogs]);

    function generateRandomName() {
    }

    function handleAccept() {
        setAcceptedDogs([dog, ...acceptedDogs]);
    }

    function handleReject() {
        setRejectedDogs([dog, ...rejectedDogs]);
    }

    return (

        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 bg-gray-200 p-4 items-center">
                <h2 className="text-xl font-semibold">Candidatos</h2>


                {loading || !dog ? (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75">

                        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                ) : (
                    <div className="scrollable-list">
                        <div key={dog.id} className="dog-card">
                            <div className='w-[400px] h-[400px] overflow-clip'>
                                <img src={dog.imgSrc} alt="Dog" className="rounded-lg h-[100%]" />
                            </div>
                            <p className="text-center mt-2">{dog.name}</p>
                            <div className="flex justify-center mt-2">
                                <button
                                    onClick={handleAccept}
                                    disabled={loading}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                                >
                                    Aceptar
                                </button>
                                <button
                                    onClick={handleReject}
                                    disabled={loading}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Rechazar
                                </button>
                            </div>
                        </div>
                    </div>
                )}



                <button
                    onClick={() => setShowDescription(!showDescription)}
                    className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
                >
                    Mostrar Descripción
                </button>
                {showDescription && <p className="mt-4">Descripción del perro lorem ipsum.</p>}
            </div>

            <div className="col-span-1 bg-gray-200 p-4 relative items-center">
                <h2 className="text-xl font-semibold">Aceptados</h2>
                <div className=" max-h-[90vh] h-[90vh] overflow-y-scroll">
                    {acceptedDogs.map((dog) => (
                        <div key={dog.id} className="dog-card">
                            <div className=' w-[300px] h-[300px] overflow-clip'>
                                <img src={dog.imgSrc} alt="Dog" className="rounded-lg h-[100%]" />
                            </div>
                            <p className="text-center mt-2">{dog.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-span-1 bg-gray-200 p-4 items-center ">
                <h2 className="text-xl font-semibold">Rechazados</h2>
                <div className="h-[90vh] max-h-[90vh] overflow-y-scroll">
                    {rejectedDogs.map((dog) => (
                        <div key={dog.id} className="dog-card">

                            <div className=' w-[300px] h-[300px] overflow-clip'>
                                <img src={dog.imgSrc} alt="Dog" className="rounded-lg h-[100%]" />
                            </div>
                            <p className="text-center mt-2">{dog.name}</p>
                        </div>
                    ))}
                </div>
            </div>



        </div>
    );
}

export default DogTinder;

// import React from "react"
// import {
//   Button,
//   Divider,
//   Grid,
//   LinearProgress,
//   List,
//   ListItem,
//   ListItemText,
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import dogNames from "dog-names";
// import { LoremIpsum } from "react-lorem-ipsum";

// function TinderDog() {
//   const [accepted, setAccepted] = useState([]);
//   const [rejected, setRejected] = useState([]);
//   const [currentDog, setCurrentDog] = useState({
//     nombre: "",
//     imagen: "",
//     description: "",
//   });;

  
//   const [acceptedLoading, setAcceptedLoading] = useState(false);
//   const [rejectedLoading, setRejectedLoading] = useState(false);

//   useEffect(() => {
//     fetchDog();
//   }, []);

//   const fetchDog = async () => {
//     axios.get("https://dog.ceo/api/breeds/image/random").then((response) => {
//       setCurrentDog({
//         name: dogNames.allRandom(),
//         imagen: response.data.message,
//         description: (
//           <LoremIpsum
//             startWithLoremIpsum={false}
//             avgWordsPerSentence={3}
//             avgSentencesPerParagraph={2}
//           />
//         ),
//       });
//     });
//   };

//   const acceptDog = async () => {
//     if (currentDog) {
//       setAcceptedLoading(true);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setAccepted([...accepted, currentDog]);
//       fetchDog();
//       setAcceptedLoading(false);
//     }
//   };

//   const rejectDog = async () => {
//     if (currentDog) {
//       setRejectedLoading(true);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setRejected([...rejected, currentDog]);
//       fetchDog();
//       setRejectedLoading(false);
//     }
//   };

//   const repent = async (dog) => {
//     if (accepted.includes(dog)) {
//       setAcceptedLoading(true);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setAccepted(accepted.filter((d) => d !== dog));
//       setRejected([...rejected, dog]);
//       setAcceptedLoading(false);
//     } else if (rejected.includes(dog)) {
//       setRejectedLoading(true);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setRejected(rejected.filter((d) => d !== dog));
//       setAccepted([...accepted, dog]);
//       setRejectedLoading(false);
//     }
//   };

//   return (
//     <Grid container spacing={2}>
//       <Grid item md={4}>
//         <Typography variant="h6" gutterBottom>
//           Candidatos
//         </Typography>
//         {currentDog && (
//           <Card>
//             <img
//               src={currentDog.imagen} 
//               alt={currentDog.name}
//               style={{ width: '100%', height: '200px' }}
//             />
//             <CardContent>
//               <Typography variant="subtitle1">{currentDog.name}</Typography>
//               <Typography variant="body2">{currentDog.description}</Typography>
//             </CardContent>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={acceptDog}
//               disabled={acceptedLoading}
//             >
//               Aceptar
//             </Button>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={rejectDog}
//               disabled={rejectedLoading}
//             >
//               Rechazar
//             </Button>
//           </Card>
//         )}
//       </Grid>
//       <Grid item md={4}>
//         <Typography variant="h6" gutterBottom>
//           Aceptados
//         </Typography>
//         {accepted.map((dog, index) => (
//           <Card key={index}>
//             <img
//               src={dog.imagen} 
//               alt={dog.name}
//               style={{ width: '100%', height: '200px' }}
//             />
//             <CardContent>
//               <Typography variant="subtitle1">{dog.name}</Typography>
//               <Typography variant="body2">{dog.description}</Typography>
//             </CardContent>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={() => repent(dog)}
//               disabled={acceptedLoading}
//             >
//               Arrepentirse
//             </Button>
//           </Card>
//         ))}
//       </Grid>
//       <Grid item md={4}>
//         <Typography variant="h6" gutterBottom>
//           Rechazados
//         </Typography>
//         {rejected.map((dog, index) => (
//           <Card key={index}>
//             <img
//               src={dog.imagen} 
//               alt={dog.name}
//               style={{ width: '100%', height: '200px' }}
//             />
//             <CardContent>
//               <Typography variant="subtitle1">{dog.name}</Typography>
//               <Typography variant="body2">{dog.description}</Typography>
//             </CardContent>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => repent(dog)}
//               disabled={rejectedLoading}
//             >
//               Arrepentirse
//             </Button>
//           </Card>
//         ))}
//       </Grid>
//     </Grid>
//   );
// }

// export default TinderDog;

