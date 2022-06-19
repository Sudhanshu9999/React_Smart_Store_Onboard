import { faker } from '@faker-js/faker';
// @mui
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// import Iconify from '../components/Iconify';
// sections
import { KiranaOrderTimeline, KiranaDetailsList } from '../sections/@dashboard/kiranaDetails';

// ----------------------------------------------------------------------

export default function KiranaDetails() {

    return (
        <Page title="Dashboard">
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Kirana Details
                </Typography>

                <Grid container spacing={3}>

                    <Grid item xs={12} md={6} lg={8}>
                        <KiranaDetailsList
                            title="Kirana Enquiries"
                            list={[...Array(5)].map((_, index) => ({
                                id: faker.datatype.uuid(),
                                title: faker.company.companyName(),
                                description: faker.name.findName(),
                                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                                postedAt: faker.date.past(),
                            }))}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <KiranaOrderTimeline
                            title="Progress Timeline"
                            list={[...Array(7)].map((_, index) => ({
                                id: faker.datatype.uuid(),
                                title: [
                                    'CSO Visit',
                                    'SDR Upload',
                                    'HO Costing and Layout',
                                    'Merchant Approval',
                                    'Fixture Team Dispatch',
                                    'Marketing Team Dispatch',
                                    'Store Final Handover',
                                ][index],
                                type: `order${index + 1}`,
                                time: faker.date.past(),
                            }))}
                        />
                    </Grid>

                </Grid>

            </Container>
        </Page>
    );
}
