"use client"
import {  ButtonGroup, Select, Option, Button } from '@material-tailwind/react';
import React, {useState} from 'react';
import { FaSortNumericDownAlt } from "react-icons/fa";
import { MdGroupAdd } from 'react-icons/md';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';


export default function GroupBtn() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (criteria: string) => {
        const params = new URLSearchParams(searchParams);
        if (criteria) {
          params.set('criteria', criteria);
        } else {
          params.delete('criteria');
        }
    
        replace(`${pathname}?${params.toString()}`);
      };

    return (
        <div className="flex justify-end space-x-4 mb-4">
            <div className="hidden md:flex space-x-4">
                <ButtonGroup className='justify-start' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <Button
                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                     onClick={() => handleSearch('date')} className='flex text-xl text-secondary_b hover:bg-secondary/80  focus:bg-secondary/80 '><FaSortNumericDownAlt /> Sort by date</Button>
                    <Button placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                     onClick={() => handleSearch('participants')} className='flex text-xl text-secondary_b hover:bg-secondary/80   focus:bg-secondary/80 '><MdGroupAdd /> Sort by participants</Button>
                </ButtonGroup>
            </div>
            <div className="md:hidden w-full">
                <Select placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    label="Sort By"
                    onChange={(value) => handleSearch(value)}>
                    <Option value="date">Date</Option>
                    <Option value="participants">Participants</Option>
                </Select>
            </div>

        </div>

    )
}
