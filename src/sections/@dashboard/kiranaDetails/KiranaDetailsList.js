// @mui
import { Stack, TextField, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
// components
import Scrollbar from '../../../components/Scrollbar';

// ----------------------------------------------------------------------

export default function KiranaDetailsList() {

    return (
        <Scrollbar>
            <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        label="Responder name"
                        variant='standard'
                        value='SJ'
                        InputLabelProps={{
                            shrink: true
                        }}
                        disabled
                    />

                    <TextField
                        fullWidth
                        label="Group name"
                        variant='standard'
                        disabled
                        value='Kirana Limited'
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        type='number'
                        label="Kirana Mobile Number"
                        variant='standard'
                        disabled
                        InputLabelProps={{
                            shrink: true
                        }}
                        value='9999999999'
                    />

                    <TextField
                        fullWidth
                        label="Kirana Store Display name"
                        variant='standard'
                        value='Kirana King'
                        disabled
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Stack>

                <TextField
                    fullWidth
                    label="MID (Enter 0 if not already a Jio Mart Kirana)"
                    variant='standard'
                    disabled
                    value='53425253461'
                    InputLabelProps={{
                        shrink: true
                    }}
                />

                <TextField
                    fullWidth
                    label="Store Address"
                    variant='standard'
                    disabled
                    value='Plot 145, Sector 15, GB Road'
                    InputLabelProps={{
                        shrink: true
                    }}
                />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        type='number'
                        label="Pincode"
                        variant='standard'
                        disabled
                        value='400610'
                        InputLabelProps={{
                            shrink: true
                        }}
                    />

                    <TextField
                        fullWidth
                        label="City"
                        variant='standard'
                        disabled
                        value='Mumbai'
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        label="JC ID"
                        variant='standard'
                        disabled
                        value='12345'
                        InputLabelProps={{
                            shrink: true
                        }}
                    />

                    <TextField
                        fullWidth
                        label="JC Name"
                        variant='standard'
                        disabled
                        value='Aventura'
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        label="TL/SPOC"
                        variant='standard'
                        disabled
                        value='Entourage'
                        InputLabelProps={{
                            shrink: true
                        }}
                    />

                    <TextField
                        fullWidth
                        label="TL/SPOC Contact Number"
                        variant='standard'
                        disabled
                        value='8888888888'
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        type='date'
                        label="Preferred Date for Engineer Visit"
                        variant='standard'
                        disabled
                        InputProps={{ inputProps: { min: new Date().toISOString().split('T')[0] } }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        value='10-06-2022'
                    />

                    <TextField
                        fullWidth
                        type='number'
                        label="Store Size (in Square Feet)"
                        variant='standard'
                        disabled
                        value='550'
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Stack>

                <FormLabel id="demo-controlled-radio-buttons-group">Type of Transformation</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Complete Transformation"
                    row
                    name="radio-buttons-group"
                    variant='standard'
                    disabled
                >
                    <FormControlLabel value="Complete Transformation" control={<Radio disabled />} label="Complete Transformation" />
                    <FormControlLabel value="Partial Transformation" control={<Radio disabled />} label="Partial Transformation" />
                    <FormControlLabel value="Branding Only" control={<Radio disabled />} label="Branding Only" />
                </RadioGroup>

                <TextField
                    fullWidth
                    label="Expected Business from Kirana Per Month post transformation"
                    variant='standard'
                    disabled
                    value='500000'
                    InputLabelProps={{
                        shrink: true
                    }}
                />

                <TextField
                    fullWidth
                    label="Purchase History on an average per month"
                    variant='standard'
                    disabled
                    value='400000'
                    InputLabelProps={{
                        shrink: true
                    }}
                />

                <FormLabel id="demo-controlled-radio-buttons-group">Shop Owned or Rented</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Owned"
                    row
                    name="radio-buttons-group"
                    variant='standard'
                    disabled
                >
                    <FormControlLabel value="Owned" control={<Radio disabled />} label="Owned" />
                    <FormControlLabel value="Rented" control={<Radio disabled />} label="Rented" />
                </RadioGroup>

                <FormLabel id="demo-controlled-radio-buttons-group">Shop Exterior Pic :</FormLabel>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

                    <img
                        src={'/static/illustrations/ShopExterior.jpg'}
                        alt='Shop Exterior'
                    />

                </Stack>

                <FormLabel id="demo-controlled-radio-buttons-group">Shop Interior Pic :</FormLabel>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

                    <img
                        src={'/static/illustrations/ShopInterior.jpg'}
                        alt='Shop Interior'
                    />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        label="CSO Type"
                        variant='standard'
                        disabled
                        value='General'
                        InputLabelProps={{
                            shrink: true
                        }}
                    />

                    <TextField
                        fullWidth
                        label="CSO Name"
                        variant='standard'
                        disabled
                        value='RJ'
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        label="CSO number"
                        variant='standard'
                        disabled
                        value='5003245'
                        InputLabelProps={{
                            shrink: true
                        }}
                    />

                    <TextField
                        fullWidth
                        label="FC City"
                        variant='standard'
                        disabled
                        value='Mumbai'
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Stack>
            </Stack>
        </Scrollbar>

    );
}

