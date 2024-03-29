import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';

import { Button, MenuItem, Stack, TextField } from '@mui/material';

// component
import { editBatteryCell, handleChange } from 'features/battery-cell/batteryCellSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function EditBatteryCellForm() {
  const {
    id,
    cell_name_id,
    cycles,
    cathode,
    cathodeOptions,
    anode,
    anodeOptions,
    capacity_ah,
    type,
    typeOptions,
    source,
    sourceOptions,
    temperature_c,
    max_state_of_charge,
    min_state_of_charge,
    depth_of_discharge,
    charge_capacity_rate,
    discharge_capacity_rate,
  } = useSelector((store) => store.batteryCell);

  const dispatch = useDispatch();

  const EditBatteryCellSchema = Yup.object().shape({
    cell_name_id: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Cell Name ID is required'),
    cycles: Yup.string().max(100, 'Too Long!').required('Cycles required'),
    capacity_ah: Yup.string().max(100, 'Too Long!').required('Capacity (Ah) is required'),
    temperature_c: Yup.string().max(100, 'Too Long!').required('Temperature (C) is required'),
    max_state_of_charge: Yup.string().max(100, 'Too Long!').required('Max State of Charge is required'),
    min_state_of_charge: Yup.string().max(100, 'Too Long!').required('Min State of Charge is required'),
    depth_of_discharge: Yup.string().max(100, 'Too Long!').required('Depth of Discharge is required'),
    charge_capacity_rate: Yup.string().max(100, 'Too Long!').required('Charge Capacity Rate required'),
    discharge_capacity_rate: Yup.string().max(100, 'Too Long!').required('Discharge Capacity Rate is required'),
  });

  const formik = useFormik({
    initialValues: {
      id,
      cell_name_id,
      cycles,
      cathode,
      cathodeOptions,
      anode,
      anodeOptions,
      capacity_ah,
      type,
      typeOptions,
      source,
      sourceOptions,
      temperature_c,
      max_state_of_charge,
      min_state_of_charge,
      depth_of_discharge,
      charge_capacity_rate,
      discharge_capacity_rate,
    },
    validationSchema: EditBatteryCellSchema,
    enableReinitialize: false,

    onSubmit: () => {
      dispatch(
        editBatteryCell({
          id,
          batteryCell: {
            cell_name_id: formik.values.cell_name_id,
            cycles: formik.values.cycles,
            cathode,
            anode,
            capacity_ah: formik.values.capacity_ah,
            type,
            source,
            temperature_c: formik.values.temperature_c,
            max_state_of_charge: formik.values.max_state_of_charge,
            min_state_of_charge: formik.values.min_state_of_charge,
            depth_of_discharge: formik.values.depth_of_discharge,
            charge_capacity_rate: formik.values.charge_capacity_rate,
            discharge_capacity_rate: formik.values.discharge_capacity_rate,
          },
        })
      );
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, resetForm } = formik;

  const handleBatteryCellInput = (event) => {
    const { name, value } = event.target;
    dispatch(handleChange({ name, value }));
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            name="cell_name_id"
            label="Cell Name ID"
            data-cy="cell_name_id"
            inputProps={{ data_cy: 'cell_name_id-input' }}
            {...getFieldProps('cell_name_id')}
            error={Boolean(touched.cell_name_id && errors.cell_name_id)}
            helperText={touched.cell_name_id && errors.cell_name_id}
            value={formik.values.cell_name_id}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Cycles"
              data-cy="cycles"
              {...getFieldProps('cycles')}
              error={Boolean(touched.cycles && errors.cycles)}
              helperText={touched.cycles && errors.cycles}
              value={formik.values.cycles}
            />
            <TextField
              fullWidth
              name="cathode"
              label="Cathode"
              select
              data-cy="cathode"
              value={cathode}
              onChange={handleBatteryCellInput}
            >
              {cathodeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField fullWidth name="anode" label="Anode" select value={anode} onChange={handleBatteryCellInput}>
              {anodeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Capacity (Ah)"
              data-cy="capacity_ah"
              {...getFieldProps('capacity_ah')}
              error={Boolean(touched.capacity_ah && errors.capacity_ah)}
              helperText={touched.capacity_ah && errors.capacity_ah}
              value={formik.values.capacity_ah}
            />
            <TextField
              fullWidth
              name="type"
              data-cy="type"
              label="Type"
              select
              value={type}
              onChange={handleBatteryCellInput}
            >
              {typeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              name="source"
              data-cy="source"
              label="Source"
              select
              value={source}
              onChange={handleBatteryCellInput}
            >
              {sourceOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Temperature (C)"
              data-cy="temperature_c"
              {...getFieldProps('temperature_c')}
              error={Boolean(touched.temperature_c && errors.temperature_c)}
              helperText={touched.temperature_c && errors.temperature_c}
              value={formik.values.temperature_c}
            />
            <TextField
              fullWidth
              label="Max State of Charge"
              data-cy="max_state_of_charge"
              {...getFieldProps('max_state_of_charge')}
              error={Boolean(touched.max_state_of_charge && errors.max_state_of_charge)}
              helperText={touched.max_state_of_charge && errors.max_state_of_charge}
              value={formik.values.max_state_of_charge}
            />
            <TextField
              fullWidth
              label="Min State of Charge"
              data-cy="min_state_of_charge"
              {...getFieldProps('min_state_of_charge')}
              error={Boolean(touched.min_state_of_charge && errors.min_state_of_charge)}
              helperText={touched.min_state_of_charge && errors.min_state_of_charge}
              value={formik.values.min_state_of_charge}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              data-cy="depth_of_discharge"
              label="Depth of Discharge"
              {...getFieldProps('depth_of_discharge')}
              error={Boolean(touched.depth_of_discharge && errors.depth_of_discharge)}
              helperText={touched.depth_of_discharge && errors.depth_of_discharge}
              value={formik.values.depth_of_discharge}
            />
            <TextField
              fullWidth
              data-cy="charge_capacity_rate"
              label="Charge Capacity Rate"
              {...getFieldProps('charge_capacity_rate')}
              error={Boolean(touched.charge_capacity_rate && errors.charge_capacity_rate)}
              helperText={touched.charge_capacity_rate && errors.charge_capacity_rate}
              value={formik.values.charge_capacity_rate}
            />
            <TextField
              fullWidth
              data-cy="discharge_capacity_rate"
              label="Discharge Capacity Rate"
              {...getFieldProps('discharge_capacity_rate')}
              error={Boolean(touched.discharge_capacity_rate && errors.discharge_capacity_rate)}
              helperText={touched.discharge_capacity_rate && errors.discharge_capacity_rate}
              value={formik.values.discharge_capacity_rate}
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} spacing={2}>
            <Button fullWidth size="large" type="submit" variant="contained" disabled={isSubmitting} padding={5}>
              Save Battery Cell
            </Button>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
