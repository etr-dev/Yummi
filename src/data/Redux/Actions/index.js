export const drawerAction = (selection) => {
    return {
        type: 'SET_DRAWER',
        selection: selection
    }
}

export const categoryAction = (selection) => {
    return {
        type: 'SET_CATEGORY',
        selection: selection
    }
}