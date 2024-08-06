import React from 'react'
import { getSortedPrevias, sanitizeImages, formattedDate } from '@/lib/utils'
import { getPrevias } from '@/services/previas'
import Image from 'next/image'
import { FaShare } from 'react-icons/fa'
import RequestJoinModal, { JoinModalButton } from '../forms/RequestJoinModal'
import { auth } from '@/auth'

export async function Grid({
  searchParams
}: {
  searchParams: { sortCriteria: string; join: string; previa_id: string }
}) {
  const session = await auth()
  const previas = await getPrevias()
  const sortedPrevias = await getSortedPrevias({
    previas,
    sortCriteria: searchParams.sortCriteria
  })
  const isModalOpen = searchParams.join === 'true'
  const previa_id = searchParams.previa_id

  return (
    <section
      id="Projects"
      className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5 md:shrink-0"
    >
      {sortedPrevias.length ? (
        sortedPrevias?.map((previa, index) => (
          <div key={`${previa.previa_id}_${index}`}>
            <div className="w-80 bg-white shadow-md rounded-xl duration-500 hover:shadow-2xl">
              <div>
                <Image
                  src={
                    sanitizeImages(previa.images_previa_url)?.[0] ||
                    '/images/placeholder.jpg'
                  }
                  alt="Product"
                  className="h-80 w-80 object-cover rounded-t-xl"
                  width={500}
                  height={500}
                />
                <div className="px-4 py-3 w-80">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-400 mr-3 uppercase text-xs">
                      <Image
                        className="w-8 h-8 rounded-full"
                        src={
                          previa?.creator?.photo || '/images/placeholder.jpg'
                        }
                        alt="Neil image"
                        width={32}
                        height={32}
                      />
                      <span className="pointer-events-none absolute -top-9 left-0 w-max rounded bg-gray-900 px-2 py-1 my-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                        {previa?.creator?.name}
                      </span>
                    </span>
                    <p className="text-lg font-bold text-black truncate block capitalize">
                      {previa.location}
                    </p>
                    <p className="text-lg font-bold text-black truncate block capitalize">
                      + {previa.participants}
                    </p>
                  </div>
                  <div className="min-h-16">
                    <span className="text-gray-400 mr-3 uppercase text-xs">
                      {previa.description}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm font-semibold text-black cursor-auto my-3">
                      {`${formattedDate({ date: previa.date })} at ${
                        previa.startTime
                      }`}
                    </p>
                    <p className="text-sm text-gray-600 cursor-auto ml-2"></p>
                  </div>
                </div>
                <div className="flex items-center justify-around p-2">
                  <JoinModalButton previaId={previa.previa_id} requested={previa.join_requests?.some( join_req => join_req.user_id === session?.user.userData.user_id )}/>
                  <div className="ml-auto">
                    <button className="cursor-pointer rounded-full bg-primary_b p-3 text-primary transition-colors hover:bg-opacity-70 group-hover:bg-opacity-70">
                      <FaShare color="white" />
                    </button>
                    <span className="pointer-events-none absolute -top-9 left-0 w-max rounded bg-gray-900 px-2 py-1 my-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                      Share
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {isModalOpen && previa.previa_id === previa_id && <RequestJoinModal previa={previa} />}
          </div>
        ))
      ) : (
        <div className="text-md text-secondary md:text-xl">
          {`No Previas available nearby`}{' '}
        </div>
      )}
    </section>
  )
}
