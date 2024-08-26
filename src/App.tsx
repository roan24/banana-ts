import { useEffect, useState } from 'react';
import { Button, Dropdown, Table } from "flowbite-react";
import './App.css'
import { HiDotsVertical } from 'react-icons/hi';
import data from '../resources/data.json';
import { User } from './types/UserType';
import ModalComponent from './Modal';

function App() {
    const [showFormModal, setShowFormModal] = useState<boolean>(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false);


    enum Color {
        Blue = "blue",
        Red = "red",
    }
    const formDefaultValue = {
        "name": "",
        "address": "",
        "civilStatus": "",
        "ageGroup": "",
        "isChecked": false
    };
    // to be used for dynamically show data on the table
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>({
        "name": "",
        "address": "",
        "civilStatus": "",
        "ageGroup": "",
    });
    const [formData, setFormData] = useState<User>(formDefaultValue);

    const toggleFormModalClickHandler = () => {
        setShowFormModal(!showFormModal);
    }

    const showAddFormModalClickHandler = () => {
        setFormData(formDefaultValue);
        toggleFormModalClickHandler();
    }

    const toggleDeleteConfirmationClickHandler = () => {
        setShowDeleteConfirmationModal(!showDeleteConfirmationModal);
    }

    const addUserHandler = () => {
        formData.id = users.length + 1;
        delete formData?.isChecked;
        setUsers([...users,formData]);
        toggleFormModalClickHandler();
    }

    const deleteUserClickHandler = () => {
        setUsers(users.filter((userData: User) => userData.id !== user?.id));
        toggleDeleteConfirmationClickHandler();
    }

    const showDeleteConfirmationHandler = (user: User) => {
        setUser(user);
        toggleDeleteConfirmationClickHandler();
    }

    const showUpdateFormHandler = (user: User) => {
        user.isChecked = true;
        setFormData(user);
        toggleFormModalClickHandler();
    }

    const updateUserHandler = () => {
        setUsers(users.map(user => {
            if(user.id === formData?.id) {
                delete formData?.isChecked;
                user = formData;
            }
            return user;
        }));
        toggleFormModalClickHandler();
    }

    const formSubmitClickHandler = () => {
        if(formData?.hasOwnProperty('id')) {
            updateUserHandler();
        } else {
            addUserHandler();
        }
    }

    const formChangeHandler = (key: string, value: string | boolean) => {
        setFormData({...formData, [key]:value});
        console.log(formData)
    }

    useEffect(()=> {
        setUsers(data)
    }, [])

    return (
        <>
            <div className="container mx-auto p-4">
                <div className="flex justify-end mb-2">
                    <Button onClick={showAddFormModalClickHandler} color={Color.Red} className="mb-2">Create</Button>
                </div>

                <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <Table.Head className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <Table.HeadCell className="px-6 py-3">Name</Table.HeadCell>
                        <Table.HeadCell className="px-6 py-3">Address</Table.HeadCell>
                        <Table.HeadCell className="px-6 py-3">Civil Status</Table.HeadCell>
                        <Table.HeadCell className="px-6 py-3">Age Group</Table.HeadCell>
                        <Table.HeadCell className="px-6 py-3">Options</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {
                            users.map((user: User) => {
                                const { id,name,address,civilStatus,ageGroup } = user;

                                return(
                                    <Table.Row className="bg-white border-b dark" key={id}>
                                        <Table.Cell className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{name}</Table.Cell>
                                        <Table.Cell className="px-6 py-4">{address}</Table.Cell>
                                        <Table.Cell className="px-6 py-4">{civilStatus}</Table.Cell>
                                        <Table.Cell className="px-6 py-4">{ageGroup}</Table.Cell>
                                        <Table.Cell className="px-6 py-4">
                                            <Dropdown
                                                label=""
                                                dismissOnClick={true}
                                                renderTrigger={() => (
                                                    <Button outline className="border-transparent bg-transparent hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                                        <HiDotsVertical />
                                                    </Button>
                                                )}>
                                                <Dropdown.Item onClick={() => showUpdateFormHandler(user)}>Edit</Dropdown.Item>
                                                <Dropdown.Item onClick={() => showDeleteConfirmationHandler(user)}>Delete</Dropdown.Item>
                                            </Dropdown>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>
                </Table>
            </div>
            {/* Form */}
            <ModalComponent
                showModal={showFormModal}
                onCloseHandler={toggleFormModalClickHandler}
                yesHandler={formSubmitClickHandler}
                formData={formData}
                formChangeHandler={formChangeHandler}
                title={"Form"}
                modalBody="form"
            />

            {/* Confirmation */}
            <ModalComponent
                showModal={showDeleteConfirmationModal}
                onCloseHandler={toggleDeleteConfirmationClickHandler}
                yesHandler={deleteUserClickHandler}
                modalBody="delete-confirmation"
            />
        </>
    )
}

export default App
