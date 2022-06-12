import React, { FC } from "react";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Grid } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { isEmpty } from "lodash";

import { useFetchProviderServices } from "api/hooks/queries";
import { GButton, GCenterMessage } from "components";

import {
  EditService,
  ViewService,
  AddService,
  DeleteService,
} from "./components";
import { useGridSettings } from "./hooks/useGridSettings";
import { useStyles } from "./styles";

export const Services: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { providerServices } = useFetchProviderServices({
    variables: { providerId: parseInt(id || "") },
  });

  const gridSettings = useGridSettings({
    classes,
    providerServices: providerServices || [],
  });

  return (
    <Grid container direction="column">
      <Grid item>
        <GButton
          children="Add"
          startIcon={<AddOutlined />}
          className={classes.addButton}
          variant="outlined"
          onClick={() => navigate(encodeURI(`add_service`))}
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        {isEmpty(providerServices || []) ? (
          <GCenterMessage message="You currently have no service listed." />
        ) : (
          <Box className={classes.tableWrapper}>
            <DataGrid className={classes.dataGrid} {...gridSettings} />
          </Box>
        )}
      </Grid>
      <Routes>
        <Route path={encodeURI(`/add_service`)} element={<AddService />} />
        <Route
          path={encodeURI(`/delete_service/:serviceId/:categoryId`)}
          element={<DeleteService />}
        />
        <Route
          path={encodeURI(`/edit_service/:serviceId`)}
          element={<EditService />}
        />
        <Route
          path={encodeURI(`/view_service/:serviceId`)}
          element={<ViewService />}
        />
      </Routes>
    </Grid>
  );
};
