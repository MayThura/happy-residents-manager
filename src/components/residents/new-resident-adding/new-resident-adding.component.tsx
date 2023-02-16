import * as React from 'react';
import { DialogInputField, NewDialogActions, NewDialogContent, NewDialogContentText, DialogAutocomplete,
    DialogButton, DialogFormGroup, DialogFormControlLabel, DialogFormLabel, DialogCheckbox } from './new-resident-adding.styles';
import ResidentProgramManager from '../../../controller/resident-program-manager';
import { statusValues, levels } from '../../../constants';

interface dialogProps {
    onClose: () => void;
    setAddedResident: (added: boolean) => void;
}

interface residentProps {
    name: string,
    firstName: string,
    lastName: string,
    preferredName: string,
    status: string,
    room: string,
    levelOfCare: string,
    ambulation: string,
    birthDate: string,
    moveInDate: string
}

const addNewResident = async (residentInfo: Object) => {
	const controller = new ResidentProgramManager();
	return await controller.addResident(residentInfo);
}

export default function AddNewResidentComponent(props: dialogProps) {

    const { onClose, setAddedResident } = props;
    const [ levelOfCare, setLevelOfCare ] = React.useState("")
    const [ firstName, setFirstName ] = React.useState("");
    const [ lastName, setLastName ] = React.useState("");
    const [ preferredName, setPreferredName ] = React.useState("");
    const [ status, setStatus ] = React.useState("");
    const [ room, setRoom ] = React.useState("");
    const [ ambulation, setAmbulation ] = React.useState("");
    const [ birthDate, setBirthDate ] = React.useState("");
    const [ moveInDate, setMoveInDate ] = React.useState("");

    const addClicked = () => {
        let newResident: residentProps = {
            "name": firstName + " " + lastName,
            "firstName": firstName,
            "lastName": lastName,
            "preferredName": preferredName,
            "status": status,
            "room": room, 
            "levelOfCare": levelOfCare,
            "ambulation": ambulation,
            "birthDate": birthDate,
            "moveInDate": moveInDate
        }; 
        addNewResident(newResident);
        setAddedResident(true);
        onClose();
    }

    const firstNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }

    const lastNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    }

    const preferredNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreferredName(e.target.value);
    }

    const statusChanged = (e: any, value: any) => {
        setStatus(value);
    }

    const levelOfCareChanged = (e: any, value: any) => {
        setLevelOfCare(value);
    }

    const roomChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoom(e.target.value);
    }

    const ambulationChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmbulation(e.target.value);
    }

    const birthDateChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirthDate(e.target.value);
    }

    const moveInDateChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMoveInDate(e.target.value);
    }


    return(
        <>
        <NewDialogContent>
            <NewDialogContentText>
                Fill all the required information to create a new resident!
            </NewDialogContentText>
            <DialogInputField id="firstname" label="First Name" onChange={firstNameChanged} type="text" autoFocus margin="dense" fullWidth variant="standard" />
            <DialogInputField id="lastname" label="Last Name" onChange={lastNameChanged} type="text" autoFocus margin="dense" fullWidth variant="standard" />
            <DialogInputField id="preferredname" label="Preferred Name" onChange={preferredNameChanged} type="text" autoFocus margin="dense" fullWidth variant="standard" />
            <DialogAutocomplete id="status" onChange={statusChanged} options={statusValues} renderInput={(params) => <DialogInputField {...params} label="Status" variant="standard" />} />
            <DialogInputField id="room" label="Room" onChange={roomChanged} type="text" autoFocus margin="dense" fullWidth variant="standard" placeholder="More than one tagging can be filled with commas" />
            <DialogInputField id="ambulation" label="Ambulation" onChange={ambulationChanged} type="text" autoFocus margin="dense" fullWidth variant="standard" placeholder="More than one can be filled with commas" />
            <DialogAutocomplete id="levelOfCare" onChange={levelOfCareChanged} options={levels} renderInput={(params) => <DialogInputField {...params} label="Level of Care" variant="standard" />} />
            <DialogInputField id="birthDate" label="Birth Date" onChange={birthDateChanged} type="text" autoFocus margin="dense" fullWidth variant="standard" placeholder="More than one can be filled with commas" /> 
            <DialogInputField id="moveInDate" label="Move In Date" onChange={moveInDateChanged} type="text" autoFocus margin="dense" fullWidth variant="standard" placeholder="More than one can be filled with commas" /> 
        </NewDialogContent>
        <NewDialogActions>
            <DialogButton onClick={onClose}>Cancel</DialogButton>
            <DialogButton onClick={addClicked}>Add</DialogButton>
        </NewDialogActions>
        </>
    )
}