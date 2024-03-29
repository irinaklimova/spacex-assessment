interface Mass {
    kg: number
    lb: number
}

interface RocketPayloadWeight extends Mass {
}

interface Rocket {
    mass : Mass
    payload_weights : [RocketPayloadWeight]
}

interface LaunchRocket {
    rocket: Rocket
}

interface Launch {
    rocket: LaunchRocket,
    mission_name: string
    id: string
}
