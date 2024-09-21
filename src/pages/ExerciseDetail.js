import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { exerciseOptions,fetchData, youtubeOptions } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';
const ExerciseDetail = () => {
  const [ExerciseDetail,setExerciseDetail]= useState({});
  const [exerciseVideos,setExerciseVideos]= useState([]);
  const [targetMuscleExercises,setTargetMuscleExercises] =useState([]);
  const [equipmentExercises,setequipmentExercises] =useState([]);
  const {id} =useParams();
  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
        const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';
        const exerciseDetailData = await fetchData( `${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
        setExerciseDetail(exerciseDetailData);
        if (exerciseDetailData) {
          const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions);
          setExerciseVideos(exerciseVideosData.contents);
          const targetMuscleExercisesData =await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,exerciseOptions);
          setTargetMuscleExercises(targetMuscleExercisesData);
          const equipmentExercisesData =await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,exerciseOptions);
          setequipmentExercises(equipmentExercisesData);
        } else {
          console.error("Failed to fetch exercise detail");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchExercisesData();
  }, [id]);
  return (
   <Box>
    <Detail ExerciseDetail={ExerciseDetail} />
    <ExerciseVideos ExerciseVideos={exerciseVideos} name={ExerciseDetail.name}/>
    <SimilarExercises targetMuscleExercises = {targetMuscleExercises}
    equipmentExercises={equipmentExercises} />
   </Box>
  )
}

export default ExerciseDetail