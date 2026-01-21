import { baseApi } from "./BaseApi";

const recruiterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addJob: builder.mutation({
            query:(jobData) => ({
                url: "/recruiter/addjob",
                method: "POST",
                body: jobData
            }),
            invalidatesTags: ["Jobs"]
        }),

        getApplications: builder.query({
            query:() => "/recruiter/applications",
            providesTags: ["Applications"]
        }),

        getInterviews: builder.query({
            query: () => "/recruiter/interviews",
            providesTags: ["Interviews"]
        }),

        scheduleInterview: builder.mutation({
            query: ({applicationId, data}) => ({
                url: "/recruiter/schedule",
                method: "POST",
                data: {applicationId, data}
            }),
            invalidatesTags: ["Applications", "Interviews"]
        })
    })
});

export const    {useAddJobMutation,
                useGetApplicationsQuery, 
                useGetInterviewsQuery, 
                useScheduleInterviewMutation} = recruiterApi;