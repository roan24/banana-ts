import React from 'react';
import { Checkbox, Label, Radio, Select, Textarea, TextInput } from 'flowbite-react';
import { CivilStatus } from './enums/CivilStatusEnum';
import { UserFormType } from './types/UserFormType';


const UserForm = ({formData, formChangeHandler}: UserFormType) => (
    <>
        <div className="mb-2">
            <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
                id="name"
                type="email"
                onChange={(event) => {
                    formChangeHandler && formChangeHandler && formChangeHandler("name",event.target.value)
                }}
                defaultValue={formData?.name}
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
                    formChangeHandler && formChangeHandler("address",event.target.value)
                }} 
                defaultValue={formData?.address}
            />
        </div>
        <div className="mb-2">
            <div className="mb-2 block">
                <Label htmlFor="civilStatus" value="Civil Status" />
            </div>
            <Select
                id="civilStatus"
                onChange={(event) => {
                    formChangeHandler && formChangeHandler("civilStatus",event.target.value)
                }}
                defaultValue={formData?.civilStatus}
                className="capitalize"
                required
            >
                <option className="capitalize" value={CivilStatus.Single}>{CivilStatus.Single.toUpperCase()}</option>
                <option className="capitalize" value={CivilStatus.Married}>{CivilStatus.Married.toUpperCase()}</option>
                <option className="capitalize" value={CivilStatus.Divorce}>{CivilStatus.Divorce.toUpperCase()}</option>
            </Select>
        </div>
        <fieldset className="flex flex-col gap-4 mb-2">
            <div className="mb-2 block">
                <Label htmlFor="ageGroup" value="Age group" />
            </div>
            <div className="flex items-center gap-2">
                <Radio id="18-25" name="ageGroup" value="18-25"
                    onChange={(event) => {
                        formChangeHandler && formChangeHandler("ageGroup",event.target.value)
                    }}
                    defaultChecked={formData?.ageGroup === '18-25'} 
                />
                <Label htmlFor="18-25">18-25</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="26-25" name="ageGroup" value="26-35"
                    onChange={(event) => {
                        formChangeHandler && formChangeHandler("ageGroup",event.target.value)
                    }}
                    defaultChecked={formData?.ageGroup === '26-35'} 
                />
                <Label htmlFor="26-25">26-35</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="36-45" name="ageGroup" value="36-45"
                    onChange={(event) => {
                        formChangeHandler && formChangeHandler("ageGroup",event.target.value)
                    }}
                    defaultChecked={formData?.ageGroup === '36-45'}
                />
                <Label htmlFor="36-45">36-45</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="46+" name="ageGroup" value="46+"
                    onChange={(event) => {
                        formChangeHandler && formChangeHandler("ageGroup",event.target.value)
                    }}
                    defaultChecked={formData?.ageGroup === '46+'}
                />
                <Label htmlFor="46+">46+</Label>
            </div>
        </fieldset>
        {!formData?.hasOwnProperty('id') ? (<div className="flex max-w-md flex-col gap-4" id="checkbox">
            <div className="flex items-center gap-2">
                <Checkbox id="correct"
                    onChange={() => {
                        formChangeHandler && formChangeHandler("isChecked",!formData?.isChecked)
                    }}
                    defaultChecked={formData?.isChecked}
                />
                <Label htmlFor="correct" className="flex">Data is correct</Label>
            </div>
        </div>) : null}
    </>
);

export default UserForm;