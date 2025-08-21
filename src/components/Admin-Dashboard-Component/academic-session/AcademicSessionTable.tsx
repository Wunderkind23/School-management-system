/* eslint-disable no-constant-condition */
import useAuth from '@/contexts/AuthContext'
import { useFetchSession } from '@/hooks/global/useFetchSession'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'

const AcademicSessionTable = () => {
  const { token } = useAuth()
  const { data } = useFetchSession(token)

  return (
    <div className="bg-white w-[50%] shadow rounded-lg overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="border-b border-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Number of Terms</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.result.map((session, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{session?.name}</td>
              <td className="px-4 py-2">{session.numberOfTerms}</td>
              <td className="px-4 py-2">
                <Popover>
                  <PopoverTrigger>⋯</PopoverTrigger>
                  <PopoverContent className="bg-red">
                    <div className="gap-2 bg-white p-2 flex shadow-sm rounded-sm">
                      <button
                        // disabled={isPending}
                        onClick={() => {
                          //   handleDelete(subject.id)
                        }}
                        className="py-1 px-2 font-bold text-white border rounded-sm bg-red-600 text-[7px] "
                      >
                        {true ? 'loading' : 'Delete'}
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AcademicSessionTable
