export const isChecked = (checked: string[], itemId: string): boolean => {
    return checked.includes(itemId)
}

export const getEnergyConsumption = (checked: string[], launches: Launch[]): number => {
    return launches
        .filter(({id}) => isChecked(checked, id))
        .reduce((acc, launch) => {
            return acc + (launch.rocket.rocket.payload_weights[0].kg + launch.rocket.rocket.mass.kg)*16*1.35}, 0);
}