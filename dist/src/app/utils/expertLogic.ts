export type Goal = 'fat-loss' | 'muscle-gain' | 'endurance';
export type Experience = 'beginner' | 'intermediate' | 'advanced';
export type Duration = 'short' | 'medium' | 'long';
export type Injury = 'none' | 'upper' | 'lower' | 'back';

export interface UserInputs {
  goal: Goal;
  experience: Experience;
  days: number;
  duration: Duration;
  injury: Injury;
}

export interface DailyWorkout {
  type: 'workout' | 'rest';
  title: string;
  exercises: string[];
}

export interface Recommendation {
  split: string;
  focus: string;
  intensity: string;
  safetyAdvice?: string;
  explanation: string;
  schedule: DailyWorkout[];
}

const WORKOUT_DATABASE: Record<Goal, Record<Experience, { title: string; exercises: string[] }[]>> = {
  'fat-loss': {
    beginner: [
      { title: "Upper Body", exercises: ["Dumbbell Bench Press", "Lat Pulldown Machine", "Shoulder Press Machine", "Dumbbell Bicep Curl", "Cable Tricep Pushdown", "Cardio: 15–20 min treadmill"] },
      { title: "Lower Body + Core", exercises: ["Leg Press Machine", "Walking Lunges", "Leg Curl Machine", "Standing Calf Raises", "Plank", "Cardio: 15 min incline walk"] },
      { title: "Cardio + Abs", exercises: ["Treadmill running – 20 min", "Stationary bike – 15 min", "Russian Twists", "Leg Raises", "Mountain Climbers"] }
    ],
    intermediate: [
      { title: "Upper Body Push", exercises: ["Barbell Bench Press", "Incline Dumbbell Press", "Shoulder Press", "Lateral Raises", "Tricep Dips", "Cardio: 15 min HIIT treadmill"] },
      { title: "Lower Body", exercises: ["Barbell Squats", "Leg Press", "Romanian Deadlift", "Leg Curl Machine", "Calf Raises", "Cardio: Stair climber – 10 min"] },
      { title: "Upper Body Pull", exercises: ["Lat Pulldown", "Seated Cable Row", "Dumbbell Rows", "Barbell Curl", "Hammer Curl", "Cardio: Rowing machine – 15 min"] },
      { title: "Full Body Fat Burn", exercises: ["Kettlebell Swings", "Goblet Squats", "Push Ups", "Battle Ropes", "Jump Rope", "Cardio: 20 min cycling"] }
    ],
    advanced: [
      { title: "Chest + Cardio", exercises: ["Bench Press", "Incline Dumbbell Press", "Cable Fly", "Push Ups", "20 min HIIT treadmill"] },
      { title: "Back + Cardio", exercises: ["Deadlift", "Pull Ups", "Lat Pulldown", "Seated Row", "15 min rowing"] },
      { title: "Legs", exercises: ["Barbell Squats", "Leg Press", "Walking Lunges", "Leg Curl", "Calf Raises"] },
      { title: "Shoulders + Abs", exercises: ["Shoulder Press", "Lateral Raise", "Rear Delt Fly", "Hanging Leg Raise", "Russian Twists"] },
      { title: "HIIT + Conditioning", exercises: ["Sprint intervals", "Kettlebell swings", "Box jumps", "Battle ropes", "Jump rope"] }
    ]
  },
  'muscle-gain': {
    beginner: [
      { title: "Chest + Triceps", exercises: ["Bench Press", "Incline Dumbbell Press", "Chest Fly Machine", "Tricep Pushdown", "Overhead Tricep Extension"] },
      { title: "Back + Biceps", exercises: ["Lat Pulldown", "Seated Row", "Dumbbell Row", "Barbell Curl", "Hammer Curl"] },
      { title: "Legs", exercises: ["Squats", "Leg Press", "Leg Extension", "Leg Curl", "Calf Raises"] },
      { title: "Shoulders + Abs", exercises: ["Shoulder Press", "Lateral Raises", "Rear Delt Fly", "Face Pull", "Hanging Leg Raises"] }
    ],
    intermediate: [
      { title: "Chest", exercises: ["Bench Press", "Incline Bench Press", "Dumbbell Fly", "Cable Fly"] },
      { title: "Back", exercises: ["Deadlift", "Pull Ups", "Lat Pulldown", "Seated Row"] },
      { title: "Legs", exercises: ["Squats", "Leg Press", "Romanian Deadlift", "Leg Curl", "Calf Raises"] },
      { title: "Shoulders", exercises: ["Shoulder Press", "Lateral Raise", "Rear Delt Fly", "Face Pull"] },
      { title: "Arms", exercises: ["Barbell Curl", "Hammer Curl", "Skull Crushers", "Cable Pushdown"] }
    ],
    advanced: [
      { title: "Chest", exercises: ["Bench Press", "Incline Press", "Chest Fly", "Dips"] },
      { title: "Back", exercises: ["Deadlift", "Pull Ups", "Barbell Row", "Lat Pulldown"] },
      { title: "Legs", exercises: ["Squats", "Leg Press", "Lunges", "Leg Curl", "Calf Raises"] },
      { title: "Shoulders", exercises: ["Military Press", "Lateral Raises", "Rear Delt Fly"] },
      { title: "Arms", exercises: ["Barbell Curl", "Preacher Curl", "Skull Crushers", "Cable Pushdown"] },
      { title: "Core + Conditioning", exercises: ["Hanging Leg Raises", "Russian Twists", "Plank", "Farmer Walk"] }
    ]
  },
  'endurance': {
    beginner: [
      { title: "Cardio", exercises: ["Treadmill jog – 20 min", "Cycling – 10 min"] },
      { title: "Light Strength Circuit", exercises: ["Bodyweight Squats", "Push Ups", "Dumbbell Rows", "Jumping Jacks", "Plank"] },
      { title: "Cardio + Core", exercises: ["Rowing machine – 15 min", "Russian Twists", "Leg Raises"] }
    ],
    intermediate: [
      { title: "Cardio", exercises: ["Running – 25 min"] },
      { title: "Strength Circuit", exercises: ["Squats", "Push Ups", "Pull Ups", "Lunges", "Plank"] },
      { title: "HIIT Cardio", exercises: ["Sprint intervals", "Jump rope"] },
      { title: "Core + Conditioning", exercises: ["Mountain Climbers", "Russian Twists", "Bicycle Crunches"] }
    ],
    advanced: [
      { title: "Long Distance Cardio", exercises: ["Running – 40 min"] },
      { title: "Full Body Circuit", exercises: ["Squats", "Push Ups", "Pull Ups", "Kettlebell Swings"] },
      { title: "HIIT", exercises: ["Sprint intervals", "Battle ropes", "Jump rope"] },
      { title: "Strength Endurance", exercises: ["Deadlift", "Bench Press", "Lunges", "Plank"] },
      { title: "Conditioning", exercises: ["Rowing machine", "Stair climber", "Core circuit"] }
    ]
  }
};

