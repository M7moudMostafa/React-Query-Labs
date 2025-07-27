import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const fetchUsersByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

const DependentQueries = ({ email }) => {
  const { data: user } = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUsersByEmail(email),
  });

  const channelId = user?.data.channelId;

  const { data: courses } = useQuery({
    queryKey: ["courses", channelId],
    queryFn: () => fetchCoursesByChannelId(channelId),
    enabled: !!channelId,
  });

  return (
    <div>
      <h3>Courses:</h3>
      <ul>
        {courses?.data.courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
};

export default DependentQueries;
