import React, {useEffect, useState} from 'react';
import { ResidentBox, ResidentDataGrid, columns } from './residents.styles';
import ResidentProgramManager from '../../../controller/resident-program-manager';

interface residentProps {
    id: Number,
    name: string,
    firstName: string,
    lastName: string,
    preferredName: string,
    status: string,
    room: string,
    levelOfCar: string[],
    ambulation: string,
    birthDate: string,
    moveInDate: string,
    createdAt: string,
    updatedAt: string,
    applicantId: string|null,
    attendance: Array<any>
}

interface residentsProps {
    addedResident: boolean;
}

const fetchResidents = async () => {
	const controller = new ResidentProgramManager();
	return await controller.getResidents();
}

export default function Residents(props: residentsProps) {

    const { addedResident } = props;
    const [ rows, setRows ] = useState<residentProps[]>([]);

    useEffect(() => {
        let rawData: residentProps[];
        fetchResidents().then(data => { 
            rawData = data;
            rawData.map(d => {
                let newAttandance: Array<any> = [];
                d.attendance.map(a => newAttandance.push(a.programId + " - " + a.status));
                d.attendance = newAttandance;
            });
            setRows(rawData);
        });
    }, [addedResident]);

    return(
        <ResidentBox>
            <ResidentDataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
             />
        </ResidentBox>
    )
}