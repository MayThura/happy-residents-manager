
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export const ResidentBox = styled(Box)`
    width: 100%;
    height: 650px;
`;

export const ResidentDataGrid = styled(DataGrid)``;

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'firstName', headerName: 'First Name', width: 90 },
    { field: 'lastName', headerName: 'Last Name', width: 100 },
    { field: 'preferredName', headerName: 'Preferred Name', width: 120 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'room', headerName: 'Room', width: 90 },
    { field: 'levelOfCare', headerName: 'Level of Care', width: 130 },
    { field: 'ambulation', headerName: 'Ambulation', width: 140 },
    { field: 'birthDate', headerName: 'Birth Date', width: 200 },
    { field: 'moveInDate', headerName: 'Move in Date', width: 200 },
    { field: 'createdAt', headerName: 'Created at', width: 200 },
    { field: 'updatedAt', headerName: 'Updated at', width: 200 },
    { field: 'applicantId', headerName: 'Applicant ID', width: 90 },
    { field: 'attendance', headerName: 'Attendance', width: 600 },
]