import React, {useEffect, useState} from 'react';
import { ProgramGridFrame } from './program-grid.styles';
import ProgramCard from '../program-card/program-card.component';
import ResidentProgramManager from '../../../controller/resident-program-manager';

const fetchPrograms = async () => {
	const controller = new ResidentProgramManager();
	return await controller.getPrograms();
}

const fetchResidents = async () => {
	const controller = new ResidentProgramManager();
	return await controller.getResidents();
}

interface keyValueProps {
    [key: string]: string;
}

interface attendeeProps {
    programId: Number,
    residentId: Number,
    status: string,
    residentName: string|null
}

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
    attendance: Array<attendeeProps>
};

interface programGridProps {
    addedProgram: boolean;
}

function ProgramGrid (props: programGridProps) {
    const { addedProgram } = props;
    const [ programs, setPrograms ] = useState<programProps[]>([]);
    const [ residents, setResidents ] = useState([]);
    const [ addedAttendee, setAddedAttendee ] = useState(false);
    console.log("addedProgram  ", addedProgram)
    console.log("addedAttendee ", addedAttendee)
    console.log("programs  ", programs);

    useEffect(() => {
        fetchPrograms().then(data => setPrograms(data));
        fetchResidents().then(data => setResidents(data));
    }, [addedProgram, addedAttendee]);
    
    useEffect(() => {
        let residentNames: keyValueProps = {};
        residents.map(resident => {
            const key: keyof keyValueProps = resident['id'];
            residentNames[key] = resident['name'];
        })
        let newPrograms: programProps[] = programs;
        newPrograms.map((program: programProps) => {
            let newAttendance: attendeeProps[] = [];
            if (program.attendance) {
                program.attendance.map((attendee: attendeeProps) => {
                    const newAttendee = attendee;
                    newAttendee.residentName = residentNames[String(attendee.residentId)];
                    newAttendance.push(newAttendee);
                })
            }
            program.attendance = newAttendance;
        })
        if (newPrograms.length) {
            setPrograms(newPrograms);
        }
        setAddedAttendee(false);
    }, [residents]);

    return (
        <ProgramGridFrame
        container
        spacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        >
            { programs ? programs.map((program: programProps, index: Number) => {
                return(
                    <ProgramGridFrame key={String(index)} item xs={3}>
                        <ProgramCard key={String(index)} program={program} setAddedAttendee={setAddedAttendee} />
                    </ProgramGridFrame>
                )
            }): null }
        </ProgramGridFrame>
    );
}

export default ProgramGrid;