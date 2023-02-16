import * as React from 'react';
import { NewDialog, NewDialogTitle } from './new-data-adding.styles';
import AddNewProgramComponent from '../programs/new-program-adding/new-program-adding.component';
import AddNewResidentComponent from '../residents/new-resident-adding/new-resident-adding.component';

interface dialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    setAddedResident: (added: boolean) => void;
    setAddedProgram: (added: boolean) => void;
}

export default function AddNewDataComponent(props: dialogProps) {
    const { open, onClose, title, setAddedResident, setAddedProgram } = props;

    return(
        <NewDialog open={open} onClose={onClose}>
            <NewDialogTitle>
                Add a New { title }
            </NewDialogTitle>
            {
                title? title === "Program" ? <AddNewProgramComponent onClose={onClose} setAddedProgram={setAddedProgram} /> :
                <AddNewResidentComponent onClose={onClose} setAddedResident={setAddedResident} /> : null
            }
        </NewDialog>
    )
}