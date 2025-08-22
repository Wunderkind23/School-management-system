/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { useQuery, queryOptions } from '@tanstack/react-query'
import { END_POINT } from '@/config/environment'
import { StudentReport } from '@/types/report.interface'
// import { StudentScoreResponseAttributeI } from '@/types/student.interface'

interface ReportQueryOption {
  classId: number
  studentId: number
  termId: number
}

const getData = async (query: ReportQueryOption, token: string) => {
  const { classId, studentId, termId } = query
  const url = `${END_POINT.BASE_URL}/student/report/${studentId}/${classId}/${termId}`

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(url, config)

  const data: StudentReport = res.data.data

  return data
}

const studentScoreOptions = (query: ReportQueryOption, token: string) => {
  return queryOptions({
    queryKey: ['studentReportKey', token, query.studentId, query.classId, query.termId],
    queryFn: () => getData(query, token),
  })
}

export const useFetchStudentReport = (query: ReportQueryOption, token: string) => {
  return useQuery(studentScoreOptions(query, token))
}
