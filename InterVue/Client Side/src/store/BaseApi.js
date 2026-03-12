import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://projects-iii4.onrender.com",
        credentials: "include"
    }),
    tagTypes: ["Jobs", "Applications", "InterviewsRecruiter", "InternalJobs", "ExternalJobs", "AppliedJobs", "InterviewsCandidate"],
  endpoints: () => ({}),
});

export {baseApi};