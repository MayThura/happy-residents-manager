import * as React from 'react';
import { DetailDialog, DetailDialogTitle, DetailDialogContent, DetailGrid } from './program-detail-dialog.styles';

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

interface dialogProps {
    open: boolean;
    onClose: () => void;
    program: programProps;
}

export default function DetailDialogComponent(props: dialogProps) {
    const { open, onClose, program } = props;

    return(
        <DetailDialog open={open} onClose={onClose}>
            <DetailDialogTitle>
                Program Details
            </DetailDialogTitle>
            <DetailDialogContent>
                <DetailGrid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start">
                        {
                            Object.keys(program).map((key) => {
                                return (
                                    <><DetailGrid key={key} item xs={5}>
                                        { key }
                                    </DetailGrid>
                                    <DetailGrid key={key} item xs={7}>
                                        { typeof program[key as keyof typeof program] === 'object' ? 
                                            JSON.stringify(program[key as keyof typeof program])
                                        : String(program[key as keyof typeof program]) }
                                    </DetailGrid></>
                                )
                            })
                        }
                </DetailGrid>
            </DetailDialogContent>
        </DetailDialog>
    )
}