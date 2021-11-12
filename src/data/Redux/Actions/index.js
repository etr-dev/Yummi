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

export const dateAction = (selection) => {
    return {
        type: 'SET_DATE',
        selection: selection
    }
}