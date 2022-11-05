import { useEffect, useState } from "react";
import { useUser } from "./UserProvider";

const CurrentProject = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  const [currentProject, setCurrentProject] = useState("");

  useEffect(() => {
    if (user) {
      setLoading(true);

      fetch(`${user.url}/api/users/@me`, {
        headers: { Authorization: `Bearer ${user.apiKey}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setCurrentProject(data.team.name);
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  return loading ? (
    <div className="w-48 py-2 bg-gray-300 animate-pulse"></div>
  ) : (
    <span>{currentProject}</span>
  );
};

export default CurrentProject;
