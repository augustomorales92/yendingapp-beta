import React from 'react'
import Image from 'next/image'
import StatusBadge from '../StatusBadge'
import { Previas } from '@/types/data'
import { getCreatedPrevias } from '@/services/previas'
import PreviaManageRequestsButtons from '../buttons/PreviaManageRequestsButtons'

async function Table() {
  const createdPrevias: Previas[] = await getCreatedPrevias()
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg p-2 md:pt-0 m-2">
          {/* Mobile View */}
          <div className="md:hidden ">
            {createdPrevias?.map((previa) => (
              <div
                key={previa.id}
                className="mb-2 w-full rounded-md bg-primary_b p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={
                          previa?.images_previa_url?.[0] ||
                          '/images/placeholder.jpg'
                        }
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${previa.creator?.name}'s profile picture`}
                      />
                      <p className="text-secondary_b">{previa.location}</p>
                    </div>
                    <p className="text-sm text-secondary_b">
                      {new Date(previa?.date || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {/* Join Requests */}
                {previa.join_requests?.map((join_req, index) => (
                  <div
                    key={`${join_req.id}_${index}`}
                    className="mt-4 p-4 border rounded-md text-secondary_b"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={join_req.photos?.[0] || '/images/placeholder.jpg'}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${join_req?.user_id}'s profile picture`}
                      />
                      <StatusBadge status={join_req?.status || 'pending'} />
                    </div>
                    <p>Attendants: {join_req?.attendants}</p>
                    <p>Intentions: {join_req?.intentions}</p>
                    <div className="flex justify-end gap-2 mt-2">
                      <PreviaManageRequestsButtons
                        previaId={previa?.previa_id}
                        userId={join_req?.user_id || ''}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="flex flex-col ">
              {createdPrevias?.map((previa, index) => (
                <div
                  key={`${previa.id}_${index}`}
                  className="gap-4 bg-primary_b rounded-lg p-2 m-2"
                >
                  <div className="flex items-center justify-around p-4 bg-secondary rounded-lg">
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          previa?.images_previa_url?.[0] ||
                          '/images/placeholder.jpg'
                        }
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${previa?.creator?.name}'s profile picture`}
                      />
                      <p>{previa?.location}</p>
                    </div>
                  </div>
                  <table className="min-w-full text-gray-900 md:table gap-4">
                    <thead className="rounded-lg text-center text-sm font-normal text-white">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-5 font-medium sm:pl-6"
                        >
                          User
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                          Previa Date
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-5 font-medium sm:pl-6"
                        >
                          Attendants
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                          Intentions
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                          Status
                        </th>
                        <th scope="col" className="relative py-3 pl-6 pr-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-secondary text-center">
                      {previa.join_requests?.map((join_req, index) => (
                        <tr
                          key={`${join_req.id}_${index}`}
                          className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                        >
                          <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-3">
                              <Image
                                src={
                                  join_req.photos?.[0] ||
                                  '/images/placeholder.jpg'
                                }
                                className="rounded-full"
                                width={28}
                                height={28}
                                alt={`${join_req?.user_id}'s profile picture`}
                              />
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3">
                            {new Date(previa?.date || '').toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-3">
                            {join_req?.attendants}
                          </td>
                          <td className="whitespace-nowrap px-3 py-3">
                            {join_req?.intentions}
                          </td>
                          <td className="whitespace-nowrap px-3 py-3">
                            <StatusBadge
                              status={join_req?.status || 'pending'}
                            />
                          </td>
                          <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex justify-end gap-3">
                              <PreviaManageRequestsButtons
                                previaId={previa?.previa_id}
                                userId={join_req?.user_id || ''}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
