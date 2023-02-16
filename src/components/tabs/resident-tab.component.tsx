import React, { FC, Fragment, useEffect, useState } from "react";
import Residents from '../residents/resident-displaying/residents.component';
import { AddButton, AddButtonIcon, HeaderGrid } from './tab.styles';
import AddNewDataComponent from '../new-data-adding/new-data-adding.component';

const ResientTab: FC<{}> = () => {
  const [ open, setOpen ] = useState(false);
  const [ addedResident, setAddedResident ] = useState(false);
  const [ addedProgram, setAddedProgram ] = useState(false);

  useEffect(() => {
    setAddedResident(false);
  }, [addedResident]);

  return (
    <Fragment>
      <HeaderGrid
        container
        spacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start">
          <HeaderGrid item xs={10}>
            <h3>Residents</h3>
          </HeaderGrid>
          <HeaderGrid item xs={2}>
            <AddButton variant="outlined" startIcon={<AddButtonIcon/>} onClick={() => setOpen(true)}>
              Add Resident
            </AddButton>
            <AddNewDataComponent open={open} onClose={() => setOpen(false)} title="Resident" setAddedResident={setAddedResident} setAddedProgram={setAddedProgram} />
          </HeaderGrid>
      </HeaderGrid>
      <Residents addedResident={addedResident} />
    </Fragment>
  );
};
export default ResientTab;