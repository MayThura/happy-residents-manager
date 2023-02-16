import * as React from 'react';
import { ResidentDialogBox, ResidentDialogTitle, ResidentList, ResidentListItem, ResidentListItemAvatar, 
    ResidentListItemButton, ResidentListItemText, ResidentIcon, ResidentAddIcon, ResidentAvatar } from './participating-resident-dialog.styles';
import AddAttendeeDialog from '../new-attendee-adding/adding-new-attendee-dialog.component';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  attendees: Array<any>;
  programId: Number;
  setAddedAttendee: (added: boolean) => void;
}

export default function ResidentDialog(props: DialogProps) {
  const { onClose, open, attendees, programId, setAddedAttendee } = props;
  const [ openAddDialog, setOpenAddDialog ] = React.useState(false);

  const handleListItemClick = () => {
    setOpenAddDialog(true);
  };

  return (
    <ResidentDialogBox onClose={onClose} open={open}>
      <ResidentDialogTitle>Participating Residents</ResidentDialogTitle>
      <ResidentList sx={{ pt: 0 }}>
        {attendees.map((resident) => (
          <ResidentListItem disableGutters key={resident.residentId}>
            <ResidentListItemButton>
              <ResidentListItemAvatar>
                <ResidentAvatar >
                  <ResidentIcon />
                </ResidentAvatar>
              </ResidentListItemAvatar>
              <ResidentListItemText primary={resident.residentId} />
              <ResidentListItemText primary={resident.residentName} />
              <ResidentListItemText primary={resident.status} />
            </ResidentListItemButton>
          </ResidentListItem>
        ))}
        <ResidentListItem disableGutters>
          <ResidentListItemButton
            autoFocus
            onClick={() => handleListItemClick()}
          >
            <ResidentListItemAvatar>
              <ResidentAvatar>
                <ResidentAddIcon />
              </ResidentAvatar>
            </ResidentListItemAvatar>
            <ResidentListItemText primary="Add Attendee" />
          </ResidentListItemButton>
          <AddAttendeeDialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} programId={programId} setAddedAttendee={setAddedAttendee} />
        </ResidentListItem>
      </ResidentList>
    </ResidentDialogBox>
  );
}