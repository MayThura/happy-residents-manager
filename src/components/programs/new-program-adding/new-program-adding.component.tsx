import * as React from 'react';
import { DialogInputField, NewDialogActions, NewDialogContent, NewDialogContentText, 
    DialogButton, DialogAutocomplete, DialogFormGroup, DialogFormControlLabel, DialogFormLabel, DialogCheckbox } from './new-program-adding.styles';
import ResidentProgramManager from '../../../controller/resident-program-manager';
import { dimensions } from '../../../constants';

interface dialogProps {
    onClose: () => void;
    setAddedProgram: (added: boolean) => void;
}

interface programProps {
    name: string,
    location: string,
    allDay: boolean|undefined,
    start: string,
    end: string,
    tags: string[],
    dimension: string,
    facilitators: string[],
    levelOfCare: string[],
    hobbies: string[],
    isRepeated: boolean|undefined
}

const addNewProgram = async (programInfo: Object) => {
	const controller = new ResidentProgramManager();
	return await controller.addProgram(programInfo);
}

export default function AddNewProgramComponent(props: dialogProps) {

    const { onClose, setAddedProgram } = props;
    const [ name, setName ] = React.useState("");
    const [ location, setLocation ] = React.useState("");
    const [ allDay, setAllDay] = React.useState("false");
    const [ start, setStart ] = React.useState("");
    const [ end, setEnd ] = React.useState("");
    const [ tagging, setTaging ] = React.useState("");
    const [ dimension, setDimension ] = React.useState("");
    const [ facilitators, setFacilitators ] = React.useState("");
    const [ hobbies, setHobbies ] = React.useState("");
    const [ isRepeated, setIsRepeated ] = React.useState("false");
    const [ independentChecked, setIndependentChecked ] = React.useState(false);
    const [ assistedChecked, setAssistedChecked ] = React.useState(false);
    const [ memoryChecked, setMemoryChecked ] = React.useState(false);
    const [ longtermChecked, setLongtermChecked ] = React.useState(false);

    const addClicked = () => {
        let taggingArr = tagging.split(',');
        let facilitatorArr = facilitators.split(',');
        let hobbyArr = hobbies.split(',');
        let levelOfCare = [];
        if (independentChecked) {
            levelOfCare.push("INDEPENDENT");
        }
        if (assistedChecked) {
            levelOfCare.push("ASSISTED");
        }
        if (memoryChecked) {
            levelOfCare.push("MEMORY");
        }
        if (longtermChecked) {
            levelOfCare.push("LONG TERM");
        }
        let newProgram: programProps = {
            "name": name,
            "location": location,
            "allDay": allDay == "true" ? true : false, 
            "start": start,
            "end": end,
            "tags": taggingArr,
            "dimension": dimension,
            "facilitators": facilitatorArr,
            "levelOfCare": levelOfCare,
            "hobbies": hobbyArr,
            "isRepeated": isRepeated == "true" ? true: false,
        };
        addNewProgram(newProgram);
        setAddedProgram(true);
        onClose();
    }

    const nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const locationChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    }

    const allDayChanged = (e: any, value: any) => {
        setAllDay(value);
    }

    const startChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStart(e.target.value);
    }

    const endChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnd(e.target.value);
    }

    const taggingChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaging(e.target.value);
    }

    const dimensionChanged = (e: any, value: any) => {
        setDimension(value);
    }

    const facilitatorChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFacilitators(e.target.value);
    }

    const hobbiesChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHobbies(e.target.value);
    }

    const isRepeatedChanged = (e: any, value: any) => {
        setIsRepeated(value);
    }

    return(
        <>
        <NewDialogContent>
            <NewDialogContentText>
                Fill all the required information to create a new program!
            </NewDialogContentText>
            <DialogInputField id="name" label="Name" onChange={nameChanged} type="text" autoFocus margin="dense" fullWidth variant="standard" />
            <DialogInputField id="location" label="Location" onChange={locationChanged} type="text" autoFocus margin="dense" fullWidth variant="standard" />
            <DialogAutocomplete id="allDay" onChange={allDayChanged} options={["true", "false"]} renderInput={(params) => <DialogInputField {...params} label="All Day?" variant="standard" />} />
            <DialogInputField id="start" label="Start Date" onChange={startChanged} type="text" autoFocus margin="dense" fullWidth variant="standard" />
            <DialogInputField id="end" label="End Date" onChange={endChanged} type="text" autoFocus margin="dense" fullWidth variant="standard" />
            <DialogInputField id="tagging" label="Tagging" onChange={taggingChanged} type="text" autoFocus margin="dense" fullWidth variant="standard" placeholder="More than one tagging can be filled with commas" />
            <DialogAutocomplete id="dimension" onChange={dimensionChanged} options={dimensions} renderInput={(params) => <DialogInputField {...params} label="Dimension" variant="standard" />} />
            <DialogInputField id="facilitators" label="Facilitators" onChange={facilitatorChanged} type="text" autoFocus margin="dense" fullWidth variant="standard" placeholder="More than one can be filled with commas" />
            <DialogFormGroup>
                <DialogFormLabel>Level of Care</DialogFormLabel>
                <DialogFormControlLabel control={<DialogCheckbox checked={independentChecked} onChange={() => setIndependentChecked(!independentChecked)} />} label="INDEPENDENT" />
                <DialogFormControlLabel control={<DialogCheckbox checked={assistedChecked} onChange={() => setAssistedChecked(!assistedChecked)} />} label="ASSISTED" />
                <DialogFormControlLabel control={<DialogCheckbox checked={memoryChecked} onChange={() => setMemoryChecked(!memoryChecked)} />} label="MEMORY" />
                <DialogFormControlLabel control={<DialogCheckbox checked={longtermChecked} onChange={() => setLongtermChecked(!longtermChecked)} />} label="LONGTERM" />
            </DialogFormGroup>
            <DialogInputField id="hobbies" label="Hobbies" onChange={hobbiesChanged} type="text" autoFocus margin="dense" fullWidth variant="standard" placeholder="More than one can be filled with commas" /> 
            <DialogAutocomplete id="isRepeated" onChange={isRepeatedChanged} options={["true", "false"]} renderInput={(params) => <DialogInputField {...params} label="Repeated?" variant="standard" />} />
        </NewDialogContent>
        <NewDialogActions>
            <DialogButton onClick={onClose}>Cancel</DialogButton>
            <DialogButton onClick={addClicked}>Add</DialogButton>
        </NewDialogActions>
        </>
    )
}