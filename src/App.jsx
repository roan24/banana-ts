import { useEffect, useState } from 'react';
import { Button, Checkbox, Dropdown, Label, Modal, Radio, Select, Table, Textarea, TextInput } from "flowbite-react";
import './App.css'
import { HiOutlineExclamationCircle, HiDotsVertical } from 'react-icons/hi';
import data from '../resources/data.json';

function App() {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    // to be used for dynamically show data on the table
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({});

    const toggleFormModalClickHandler = () => {
        setShowFormModal(!showFormModal);
    }

    const showAddFormModalClickHandler = () => {
        setFormData({});
        toggleFormModalClickHandler();
    }

    const toggleDeleteConfirmationClickHandler = () => {
        setShowDeleteConfirmationModal(!showDeleteConfirmationModal);
    }

    const addUserHandler = () => {
        formData.id = users.length + 1;
        delete formData.isChecked;
        setUsers([...users,formData]);
        toggleFormModalClickHandler();
    }

    const deleteUserClickHandler = () => {
        setUsers(users.filter(userData => userData.id !== user.id));
        toggleDeleteConfirmationClickHandler();
    }

    const showDeleteConfirmationHandler = (user) => {
        setUser(user);
        toggleDeleteConfirmationClickHandler();
    }

    const showUpdateFormHandler = (user) => {
        user.isChecked = true;
        setFormData(user);
        toggleFormModalClickHandler();
    }

    const updateUserHandler = () => {
        setUsers(users.map(user => {
            if(user.id === formData.id) {
                delete formData.isChecked;
                user = formData;
            }
            return user;
        }));
        toggleFormModalClickHandler();
    }

    const formSubmitClickHandler = () => {
        if(formData.hasOwnProperty('id')) {
            updateUserHandler();
        } else {
            addUserHandler();
        }
    }

    useEffect(()=> {
        setUsers(data)
    }, [])

    return (
        <>
            <div className="container mx-auto p-4">
                <div className="flex justify-end mb-2">
                    <Button onClick={showAddFormModalClickHandler} color="blue" className="mb-2">Create</Button>
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
                            users.map(user => {
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

            <Modal show={showFormModal} onClose={toggleFormModalClickHandler}>
                <Modal.Header>Form</Modal.Header>
                <Modal.Body>
                    <div className="mb-2">
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Name" />
                        </div>
                        <TextInput
                            id="name"
                            type="email"
                            onChange={(event) => {
                                setFormData({...formData, name:event.target.value})
                            }}
                            defaultValue={formData.name}
                            required 
                        />
                    </div>
                    <div className="mb-2">
                        <div className="mb-2 block">
                            <Label htmlFor="address" value="Address" />
                        </div>
                        <Textarea
                            id="address"
                            required
                            rows={4}
                            onChange={(event) => {
                                setFormData({...formData, address:event.target.value})
                            }} 
                            defaultValue={formData.address}
                        />
                    </div>
                    <div className="mb-2">
                        <div className="mb-2 block">
                            <Label htmlFor="civilStatus" value="Civil Status" />
                        </div>
                        <Select
                            id="civilStatus"
                            onChange={(event) => {
                                setFormData({...formData, civilStatus:event.target.value})
                            }}
                            defaultValue={formData.civilStatus}
                            required
                        >
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                        </Select>
                    </div>
                    <fieldset className="flex flex-col gap-4 mb-2">
                        <div className="mb-2 block">
                            <Label htmlFor="civilStatus" value="Age group" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio id="18-25" name="ageGroup" value="18-25"
                                onChange={(event) => {
                                    setFormData({...formData, ageGroup:event.target.value})
                                }}
                                defaultChecked={formData.ageGroup === '18-25'} 
                            />
                            <Label htmlFor="18-25">18-25</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio id="26-25" name="ageGroup" value="26-35"
                                onChange={(event) => {
                                    setFormData({...formData, ageGroup:event.target.value})
                                }}
                                defaultChecked={formData.ageGroup === '26-35'} 
                            />
                            <Label htmlFor="26-25">26-35</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio id="36-45" name="ageGroup" value="36-45"
                                onChange={(event) => {
                                    setFormData({...formData, ageGroup:event.target.value})
                                }}
                                defaultChecked={formData.ageGroup === '36-45'}
                            />
                            <Label htmlFor="36-45">36-45</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio id="46+" name="ageGroup" value="46+"
                                onChange={(event) => {
                                    setFormData({...formData, ageGroup:event.target.value})
                                }}
                                defaultChecked={formData.ageGroup === '46+'}
                            />
                            <Label htmlFor="46+">46+</Label>
                        </div>
                    </fieldset>
                    {!formData.hasOwnProperty('id') ? (<div className="flex max-w-md flex-col gap-4" id="checkbox">
                        <div className="flex items-center gap-2">
                            <Checkbox id="correct"
                                onChange={(event) => {
                                    setFormData({...formData, isChecked: !formData.isChecked})
                                }}
                                defaultChecked={formData.isChecked}
                            />
                            <Label htmlFor="correct" className="flex">Data is correct</Label>
                        </div>
                    </div>) : null}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={formSubmitClickHandler} color="blue" disabled={!formData.isChecked}>Submit</Button>
                    <Button color="gray" onClick={toggleFormModalClickHandler}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteConfirmationModal} size="md" onClose={toggleDeleteConfirmationClickHandler} popup>
                <Modal.Header />
                <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this record?
                    </h3>
                    <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={deleteUserClickHandler}>
                        Yes
                    </Button>
                    <Button color="gray" onClick={toggleDeleteConfirmationClickHandler}>
                        No
                    </Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default App
