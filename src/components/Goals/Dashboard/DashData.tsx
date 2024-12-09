import  { useEffect, useState } from 'react';

// Define types for better type-checking
type Answer = {
  question_id: number;
  correct_answer: string;
  user_answer: string;
};

type Result = {
  id: number;
  user_id: string;
  goal_id: string;
  class_id: string;
  test_id: string;
  score: number;
  answers: string; // JSON string
  created_at: string;
  updated_at: string;
};

type ClassResults = {
  total_score: number;
  results: Result[];
};

type ApiData = {
  user_id: number;
  class_results: Record<string, ClassResults>;
};

// Fetch overall data from the API
  const fetchOverallData = async (): Promise<ApiData> => {
  try {
    const response = await api.get('/getOverall');
    return response.data;
  } catch (error) {
    console.error('Error fetching overall data:', error);
    throw error;
  }
};

// Get class results for a specific class ID
const getClassResults = (data: ApiData, classId: string): ClassResults | undefined => {
  return data.class_results[classId];
};

// React component to display class results
const Dashboard = () => {
  const [data, setData] = useState<ApiData | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string>('6-8');
  const [classResults, setClassResults] = useState<ClassResults | undefined>(undefined);

  useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
      try {
        const overallData = await fetchOverallData();
        setData(overallData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Update class results when selectedClassId or data changes
    if (data) {
      const results = getClassResults(data, selectedClassId);
      setClassResults(results);
    }
  }, [data, selectedClassId]);

  return (
    <div>
      <h1>Dashboard</h1>
      <select
        value={selectedClassId}
        onChange={(e) => setSelectedClassId(e.target.value)}
      >
        <option value="4-5">Class 4-5</option>
        <option value="6-8">Class 6-8</option>
        <option value="9-10">Class 9-10</option>
        <option value="11-12">Class 11-12</option>
      </select>

      {classResults ? (
        <div>
          <h2>Results for Class {selectedClassId}</h2>
          <p>Total Score: {classResults.total_score}</p>
          <ul>
            {classResults.results.map((result) => (
              <li key={result.id}>
                Test ID: {result.test_id}, Score: {result.score}
                <br />
                Answers: {JSON.stringify(JSON.parse(result.answers), null, 2)}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No results available for Class {selectedClassId}.</p>
      )}
    </div>
  );
};

export default Dashboard;
