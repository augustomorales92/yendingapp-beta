import { getFormatedDate, getSortedPrevias, sanitizeImages } from '@/lib/utils'
import Image from 'next/image'
import { Suspense } from 'react'
import Loader from '../Loader'
import {
  DeleteButton,
  EditButton,
  Modal
} from '../customComponents/MyPreviasContent'
import { getCreatedPrevias } from '@/services/previas'

type PreviaCardProps = {
  searchParams: { sortCriteria: string; modal: string }
}

export default async function MyPreviasCard({ searchParams }: PreviaCardProps) {
  const previas = await getCreatedPrevias()
  const sortedPrevias = await getSortedPrevias({
    previas,
    sortCriteria: searchParams.sortCriteria,
    needsToValidate: false
  })
  const isModalOpen = searchParams.modal === 'true'

  return (
    <Suspense fallback={<Loader />}>
      {sortedPrevias?.map((previa, index) => (
        <div className="flex justify-center items-center" key={index}>
          <div className=" bg-secondary border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[24rem] h-[40rem]">
            <div className="flex justify-center">
              <Image
                width={300}
                height={600}
                src={
                  sanitizeImages(previa.images_previa_url)?.[0] ||
                  '/images/placeholder.jpg'
                }
                alt="image 1"
                className="rounded-t-lg h-80 w-auto flex items-center justify-center p-2 lg:h-64"
              />
            </div>
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2 ">
                <p className="text-secondary">
                  {previa?.location} - {previa?.place_details}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 ">
                <p
                  className={`mt-3 ${
                    getFormatedDate(previa?.date) === 'Due'
                      ? 'text-red-500'
                      : 'text-primary_b'
                  }`}
                >
                  {getFormatedDate(previa?.date)}
                </p>
                <p className="mt-3 text-primary_b">At: {previa?.startTime}</p>
              </div>
              <p className="mt-3 font-normal text-primary_b">
                {previa?.description}
              </p>
              <p className="mt-3 text-primary_b">
                Participants: {previa?.participants}
              </p>
              <p className="mt-3 text-primary_b">
                Requests: {previa?.join_requests?.length}
              </p>

              <div className="flex flex-row justify-between mt-3 items-center">
                <div className="flex items-center gap-2">
                  <EditButton date={previa?.date} />
                  <DeleteButton previa_id={previa?.previa_id} />
                </div>
              </div>
            </div>
          </div>
          {isModalOpen && <Modal {...previa} />}
        </div>
      ))}
      {!previas?.length && (
        <div className="text-md text-secondary md:text-xl">
          {`You haven't created any Previa yet`}{' '}
        </div>
      )}
    </Suspense>
  )
}
