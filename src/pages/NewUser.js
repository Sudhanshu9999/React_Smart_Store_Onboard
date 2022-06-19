// @mui
import { Grid, Container, Typography } from '@mui/material';
// components
import { RegisterForm } from '../sections/auth/register';
import Page from '../components/Page';
// sections


// ----------------------------------------------------------------------

export default function NewUser() {

    return (
        <Page title="New User">
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    New User Enrollment
                </Typography>

                <Grid container spacing={3}>

                    <Grid item xs={12} md={12} lg={12}>
                        <RegisterForm />
                    </Grid>

                </Grid>
            </Container>
        </Page>
    );
}
