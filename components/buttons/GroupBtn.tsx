"use client"
import {  ButtonGroup, Select, Option, Button } from '@material-tailwind/react';
import React from 'react';
import { FaSortNumericDownAlt } from "react-icons/fa";
import { MdGroupAdd } from 'react-icons/md';


export default function GroupBtn({ setSortCriteria }) {

    const handleSelectChange = (value:String) => {
        setSortCriteria(value);
    };

    return (
        <div className="flex justify-end space-x-4 mb-4">
            <div className="hidden md:flex space-x-4">
                <ButtonGroup className='justify-start' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <Button
                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                     onClick={() => setSortCriteria('date')} className='flex text-xl text-secondary_b hover:bg-secondary/80  focus:bg-secondary/80 '><FaSortNumericDownAlt /> Sort by date</Button>
                    <Button placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                     onClick={() => setSortCriteria('participants')} className='flex text-xl text-secondary_b hover:bg-secondary/80   focus:bg-secondary/80 '><MdGroupAdd /> Sort by participants</Button>
                </ButtonGroup>
            </div>
            <div className="md:hidden w-full">
                <Select placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    label="Sort By"
                    onChange={(value) => handleSelectChange(value)}>
                    <Option value="date">Date</Option>
                    <Option value="participants">Participants</Option>
                </Select>
            </div>

        </div>

    )
}
