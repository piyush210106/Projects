import { baseApi } from "./BaseApi";

const candidateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getInternalJobs: builder.query({
            query: () => "/candidate/injobs",
            providesTags: ["InternalJobs"]
        }),

        getExternalJobs: builder.query({
            query: () => "/candidate/exjobs",
            providesTags: ["ExternalJobs"]
        }),

        getAppliedJobs: builder.query({
            query: () => "/candidate/appliedjobs",
            providesTags: ["AppliedJobs"]
        }),

        getInterviewsCan: builder.query({
            query: () => "/candidate/interviews",
            providesTags: ["InterviewsCandidate"]
        }),

        applyJob: builder.mutation({
            query: ({job_id}) => ({
                url: "/candidate/applyjob",
                method: "POST",
                data: {job_id}
            }),
            invalidatesTags: ["AppliedJobs"]
        })
    })
});

export const {useGetInternalJobsQuery,
        useGetExternalJobsQuery,
        useGetAppliedJobsQuery,
        useGetInterviewsCanQuery,
        useApplyJobMutation 
        } = candidateApi;