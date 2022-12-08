import {useEffect} from 'react'
import { useWorkoutsContext} from '../hooks/useWorkoutsContext'

import WorkoutDetails from '../components/workoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(()=>{
        const fetchWorkouts = async () =>{
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        fetchWorkouts()
    },[])

    return(
        <div className="home">
            <div className='workouts'>
                {!workouts && <h2>No workouts added yet!</h2>}
            {workouts && workouts.map((workout)=>(
                <WorkoutDetails key={workout._id} workout={workout} />
            ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;