import {baseApi} from "./BaseApi.js";
const candidateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getInternalJobs: builder.query({
            query: () => "/candidate/getinjobs",
            providesTags: ["InternalJobs"]
        }),

        getExternalJobs: builder.query({
            query: () => "/candidate/getexjobs",
            providesTags: ["ExternalJobs"]
        }),

        getAppliedJobs: builder.query({
            query: () => "/candidate/getappliedjobs",
            providesTags: ["AppliedJobs"]
        }),

        getInterviewsCan: builder.query({
            query: () => "/candidate/interviews",
            providesTags: ["InterviewsCandidate"]
        }),

        applyJob: builder.mutation({
            query: (job_id) => ({
                url: "/candidate/applyjob",
                method: "POST",
                body: job_id
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

