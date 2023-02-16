import * as React from 'react';
import { ProgramCardFrame, ProgramCardContent, ProgramCardActions, CardButton, CardTypography } from './program-card.styles';
import ResidentDialog from '../participating-resident-dialog/participating-resident-dialog.component';
import DetailDialogComponent from '../program-detail-dialog/program-detail-dialog.component';

interface programProps {
    id: Number,
    parentId: string|null,
    name: string,
    location: string,
    allDay: boolean,
    start: string,
    end: string,
    tags: Array<string>,
    createdAt: string,
    updatedAt: string,
    dimension: string,
    facilitators: Array<string>,
    levelOfCare: Array<string>,
    hobbies: Array<string>,
    recurrence: string|null,
    isRepeated: boolean,
    applicantId: string|null,
    attendance: Array<Object>
};

interface cardProps {
    program: programProps;
    setAddedAttendee: (added: boolean) => void;
}

function ProgramCard(props: cardProps) {
    const { program, setAddedAttendee } = props;
    const [ open, setOpen ] = React.useState(false);
    const [ openDetails, setOpenDetails ] = React.useState(false);

    return (
        <ProgramCardFrame >
        <ProgramCardContent>
            <CardTypography gutterBottom variant="h5" >
                { program.name }
            </CardTypography>
        </ProgramCardContent>
        <ProgramCardActions>
            <CardButton size="small" onClick={() => setOpen(true)}>{ program.attendance.length } residents</CardButton>
            <ResidentDialog 
                programId={program.id}
                open={open}
                onClose={() => setOpen(false)} 
                attendees={program.attendance}
                setAddedAttendee={setAddedAttendee}
            />
            <CardButton size="small" onClick={() => setOpenDetails(true)}>details</CardButton>
            <DetailDialogComponent
                open={openDetails}
                onClose={() => setOpenDetails(false)} 
                program={program}
            />
        </ProgramCardActions>
        </ProgramCardFrame>
    );
}

export default ProgramCard;