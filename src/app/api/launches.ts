import {DocumentNode, gql} from "@apollo/client";

const LaunchFragment = gql`fragment LaunchFragment on Launch {
    rocket {
        rocket {
            payload_weights {
                kg
            }
            mass {
                kg
            }
        }
    }
    mission_name
    id
    upcoming
}`

export function queryPastLaunches(): DocumentNode {
    return gql`${LaunchFragment} query LaunchesQuery{
        launches: launchesPast {
            ...LaunchFragment
        }
    }`;
}

export function queryLaunches(): DocumentNode {
    return gql`${LaunchFragment} query LaunchesQuery{
        launches {
          ...LaunchFragment
        }
      }`;
}


