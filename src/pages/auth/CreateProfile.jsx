import { useSelector } from "react-redux";

import CreateJobSeekerProfile from "./CreateJobSeekerProfile";
import CreateEmployerProfile from "./CreateEmployerProfile";

const CreateProfile = () => {
  const { userType } = useSelector((state) => state.auth);

  return (
    <div className="justify-content-center row  align-items-start pt-4">
      {userType === "jobseeker" && <CreateJobSeekerProfile />}
      {userType === "employer" && <CreateEmployerProfile />}
    </div>
  );
};

export default CreateProfile;