export function generateRecommendation(inputs: UserInputs): Recommendation {
  let split = "";
  let focus = "";
  let intensity = "";
  let safetyAdvice = "";
  let explanation = "";

  const basePlan = WORKOUT_DATABASE[inputs.goal][inputs.experience];
  
  // Determine Split string based on goal & experience
  if (inputs.goal === 'fat-loss') {
    if (inputs.experience === 'beginner') split = "Upper / Lower / Cardio Split";
    else if (inputs.experience === 'intermediate') split = "Push / Pull / Legs / Full Body";
    else split = "Body Part Split + Heavy Cardio Integration";
  } else if (inputs.goal === 'muscle-gain') {
    if (inputs.experience === 'beginner') split = "Upper / Lower / Legs / Shoulders";
    else if (inputs.experience === 'intermediate') split = "Targeted Body Part Split";
    else split = "Advanced 6-Day Hypertrophy Split";
  } else {
    if (inputs.experience === 'beginner') split = "Cardio & Light Strength Circuits";
    else if (inputs.experience === 'intermediate') split = "Cardio & Full Body Strength Endurance";
    else split = "High Volume Multi-modal Endurance";
  }

  // Explanation logic
  if (inputs.goal === 'fat-loss') {
    focus = "Metabolic Conditioning & Caloric Expenditure";
    intensity = "Moderate to High (Short rest periods)";
    explanation = `Because you selected fat loss and ${inputs.experience} experience, the system recommends a structured plan that combines strength training with cardiovascular elements to increase calorie expenditure while maintaining muscle mass. `;
  } else if (inputs.goal === 'muscle-gain') {
    focus = "Hypertrophy & Progressive Overload";
    intensity = "High Effort (Moderate rep ranges 8-12, longer rest)";
    explanation = `Because you selected muscle gain and ${inputs.experience} experience, the system recommends a split routine that increases training volume per muscle group to stimulate hypertrophy and progressive overload. `;
  } else {
    focus = "Muscular & Cardiovascular Endurance";
    intensity = "Moderate Effort (High rep ranges 15+, sustained effort)";
    explanation = `Because you selected endurance and ${inputs.experience} experience, the system recommends a plan focusing on cardio and muscular endurance circuits with higher repetitions and shorter rest periods. `;
  }

  explanation += `Training ${inputs.days} days a week gives you enough frequency to progress safely without overtraining.`;

  // Adjust for Injuries
  if (inputs.injury !== 'none') {
    if (inputs.injury === 'upper') {
      safetyAdvice = "Avoid heavy pressing movements. Substitute with machine work or isolate unaffected joints. Focus heavily on lower body and core.";
      explanation += ` We have added safety guidelines to accommodate your upper body limitations, prioritizing stabilization.`;
    } else if (inputs.injury === 'lower') {
      safetyAdvice = "Avoid heavy squats and deadlifts. Use isolation machines for legs (extensions/curls) if pain-free, or focus entirely on upper body and seated exercises.";
      explanation += ` We added safety guidelines to reduce stress on your lower body joints.`;
    } else if (inputs.injury === 'back') {
      safetyAdvice = "Strictly avoid axial loading (e.g., barbell squats, deadlifts, overhead presses). Opt for chest-supported rows, leg presses, and core stabilization exercises.";
      explanation += ` Spinal safety is paramount, so we added explicit constraints on heavy back-loaded movements.`;
    }
  }

  // Pick workouts sequentially from the base plan based on the number of selected days
  let activeWorkouts: { title: string; exercises: string[] }[] = [];
  for (let i = 0; i < inputs.days; i++) {
    activeWorkouts.push(basePlan[i % basePlan.length]);
  }

  // Spread workouts across a 7 day schedule
  const dayDistribution: Record<number, number[]> = {
    1: [0],
    2: [0, 3],
    3: [0, 2, 4],
    4: [0, 1, 3, 4],
    5: [0, 1, 2, 4, 5],
    6: [0, 1, 2, 3, 4, 5],
    7: [0, 1, 2, 3, 4, 5, 6]
  };

  const activeIndices = dayDistribution[inputs.days] || [0];
  let schedule: DailyWorkout[] = Array.from({ length: 7 }, () => ({
    type: 'rest',
    title: 'Rest / Recovery',
    exercises: []
  }));

  let workoutIndex = 0;
  activeIndices.forEach(dayIdx => {
    if (workoutIndex < activeWorkouts.length) {
      const workout = activeWorkouts[workoutIndex++];
      schedule[dayIdx] = {
        type: 'workout',
        title: workout.title,
        exercises: workout.exercises
      };
    }
  });

  return {
    split,
    focus,
    intensity,
    safetyAdvice,
    explanation,
    schedule
  };
}
