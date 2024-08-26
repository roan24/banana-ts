import React from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Button } from 'flowbite-react';
import { ConfirmationType } from './types/ConfirmationType';


const DeleteConfirmation = ({yesHandler, onCloseHandler}: ConfirmationType) => (
    <>
        <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this record?
            </h3>
            <div className="flex justify-center gap-4">
                <Button color="failure" onClick={yesHandler}>
                    Yes
                </Button>
                <Button color="gray" onClick={onCloseHandler}>
                    No
                </Button>
            </div>
        </div>
    </>
);

export default DeleteConfirmation;