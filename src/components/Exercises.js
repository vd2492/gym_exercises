import React,{useEffect,useState} from 'react'
import Pagination from '@mui/material/Pagination';
import {Box,Stack,Typography, paginationItemClasses} from '@mui/material/';
import { exerciseOptions,fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';
import { SetMealSharp } from '@mui/icons-material';
const Exercises = ({exercises,setExercises,bodyPart}) => {
    console.log(exercises);
    

    const [currentPage,setCurrrentPage]= useState(1);
    const exercisesPerPage=9;
    const indexOfLastExercise=currentPage*exercisesPerPage;
    const indexOffFirstExercise=indexOfLastExercise-exercisesPerPage;
    const currentExercises =exercises.slice
    (indexOffFirstExercise,indexOfLastExercise);
    const paginate = (e,value) => {
        setCurrrentPage(value);
        window.scrollTo({top:1800,behaviour:'smooth'})

    }
   useEffect(() =>{
     const fetchExercisesData = async () => {
        let exercisesData =[];

        if(bodyPart=== 'all'){
            exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises',
            exerciseOptions);
        } else{
            exercisesData= await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
            exerciseOptions);
        }
        setExercises(exercisesData);
     }
     fetchExercisesData();
   },[bodyPart]);
  return (
    <Box id="exercises"
    sx={{mt:{lg:'110px'}}}
    mt="50px"
    p="20px">
<Typography variant="h3" mb="46px" >
    showing results
</Typography>
<Stack direction="row" sx={{gap: { lg:'110',xs:'50px'}}} flexWrap="wrap" justifyContent="center">
    {currentExercises.map((exercise,index)=> (
       <ExerciseCard key={index} exercise={exercise}/>
    ))}
</Stack>
<Stack mt="100px" alignItems="center">
{exercises.length>9 && (
    <Pagination
    color="standard"
    shape="rounded"
    defaultPage={1}
    count={Math.ceil(exercises.length/exercisesPerPage)}
    page={currentPage}
    onChange={paginate}
    size="large"
    />
)}
</Stack>
    </Box>
  )
}

export default Exercises