import React, { FC, Fragment, useEffect, useState } from "react";
import ProgramGrid from '../programs/program-grid/program-grid.component';
import { AddButton, AddButtonIcon, HeaderGrid } from './tab.styles';
import AddNewDataComponent from '../new-data-adding/new-data-adding.component';

const ProgramTab: FC<{}> = () => {
  const [ open, setOpen ] = useState(false);
  const [ addedResident, setAddedResident ] = useState(false);
  const [ addedProgram, setAddedProgram ] = useState(false);
  const [ addedAttendee, setAddedAttendee ] = useState(false);

  useEffect(() => {
    setAddedProgram(false);
  }, [addedProgram]);

  return (
    <Fragment>
      <HeaderGrid
        container
        spacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start">
          <HeaderGrid item xs={10}>
            <h3>Programs</h3>
          </HeaderGrid>
          <HeaderGrid item xs={2}>
            <AddButton variant="outlined" startIcon={<AddButtonIcon/>} onClick={() => setOpen(true)}>
              Add Program
            </AddButton>
            <AddNewDataComponent open={open} onClose={() => setOpen(false)} title="Program" setAddedProgram={setAddedProgram} setAddedResident={setAddedResident} />
          </HeaderGrid>
      </HeaderGrid>
      <ProgramGrid addedProgram={addedProgram} />
    </Fragment>
  );
};
export default ProgramTab;