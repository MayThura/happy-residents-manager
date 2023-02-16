import * as React from 'react';
import { AddDialog, AddDialogTitle, AddDialogAction, AddDialogContent, AddDialogContentText, 
    DialogButton, AddDialogInput, DialogAutocomplete } from './adding-new-attendee-dialog.styles';
import ResidentProgramManager from '../../../controller/resident-program-manager';
import { statuses } from '../../../constants';

interface DialogProps {
    open: boolean;
    onClose: () => void;
    programId: Number;
    setAddedAttendee: (added: boolean) => void;
}

const addNewAttendee = async (programId: Number, residentId: Number, status: string) => {
	const controller = new ResidentProgramManager();
	return await controller.addAttendee(programId, residentId, status);
}

export default function AddAttendeeDialog(props: DialogProps) {

    const { onClose, open, programId, setAddedAttendee } = props;
    const [ residentId, setResidentId ] = React.useState(-1);
    const [ status, setStatus ] = React.useState("");
    const [ error, setError ] = React.useState(false);

    const addClicked = async () => {
        setAddedAttendee(true);
        let resObj = {};
        if (residentId > -1 && status !== "") {
            resObj = await addNewAttendee(programId, residentId, status).then(response => response);
        }
        if (Object.keys(resObj).length == 0 && (residentId == -1 || status == "")) {
            console.log("Error on adding attendee to a program  ", resObj)
            setError(true);
        }
        else if (Object.keys(resObj).length > 0) {
            console.log("Successfully added an attendee to a program  ", resObj)
            setError(false);
            onClose();
        }
    }

    const cancelClicked = () => {
        setError(false);
        setStatus("");
        setResidentId(-1);
        onClose();
    }

    return(
        <AddDialog onClose={onClose} open={open}>
            <AddDialogTitle>Add New Attendee</AddDialogTitle>
            <AddDialogContent>
                <AddDialogContentText>
                    Please fill these information to add a new attendee to the program.
                </AddDialogContentText>
                <AddDialogInput
                    autoFocus
                    margin="dense"
                    id="residentId"
                    label="Resident ID"
                    type="number"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setResidentId(parseInt(e.target.value))}
                />
                <DialogAutocomplete id="status" onChange={(e, value: any) => setStatus(value)} options={statuses} renderInput={(params) => <AddDialogInput {...params} label="Status" variant="standard" />} />

                { error? <AddDialogContentText sx={{ color: "red" }}>Something went wrong! Make sure your input is correct.</AddDialogContentText> : null}
            </AddDialogContent>
            <AddDialogAction>
                <DialogButton onClick={cancelClicked}>Cancel</DialogButton>
                <DialogButton onClick={addClicked}>Add</DialogButton>
            </AddDialogAction>
        </AddDialog>
    )
}