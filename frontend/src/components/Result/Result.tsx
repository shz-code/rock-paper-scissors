import { useParams } from "react-router-dom";

const Result = () => {
  const { id } = useParams();

  return <div>You are the winner</div>;
};
export default Result;
