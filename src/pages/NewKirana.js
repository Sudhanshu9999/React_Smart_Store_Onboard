// @mui
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// sections
import { NewKiranaForm } from '../sections/@dashboard/newKirana';


// ----------------------------------------------------------------------

export default function NewKirana() {

    return (
        <Page title="New Kirana">
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    New Kirana Enrollment
                </Typography>

                <Grid container spacing={3}>

                    <Grid item xs={12} md={12} lg={12}>
                        <NewKiranaForm />
                    </Grid>

                </Grid>
            </Container>
        </Page>
    );
}
