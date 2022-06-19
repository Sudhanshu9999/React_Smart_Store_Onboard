import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, RadioGroup, Radio, FormControlLabel, FormLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------
import { ScrollToFieldError } from '../../../utils/formikScrollToError';

export default function NewKiranaForm() {
    const navigate = useNavigate();
    const [transformationType, setTransformationType] = useState('Complete Transformation');
    const [shopStatus, setShopStatus] = useState('Owned');
    const [exteriorImg, setExteriorImg] = useState();
    const [interiorImg, setInteriorImg] = useState();

    const RegisterSchema = Yup.object().shape({
        responderName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Responder name required'),
        groupName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Group name required'),
        kiranaMob: Yup.string().min(10, 'Too Short!').max(10, 'Too Large').required('Kirana Mobile Number required'),
        kiranaStoreName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Kirana Store name required'),
        mId: Yup.string().max(15, 'Too Long!').required('MID required'),
        storeAddress: Yup.string().min(2, 'Too Short!').max(250, 'Too Long!').required('Store Address required'),
        pincode: Yup.string().min(6, 'Too Short!').max(6, 'Too Long!').required('Pincode required'),
        city: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!').required('City required'),
        jcId: Yup.string().required('JC ID required'),
        jcName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('JC Name required'),
        tlSpoc: Yup.string().required('TL/SPOC required'),
        tlSpocContact: Yup.string().min(10, 'Too Short!').max(10, 'Too Large').required('TL/SPOC Contact Number required'),
        engineerVisitDate: Yup.string().required('Engineer Visit Date required'),
        storeSize: Yup.string().required('Store size required'),
        expectedBusiness: Yup.string().required('Expectation required'),
        purchasePerMonth: Yup.string().required('Purchase History required'),
        exteriorPic: Yup.string().required('Exterior Pic required'),
        interiorPic: Yup.string().required('Interior Pic required'),
        csoType: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('CSO type required'),
        csoName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('CSO name required'),
        csoNum: Yup.string().max(15, 'Too Long!').required('CSO number required'),
        fcCity: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('FC City required'),
    });

    const formik = useFormik({
        initialValues: {
            responderName: '',
            groupName: '',
            kiranaMob: '',
            kiranaStoreName: '',
            mId: '',
            storeAddress: '',
            pincode: '',
            city: '',
            jcId: '',
            jcName: '',
            tlSpoc: '',
            tlSpocContact: '',
            engineerVisitDate: '',
            storeSize: '',
            expectedBusiness: '',
            purchasePerMonth: '',
            exteriorPic: '',
            interiorPic: '',
            csoType: '',
            csoName: '',
            csoNum: '',
            fcCity: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: () => {
            navigate('/dashboard/app', { replace: true });
        },
    });

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    const handleExteriorClick = (e) => {
        formik.setFieldValue('exteriorPic', e.target.value)
        setExteriorImg(URL.createObjectURL(e.target.files[0]));
    }

    const handleInteriorClick = (e) => {
        formik.setFieldValue('interiorPic', e.target.value)
        setInteriorImg(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <ScrollToFieldError />
                <Stack spacing={3}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            label="Responder name"
                            {...getFieldProps('responderName')}
                            error={Boolean(touched.responderName && errors.responderName)}
                            helperText={touched.responderName && errors.responderName}
                        />

                        <TextField
                            fullWidth
                            label="Group name"
                            {...getFieldProps('groupName')}
                            error={Boolean(touched.groupName && errors.groupName)}
                            helperText={touched.groupName && errors.groupName}
                        />
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            type='number'
                            label="Kirana Mobile Number"
                            {...getFieldProps('kiranaMob')}
                            error={Boolean(touched.kiranaMob && errors.kiranaMob)}
                            helperText={touched.kiranaMob && errors.kiranaMob}
                        />

                        <TextField
                            fullWidth
                            label="Kirana Store Display name"
                            {...getFieldProps('kiranaStoreName')}
                            error={Boolean(touched.kiranaStoreName && errors.kiranaStoreName)}
                            helperText={touched.kiranaStoreName && errors.kiranaStoreName}
                        />
                    </Stack>

                    <TextField
                        fullWidth
                        label="MID (Enter 0 if not already a Jio Mart Kirana)"
                        {...getFieldProps('mId')}
                        error={Boolean(touched.mId && errors.mId)}
                        helperText={touched.mId && errors.mId}
                    />

                    <TextField
                        fullWidth
                        label="Store Address"
                        {...getFieldProps('storeAddress')}
                        error={Boolean(touched.storeAddress && errors.storeAddress)}
                        helperText={touched.storeAddress && errors.storeAddress}
                    />

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            type='number'
                            label="Pincode"
                            {...getFieldProps('pincode')}
                            error={Boolean(touched.pincode && errors.pincode)}
                            helperText={touched.pincode && errors.pincode}
                        />

                        <TextField
                            fullWidth
                            label="City"
                            {...getFieldProps('city')}
                            error={Boolean(touched.city && errors.city)}
                            helperText={touched.city && errors.city}
                        />
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            label="JC ID"
                            {...getFieldProps('jcId')}
                            error={Boolean(touched.jcId && errors.jcId)}
                            helperText={touched.jcId && errors.jcId}
                        />

                        <TextField
                            fullWidth
                            label="JC Name"
                            {...getFieldProps('jcName')}
                            error={Boolean(touched.jcName && errors.jcName)}
                            helperText={touched.jcName && errors.jcName}
                        />
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            label="TL/SPOC"
                            {...getFieldProps('tlSpoc')}
                            error={Boolean(touched.tlSpoc && errors.tlSpoc)}
                            helperText={touched.tlSpoc && errors.tlSpoc}
                        />

                        <TextField
                            fullWidth
                            label="TL/SPOC Contact Number"
                            {...getFieldProps('tlSpocContact')}
                            error={Boolean(touched.tlSpocContact && errors.tlSpocContact)}
                            helperText={touched.tlSpocContact && errors.tlSpocContact}
                        />
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            type='date'
                            label="Preferred Date for Engineer Visit"
                            {...getFieldProps('engineerVisitDate')}
                            error={Boolean(touched.engineerVisitDate && errors.engineerVisitDate)}
                            helperText={touched.engineerVisitDate && errors.engineerVisitDate}
                            InputProps={{ inputProps: { min: new Date().toISOString().split('T')[0] } }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />

                        <TextField
                            fullWidth
                            type='number'
                            label="Store Size (in Square Feet)"
                            {...getFieldProps('storeSize')}
                            error={Boolean(touched.storeSize && errors.storeSize)}
                            helperText={touched.storeSize && errors.storeSize}
                        />
                    </Stack>

                    <FormLabel id="demo-controlled-radio-buttons-group">Type of Transformation</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={transformationType}
                        row
                        name="radio-buttons-group"
                        value={transformationType}
                        onChange={(e) => setTransformationType(e.target.value)}
                    >
                        <FormControlLabel value="Complete Transformation" control={<Radio />} label="Complete Transformation" />
                        <FormControlLabel value="Partial Transformation" control={<Radio />} label="Partial Transformation" />
                        <FormControlLabel value="Branding Only" control={<Radio />} label="Branding Only" />
                    </RadioGroup>

                    <TextField
                        fullWidth
                        label="Expected Business from Kirana Per Month post transformation"
                        {...getFieldProps('expectedBusiness')}
                        error={Boolean(touched.expectedBusiness && errors.expectedBusiness)}
                        helperText={touched.expectedBusiness && errors.expectedBusiness}
                    />

                    <TextField
                        fullWidth
                        label="Purchase History on an average per month"
                        {...getFieldProps('purchasePerMonth')}
                        error={Boolean(touched.purchasePerMonth && errors.purchasePerMonth)}
                        helperText={touched.purchasePerMonth && errors.purchasePerMonth}
                    />

                    <FormLabel id="demo-controlled-radio-buttons-group">Shop Owned or Rented</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={shopStatus}
                        row
                        name="radio-buttons-group"
                        value={shopStatus}
                        onChange={(e) => setShopStatus(e.target.value)}
                    >
                        <FormControlLabel value="Owned" control={<Radio />} label="Owned" />
                        <FormControlLabel value="Rented" control={<Radio />} label="Rented" />
                    </RadioGroup>


                    <TextField
                        type='file'
                        fullWidth
                        label="Shop Pic (Exterior)"
                        {...getFieldProps('exteriorPic')}
                        error={Boolean(touched.exteriorPic && errors.exteriorPic)}
                        helperText={touched.exteriorPic && errors.exteriorPic}
                        onChange={(e) => handleExteriorClick(e)}
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{ accept: "image/*" }}
                    />

                    {exteriorImg ?
                        <img
                            src={exteriorImg}
                            alt='ExteriorImg'
                        />
                        : null}

                    <TextField
                        type='file'
                        fullWidth
                        hidden
                        label="Shop Pic (Interior)"
                        {...getFieldProps('interiorPic')}
                        error={Boolean(touched.interiorPic && errors.interiorPic)}
                        helperText={touched.interiorPic && errors.interiorPic}
                        onChange={(e) => handleInteriorClick(e)}
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{ accept: "image/*" }}
                    />

                    {interiorImg ?
                        <img
                            src={interiorImg}
                            alt='InteriorImg'
                        />
                        : null}

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            label="CSO Type"
                            {...getFieldProps('csoType')}
                            error={Boolean(touched.csoType && errors.csoType)}
                            helperText={touched.csoType && errors.csoType}
                        />

                        <TextField
                            fullWidth
                            label="CSO Name"
                            {...getFieldProps('csoName')}
                            error={Boolean(touched.csoName && errors.csoName)}
                            helperText={touched.csoName && errors.csoName}
                        />
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            label="CSO number"
                            {...getFieldProps('csoNum')}
                            error={Boolean(touched.csoNum && errors.csoNum)}
                            helperText={touched.csoNum && errors.csoNum}
                        />

                        <TextField
                            fullWidth
                            label="FC City"
                            {...getFieldProps('fcCity')}
                            error={Boolean(touched.fcCity && errors.fcCity)}
                            helperText={touched.fcCity && errors.fcCity}
                        />
                    </Stack>

                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                        Submit
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
    );
}
