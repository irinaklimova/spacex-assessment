"use client"
import {Box, CircularProgress, Container} from "@mui/material";
import {useEffect, useState} from "react";
import Launches from "@/app/components/launches";
import { queryLaunches, queryPastLaunches} from "@/app/api/launches";
import {UserProvider} from "@/app/providers/user-context";
import {User, UserPermissions} from "@/app/types/user";
import Divider from '@mui/material/Divider';
import {ApolloClient, ApolloProvider, InMemoryCache, useQuery} from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://spacex-production.up.railway.app/',
    cache: new InMemoryCache(),
});

export default function Home() {
    const [user, setUser] = useState<User>({permissions: UserPermissions.Guest});
    const query = user.permissions === UserPermissions.Admin ? queryLaunches() : queryPastLaunches();
    const { loading, error, data } = useQuery<{launches: Launch[]}>(query, {client});

  return (
      <ApolloProvider client={client}>
          <UserProvider user={user}>
              <>
                  <header>
                      <p>Hello, {user.permissions}</p>
                  </header>
                  <Divider />
                  <main>
                      <Container maxWidth="lg">
                          <Box
                              padding={2}
                              sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                              }}
                          >
                              {loading && <CircularProgress />}
                              {error && <div>Can't fetch the data</div>}
                              {data && !!data.launches.length && <Launches launches={data.launches}/>}
                              {data && !data.launches.length && <div>No data was fetched</div>}
                          </Box>
                      </Container>
                  </main>
              </>
          </UserProvider>
      </ApolloProvider>
  );
}
